import crypto from "node:crypto";

export type SumitPaymentLifecycle = "succeeded" | "failed" | "cancelled" | "refunded";

const EVENT_LIFECYCLES: Readonly<Record<string, SumitPaymentLifecycle>> = {
  "payment.succeeded": "succeeded",
  payment_succeeded: "succeeded",
  "recurring.charged": "succeeded",
  "payment.failed": "failed",
  payment_failed: "failed",
  "payment.cancelled": "cancelled",
  payment_cancelled: "cancelled",
  "payment.canceled": "cancelled",
  payment_canceled: "cancelled",
  "payment.refunded": "refunded",
  payment_refunded: "refunded",
};

export interface NormalizedSumitWebhookEvent {
  eventId: string;
  eventType: string;
  lifecycle: SumitPaymentLifecycle;
  paymentId: string;
  orderIdentifier: string;
  sku: string;
  amountMinor: number;
  currency: "ILS";
}

export interface PendingPaymentOrder {
  orderIdentifier: string;
  sku: string;
  amountMinor: number;
  currency: "ILS";
  status: "pending" | "paid" | "failed" | "cancelled" | "refunded";
}

export type WebhookEventParseResult =
  | { ok: true; event: NormalizedSumitWebhookEvent }
  | {
      ok: false;
      reason:
        | "invalid-event"
        | "unsupported-event"
        | "missing-event-id"
        | "missing-payment-id"
        | "missing-order-identifier"
        | "missing-sku"
        | "invalid-amount"
        | "unsupported-currency";
    };

export type PendingOrderMatchResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "order-not-pending"
        | "order-identifier-mismatch"
        | "sku-mismatch"
        | "amount-mismatch"
        | "currency-mismatch";
    };

function nonEmptyString(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function moneyToMinorUnits(value: unknown): number | null {
  const normalized =
    typeof value === "number"
      ? value
      : typeof value === "string" && /^\d+(?:\.\d{1,2})?$/.test(value.trim())
        ? Number(value)
        : Number.NaN;

  if (!Number.isFinite(normalized) || normalized <= 0) return null;

  const minorUnits = Math.round(normalized * 100);
  if (!Number.isSafeInteger(minorUnits)) return null;
  if (Math.abs(normalized * 100 - minorUnits) > 1e-7) return null;
  return minorUnits;
}

/**
 * Verify the exact raw request body against the repository's Sumit webhook
 * contract: a 64-character hexadecimal HMAC-SHA256 signature. No decoded or
 * re-serialized JSON is accepted.
 */
export function verifySumitWebhookHmac(
  rawBody: string,
  signature: string | null,
  secret: string | null,
): boolean {
  if (!secret || !secret.trim() || !signature) return false;

  const suppliedHex = signature.trim();
  if (!/^[0-9a-f]{64}$/i.test(suppliedHex)) return false;

  const supplied = Buffer.from(suppliedHex, "hex");
  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest();

  return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
}

/**
 * Parse only the fields needed to bind an event to a server-created order.
 * Requiring an event ID is intentional: without it, durable replay protection
 * cannot be implemented safely.
 */
export function parseSumitWebhookEvent(payload: unknown): WebhookEventParseResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, reason: "invalid-event" };
  }

  const event = payload as Record<string, unknown>;
  const eventType = nonEmptyString(event.EventType, event.event_type, event.Type);
  if (!eventType) return { ok: false, reason: "unsupported-event" };
  const lifecycle = EVENT_LIFECYCLES[eventType];
  if (!lifecycle) return { ok: false, reason: "unsupported-event" };

  const eventId = nonEmptyString(event.EventID, event.event_id);
  if (!eventId) return { ok: false, reason: "missing-event-id" };

  const paymentId = nonEmptyString(event.PaymentID, event.payment_id);
  if (!paymentId) return { ok: false, reason: "missing-payment-id" };

  const orderIdentifier = nonEmptyString(
    event.ExternalIdentifier,
    event.external_identifier,
    event.Identifier,
    event.identifier,
  );
  if (!orderIdentifier) return { ok: false, reason: "missing-order-identifier" };

  const sku = nonEmptyString(event.SKU, event.sku);
  if (!sku) return { ok: false, reason: "missing-sku" };

  const amountMinor = moneyToMinorUnits(event.Amount ?? event.amount);
  if (amountMinor === null) return { ok: false, reason: "invalid-amount" };

  const rawCurrency = nonEmptyString(event.Currency, event.currency)?.toUpperCase();
  if (rawCurrency !== "ILS" && rawCurrency !== "NIS") {
    return { ok: false, reason: "unsupported-currency" };
  }

  return {
    ok: true,
    event: {
      eventId,
      eventType,
      lifecycle,
      paymentId,
      orderIdentifier,
      sku,
      amountMinor,
      currency: "ILS",
    },
  };
}

/**
 * Pure comparison contract for a future durable store. The webhook route does
 * not call this today because the repository has no persistent pending-order
 * implementation; it therefore rejects every otherwise valid event with 503.
 */
export function matchEventToPendingOrder(
  event: NormalizedSumitWebhookEvent,
  order: PendingPaymentOrder | null,
): PendingOrderMatchResult {
  if (!order || order.status !== "pending") return { ok: false, reason: "order-not-pending" };
  if (event.orderIdentifier !== order.orderIdentifier) {
    return { ok: false, reason: "order-identifier-mismatch" };
  }
  if (event.sku !== order.sku) return { ok: false, reason: "sku-mismatch" };
  if (event.amountMinor !== order.amountMinor) return { ok: false, reason: "amount-mismatch" };
  if (event.currency !== order.currency) return { ok: false, reason: "currency-mismatch" };
  return { ok: true };
}
