import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/sumit";
import { getProduct } from "@/lib/products";
import { subscribeToList, isConfigured as isRavMesserConfigured } from "@/lib/ravmesser";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Sumit webhook receiver.
 *
 * Flow:
 *  1. Verify HMAC signature (X-Sumit-Signature) against SUMIT_WEBHOOK_SECRET.
 *     Production rejects unsigned/invalid; dev allows missing secret with warn.
 *  2. Idempotency-check (in-memory cache, survives single instance only).
 *  3. On success status: parse order ID from ExternalIdentifier, look up product,
 *     tag Rav-Messer subscriber with product.ravMesserTag.
 *  4. Log everything (later: persist to Supabase orders table).
 *
 * Configure webhook URL in Sumit admin:
 *   https://omanut-hakesher.co.il/api/sumit/webhook
 */

interface SumitWebhookPayload {
  PaymentID?: number | string;
  CustomerID?: number | string;
  ExternalIdentifier?: string;
  Status?: string;
  Amount?: number;
  Currency?: string;
  Customer?: { EmailAddress?: string; Name?: string };
  [key: string]: unknown;
}

// In-memory idempotency cache — keyed by `${PaymentID}:${Status}`.
// Bounded to last 1000 events to prevent unbounded growth.
const seen = new Map<string, number>();
const SEEN_MAX = 1000;

function markSeen(key: string): boolean {
  if (seen.has(key)) return true;
  if (seen.size >= SEEN_MAX) {
    // Drop the oldest entry (insertion order).
    const oldest = seen.keys().next().value;
    if (oldest) seen.delete(oldest);
  }
  seen.set(key, Date.now());
  return false;
}

/** Extract product slug from our order ID format: `${slug}-${ts}-${rand}`. */
function slugFromOrderId(orderId: string | undefined): string | null {
  if (!orderId) return null;
  // Slug can contain dashes (e.g. "the-way-plus"). Strip the last two parts
  // (timestamp + random) which our generator always appends.
  const parts = orderId.split("-");
  if (parts.length < 3) return null;
  return parts.slice(0, -2).join("-");
}

async function tagBuyerInRavMesser(args: {
  email: string;
  name: string | undefined;
  productSlug: string;
  ravMesserTag: string;
  paymentId: string;
  amount: number | undefined;
}): Promise<void> {
  if (!isRavMesserConfigured()) {
    console.warn("[sumit/webhook] Rav-Messer not configured, skipping tag", args);
    return;
  }
  // List 22958 is the omanut-hakesher master — same list used by lead magnets.
  // We re-subscribe (idempotent) with the purchase tag for sequence triggering.
  const trimmedName = args.name?.trim() ?? "";
  const [firstName, ...rest] = trimmedName.split(/\s+/);
  const lastName = rest.join(" ");
  const result = await subscribeToList({
    email: args.email,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    listId: 22958,
    tags: [args.ravMesserTag, "source:purchase"],
    customFields: {
      product: args.productSlug,
      payment_id: args.paymentId,
      amount_ils: String(args.amount ?? ""),
      purchased_at: new Date().toISOString(),
    },
  });
  if (!result.ok) {
    console.error("[sumit/webhook] Rav-Messer tag failed", { ...args, reason: result.reason, detail: result.detail });
  }
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-sumit-signature");

  const isProd = process.env.NODE_ENV === "production";
  const secret = process.env.SUMIT_WEBHOOK_SECRET;

  if (isProd && !secret) {
    console.error("[sumit/webhook] SUMIT_WEBHOOK_SECRET unset in production — rejecting");
    return NextResponse.json({ error: "webhook-not-configured" }, { status: 503 });
  }

  if (secret) {
    const valid = await verifyWebhookSignature({ rawBody, signature });
    if (!valid) {
      console.warn("[sumit/webhook] invalid signature", { hasSig: !!signature, bodyLen: rawBody.length });
      return NextResponse.json({ error: "invalid-signature" }, { status: 401 });
    }
  } else {
    console.warn("[sumit/webhook] no webhook secret configured — accepting unsigned (dev only)");
  }

  let payload: SumitWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as SumitWebhookPayload;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const paymentId = String(payload.PaymentID ?? "");
  const status = String(payload.Status ?? "");
  const dedupKey = `${paymentId}:${status}`;
  if (markSeen(dedupKey)) {
    console.log("[sumit/webhook] duplicate, ignored", { dedupKey });
    return NextResponse.json({ ok: true, duplicate: true });
  }

  console.log("[sumit/webhook] received", {
    paymentId,
    customerId: payload.CustomerID,
    orderId: payload.ExternalIdentifier,
    status,
    amount: payload.Amount,
    currency: payload.Currency,
  });

  // Treat 'Success' / 'Paid' / 'Completed' as success.
  const isSuccess = /^(success|paid|completed|approved)$/i.test(status);

  if (isSuccess) {
    const slug = slugFromOrderId(payload.ExternalIdentifier);
    const product = slug ? getProduct(slug) : undefined;
    const email = payload.Customer?.EmailAddress;
    if (product?.ravMesserTag && email) {
      // Fire-and-forget tagging — webhook must respond fast (<3s) to avoid
      // Sumit retries. Errors are logged inside.
      tagBuyerInRavMesser({
        email,
        name: payload.Customer?.Name,
        productSlug: product.slug,
        ravMesserTag: product.ravMesserTag,
        paymentId,
        amount: payload.Amount,
      }).catch((err) => console.error("[sumit/webhook] tag exception", err));
    } else {
      console.warn("[sumit/webhook] success but missing slug/email — no tag applied", {
        orderId: payload.ExternalIdentifier,
        hasProduct: !!product,
        hasEmail: !!email,
      });
    }
  }

  // TODO(phase-3): persist to Supabase orders table; trigger abandoned-cart on failed.
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "sumit-webhook",
    configured: !!process.env.SUMIT_WEBHOOK_SECRET,
    seenCount: seen.size,
  });
}
