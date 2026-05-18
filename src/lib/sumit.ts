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
  | { ok: true; url: string; paymentId?: string }
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
 * Sumit fires the webhook and redirects to successUrl.
 */
export async function createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  const sumit = getClient();
  if (!sumit) return { ok: false, reason: 'not-configured' };

  try {
    const result = (await sumit.payments.beginRedirect({
      Customer: {
        Name: input.customer.name,
        EmailAddress: input.customer.email,
        Phone: input.customer.phone,
        ExternalIdentifier: input.customer.externalId ?? input.externalIdentifier,
      },
      // Sumit REST V11 requires Items.Item nested object (NOT flat array)
      // Verified 2026-05-18: flat array caused 502 "שדה חסר: Items.Item"
      Items: {
        Item: [
          {
            Description: input.productDescription,
            Quantity: input.quantity ?? 1,
            UnitPrice: input.amount,
            SKU: input.productSku,
          },
        ],
      },
      RedirectURL: input.successUrl,
      IssueInvoice: true, // auto-issue Hebrew קבלה
      ExternalIdentifier: input.externalIdentifier,
    })) as { RedirectURL?: string; PaymentURL?: string; PaymentID?: string };

    const url = result?.RedirectURL ?? result?.PaymentURL;
    if (!url) {
      return { ok: false, reason: 'api-error', detail: 'no redirect URL in response' };
    }
    return { ok: true, url, paymentId: result?.PaymentID };
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
