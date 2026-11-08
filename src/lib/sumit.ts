/**
 * Sumit (אומגוי / OfficeGuy) payment-gateway client.
 *
 * Why Sumit (not Stripe / Cardcom / Tranzila): Sumit was chosen for built-in
 * Israeli tax-document generation — every successful charge auto-creates a
 * חשבונית מס/קבלה for the buyer. That removes the need to integrate a separate
 * accounting tool (Greeninvoice / iCount) for the most common case.
 *
 * Integration mode: hosted-checkout via `POST /billing/payments/beginredirect/`.
 * We hand the buyer a Sumit-hosted page URL; Sumit handles PCI; on success the
 * buyer is redirected to RedirectURL with `OG-CustomerID`, `OG-PaymentID`, and
 * `OG-ExternalIdentifier` query params (our internal order ID).
 *
 * Env vars (read at request time, not module load — Next.js serverless):
 *   SUMIT_COMPANY_ID  — numeric company ID (1874985196 for omanut-hakesher)
 *   SUMIT_API_TOKEN   — secret API key from app.sumit.co.il/developers/keys/
 *   SUMIT_MODE        — 'sandbox' | 'production' (informational; same base URL)
 *
 * If creds are missing, all calls return `{ ok: false, reason: 'not-configured' }`
 * so dev/preview environments degrade gracefully without crashing checkout UI.
 */

const API_BASE = "https://api.sumit.co.il";

export type Currency = "ILS" | "USD" | "EUR";
export type Language = "Hebrew" | "English";

export interface SumitCustomer {
  /** Full name (or company name). */
  name: string;
  email: string;
  /** Optional Israeli phone, format: 0501234567 */
  phone?: string;
  /** Our internal user id, surfaced back in webhook payload. */
  externalIdentifier?: string;
}

export interface SumitChargeItem {
  /** Display name on Sumit checkout + tax document. */
  name: string;
  description?: string;
  /** Single-unit price, decimal. */
  unitPrice: number;
  quantity?: number;
  /** Currency, defaults to ILS. */
  currency?: Currency;
  /** Our SKU / product slug — surfaces in tax document. */
  sku?: string;
}

export interface CreateCheckoutInput {
  customer: SumitCustomer;
  items: SumitChargeItem[];
  /** Where Sumit redirects on success. Will receive OG-* query params. */
  successUrl: string;
  /** Where Sumit redirects on user cancel. */
  cancelUrl: string;
  /** Our order id — appended to successUrl on success. */
  orderId: string;
  /** Document type — defaults to InvoiceAndReceipt (חשבונית מס/קבלה). */
  documentType?: "InvoiceAndReceipt" | "Receipt" | "ProformaInvoice";
  /** Max number of installments offered. Default = Sumit company default. */
  maxPayments?: number;
  /** Language of the hosted checkout page. Default Hebrew. */
  language?: Language;
  /** Customer-visible header on the payment page. Default: company name. */
  header?: string;
}

export type CreateCheckoutResult =
  | { ok: true; redirectUrl: string }
  | { ok: false; reason: "not-configured" | "api-error"; detail?: string };

interface SumitCredentials {
  companyId: number;
  apiKey: string;
}

function readCreds(): SumitCredentials | null {
  const companyIdRaw = process.env.SUMIT_COMPANY_ID;
  const apiKey = process.env.SUMIT_API_TOKEN;
  if (!companyIdRaw || !apiKey) return null;
  const companyId = Number(companyIdRaw);
  if (!Number.isFinite(companyId) || companyId <= 0) return null;
  return { companyId, apiKey };
}

export function isConfigured(): boolean {
  return readCreds() !== null;
}

/**
 * Create a hosted-checkout session.
 *
 * Returns a Sumit-hosted URL. Redirect the buyer there with a 303-See-Other.
 *
 * On success, Sumit redirects to:
 *   `${successUrl}?OG-CustomerID=...&OG-PaymentID=...&OG-ExternalIdentifier=${orderId}`
 *
 * Webhook is fired independently — handle the truth-of-record there, not via
 * the redirect (a buyer can close the tab before redirect fires).
 */
export async function createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
  const creds = readCreds();
  if (!creds) return { ok: false, reason: "not-configured" };

  const body = {
    Credentials: {
      CompanyID: creds.companyId,
      APIKey: creds.apiKey,
    },
    Customer: {
      Name: input.customer.name,
      EmailAddress: input.customer.email,
      Phone: input.customer.phone,
      ExternalIdentifier: input.customer.externalIdentifier,
    },
    Items: input.items.map((it) => ({
      Item: {
        Name: it.name,
        Description: it.description,
        Price: it.unitPrice,
        Currency: it.currency ?? "ILS",
        SKU: it.sku,
      },
      Quantity: it.quantity ?? 1,
      UnitPrice: it.unitPrice,
      Currency: it.currency ?? "ILS",
    })),
    RedirectURL: input.successUrl,
    CancelRedirectURL: input.cancelUrl,
    ExternalIdentifier: input.orderId,
    DocumentType: input.documentType ?? "InvoiceAndReceipt",
    MaximumPayments: input.maxPayments,
    Language: input.language ?? "Hebrew",
    Header: input.header,
    UpdateCustomerOnSuccess: true,
    UpdateOrganizationOnSuccess: true,
  };

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/billing/payments/beginredirect/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    return {
      ok: false,
      reason: "api-error",
      detail: `network: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return {
      ok: false,
      reason: "api-error",
      detail: `${res.status}: ${text.slice(0, 300)}`,
    };
  }

  const data = (await res.json().catch(() => null)) as { RedirectURL?: string } | null;
  const redirectUrl = data?.RedirectURL;
  if (!redirectUrl) {
    return { ok: false, reason: "api-error", detail: "missing RedirectURL in response" };
  }

  return { ok: true, redirectUrl };
}

/**
 * Verify a Sumit webhook HMAC signature.
 *
 * Sumit signs webhook payloads with HMAC-SHA256 using `SUMIT_WEBHOOK_SECRET`.
 * The signature is sent in the `X-Sumit-Signature` header as a hex string.
 *
 * Returns false if the secret is unset (treat as unsigned dev mode) OR if the
 * signature does not match. Callers must enforce auth themselves in production.
 */
export async function verifyWebhookSignature(args: {
  rawBody: string;
  signature: string | null;
}): Promise<boolean> {
  const secret = process.env.SUMIT_WEBHOOK_SECRET;
  if (!secret || !args.signature) return false;

  // Web Crypto API — works in Node.js 18+ runtime and Edge.
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(args.rawBody));
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  // Constant-time-ish compare.
  if (expected.length !== args.signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ args.signature.charCodeAt(i);
  }
  return mismatch === 0;
}
