/**
 * POST /api/sumit/webhook
 *
 * Receives Sumit payment events. We:
 *   1. Require configured HMAC verification against the exact raw body.
 *   2. Reject malformed, incomplete and unsupported event contracts.
 *   3. Reject every lifecycle event until a durable event/order store exists.
 *
 * Sumit posts JSON like:
 *   { EventID, EventType: 'payment.succeeded', PaymentID, SKU,
 *     ExternalIdentifier, Amount, Currency, ... }
 *
 * IMPORTANT: an in-memory Set is not idempotency in a serverless deployment.
 * Until a durable event/order store validates amount + SKU and records the
 * transition transactionally, success events fail closed with 503.
 */
import { NextResponse } from 'next/server';
import {
  hasDurablePaymentStore,
  isPaymentsEnabled,
  isWebhookConfigured,
  verifyWebhookSignature,
} from '@/lib/sumit';
import { parseSumitWebhookEvent } from '@/lib/sumit-webhook-contract';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  if (!isWebhookConfigured()) {
    return NextResponse.json(
      { error: 'webhook-not-configured', retryable: true },
      { status: 503, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  const rawBody = await request.text();
  const signature =
    request.headers.get('x-sumit-signature') ??
    request.headers.get('x-signature') ??
    null;

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json(
      { error: 'invalid-signature' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody) as unknown;
  } catch {
    return NextResponse.json(
      { error: 'invalid-json' },
      { status: 400, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  const parsed = parseSumitWebhookEvent(payload);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: 'invalid-event', reason: parsed.reason },
      { status: 422, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  if (!hasDurablePaymentStore()) {
    return NextResponse.json(
      { error: 'payment-store-not-configured', retryable: true },
      { status: 503, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  if (!isPaymentsEnabled()) {
    return NextResponse.json(
      { error: 'payments-disabled', retryable: true },
      { status: 503, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  // This branch is deliberately unreachable while the durable-store guard is
  // false. A future implementation must atomically load the pending order,
  // compare identifier/SKU/amount/currency, claim eventId, transition state and
  // only then run fulfillment.
  return NextResponse.json(
    { error: 'fulfillment-not-configured', retryable: true },
    { status: 503, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
  );
}
