/**
 * Sumit client wrapper for אומנות הקשר.
 *
 * Wraps @elad/sumit-client (file:../_lib/sumit-client) with typed,
 * narrow surface for the website's needs:
 *   - createCheckout()  → returns hosted payment URL
 *   - verifyWebhook()   → HMAC verification for /api/sumit/webhook
 *
 * Env vars:
 *   SUMIT_COMPANY_ID         (required)
 *   SUMIT_API_KEY            (required — Sumit's term for "API token")
 *   SUMIT_WEBHOOK_SECRET     (optional but strongly recommended)
 *   NEXT_PUBLIC_SITE_URL     (used to build redirect URLs)
 *
 * If credentials are missing, isConfigured() returns false and the API route
 * returns 503 to the client so the UI can degrade gracefully.
 */
import crypto from 'node:crypto';
import { createSumitClient } from '@/lib/sumit-client-inline';

export interface SumitConfig {
  companyId: string;
  apiKey: string;
  webhookSecret?: string;
}

function readConfig(): SumitConfig | null {
  const companyId = process.env.SUMIT_COMPANY_ID;
  const apiKey = process.env.SUMIT_API_KEY ?? process.env.SUMIT_API_TOKEN;
  if (!companyId || !apiKey) return null;
  return {
    companyId,
    apiKey,
    webhookSecret: process.env.SUMIT_WEBHOOK_SECRET,
  };
}

export function isConfigured(): boolean {
  return readConfig() !== null;
}

function getClient() {
  const cfg = readConfig();
  if (!cfg) return null;
  return createSumitClient({ companyId: cfg.companyId, apiKey: cfg.apiKey });
}

export type CheckoutResult =
  | { ok: true; url: string; paymentId?: string; identifier: string }
  | { ok: false; reason: 'not-configured' | 'api-error'; detail?: string };

interface CheckoutInput {
  productSku: string;
  productName: string;
  productDescription: string;
  amount: number;
  quantity?: number;
  customer: { name: string; email: string; phone?: string; externalId?: string };
  /** Where Sumit sends the buyer after success */
  successUrl: string;
  /** Optional: where to send them on failure/cancel — defaults to home */
  cancelUrl?: string;
  /** Track which website this purchase came from */
  externalIdentifier: string;
}

/**
 * Create a Sumit hosted-checkout URL. The buyer is redirected to Sumit's
 * hosted page where they enter card / Bit / Apple Pay details. On success
 * Sumit redirects to successUrl (echoing the transaction reference) and
 * fires the webhook.
 *
 * ⚠️ MIGRATED 2026-07-05 to the CreditGuy gateway (proven fix, ported from
 * pdf-empire-il/src/payments/sumit.ts — verified there ×2 on 2026-07-01):
 * Sumit moved hosted-checkout from /billing/payments/beginredirect/ (the old
 * rail this file used — it now fails on live accounts) to
 * /creditguy/gateway/beginredirect/ with the minimal schema
 * { Mode, Amount, Identifier, RedirectURL }.
 *
 * Consequences of the schema change (documented, intentional):
 *   - Customer/Items/IssueInvoice are NOT sent — the hosted page collects
 *     payer details; receipt issuance is configured in the Sumit dashboard.
 *   - `Identifier` is UNIQUE PER ORDER (slug + timestamp + random) so that
 *     verifyCreditGuyTransaction() can confirm the exact charge. The product
 *     slug is recoverable from the identifier prefix.
 */
export async function createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  const sumit = getClient();
  if (!sumit) return { ok: false, reason: 'not-configured' };

  // Unique-per-order identifier (closes the pdf-empire hardening TODO):
  // "omanut:<slug>:<ts>:<rand>" — parse with parseOrderIdentifier().
  const identifier = `${input.externalIdentifier}:${Date.now()}:${crypto
    .randomBytes(3)
    .toString('hex')}`;

  try {
    const result = (await sumit.raw('/creditguy/gateway/beginredirect/', {
      Mode: 'Charge',
      Amount: input.amount * (input.quantity ?? 1),
      Identifier: identifier,
      RedirectURL: input.successUrl,
    })) as { RedirectURL?: string; PaymentURL?: string };

    const url = result?.RedirectURL ?? result?.PaymentURL;
    if (!url) {
      return { ok: false, reason: 'api-error', detail: 'no redirect URL in response' };
    }
    return { ok: true, url, paymentId: identifier, identifier };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return { ok: false, reason: 'api-error', detail: msg };
  }
}

/** Extract the product part from a unique order identifier ("omanut:<slug>:<ts>:<rand>"). */
export function parseOrderIdentifier(identifier: string): { productSlug: string | null } {
  const parts = identifier.split(':');
  // Expected shape: omanut:<slug>:<ts>:<rand> (or legacy omanut:<slug>)
  if (parts.length >= 2 && parts[0] === 'omanut' && parts[1]) {
    return { productSlug: parts[1] };
  }
  return { productSlug: null };
}

export type VerifiedPayment = {
  paid: boolean;
  amount_ils: number;
  /** Shva/CreditGuy authorization number, when approved. */
  auth_number?: string;
  /** Shva reference number, when approved. */
  reference_number?: number;
};

/**
 * CreditGuy gateway verification — the authoritative confirmation for the
 * hosted-checkout flow above (ported from pdf-empire-il, verified live there).
 * On payment, Sumit redirects back to successUrl echoing the numeric
 * transaction `ID` and our `Identifier`. Confirm the charge via
 * POST /creditguy/gateway/gettransaction/ — Shva result `Code === "000"` = approved.
 *
 * Credentials note: gettransaction authenticates with the PUBLIC gateway
 * credentials (CompanyID + APIPublicKey) — NOT the private APIKey the client
 * injects by default. Set SUMIT_PUBLIC_API_KEY (it's the key Sumit already
 * exposes in the buyer-facing tokenize URL, safe to store). Passing
 * Credentials in the payload overrides the client default (payload spreads
 * AFTER injected Credentials). Without it Sumit returns "Missing Credentials".
 */
export async function verifyCreditGuyTransaction(ref: {
  transactionId?: number | string;
  uniqueIdentifier?: string;
}): Promise<
  { ok: true; payment: VerifiedPayment } | { ok: false; reason: 'not-configured' | 'bad-ref' | 'api-error'; detail?: string }
> {
  const cfg = readConfig();
  const sumit = getClient();
  if (!cfg || !sumit) return { ok: false, reason: 'not-configured' };
  if (ref.transactionId === undefined && !ref.uniqueIdentifier) {
    return { ok: false, reason: 'bad-ref', detail: 'need transactionId or uniqueIdentifier' };
  }

  const publicKey = process.env.SUMIT_PUBLIC_API_KEY;

  try {
    const body: Record<string, unknown> = {};
    if (ref.transactionId !== undefined) body.ID = Number(ref.transactionId);
    if (ref.uniqueIdentifier) body.UniqueIdentifier = ref.uniqueIdentifier;
    if (publicKey) {
      body.Credentials = {
        CompanyID: Number(cfg.companyId),
        APIPublicKey: publicKey,
      };
    }

    const data = (await sumit.raw('/creditguy/gateway/gettransaction/', body)) as {
      Code?: string;
      AuthNumber?: string | null;
      ReferenceNumber?: number | null;
      Amount?: number | null;
    };

    // Shva "000" = approved. FAIL-CLOSED amount: an approved charge MUST
    // report a positive amount; otherwise callers should refuse fulfillment.
    const paid = data.Code === '000';
    const amount_ils = typeof data.Amount === 'number' ? data.Amount : 0;
    if (paid && amount_ils <= 0) {
      // eslint-disable-next-line no-console
      console.warn('[sumit] gettransaction approved (Code 000) but no positive Amount — treating amount as unverified');
    }
    return {
      ok: true,
      payment: {
        paid,
        amount_ils,
        auth_number: data.AuthNumber ?? undefined,
        reference_number: data.ReferenceNumber ?? undefined,
      },
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return { ok: false, reason: 'api-error', detail: msg };
  }
}

/**
 * Verify Sumit webhook signature (HMAC-SHA256 of raw body with shared secret).
 * If no secret is configured, returns true (accept) — but log a warning so
 * production is forced to set one before going live.
 */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  const cfg = readConfig();
  if (!cfg?.webhookSecret) {
    // No secret set yet — accept but warn
    // eslint-disable-next-line no-console
    console.warn('[sumit] SUMIT_WEBHOOK_SECRET not set — accepting webhook without signature check');
    return true;
  }
  if (!signature) return false;

  const expected = crypto.createHmac('sha256', cfg.webhookSecret).update(rawBody).digest('hex');
  try {
    const a = Buffer.from(signature, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
