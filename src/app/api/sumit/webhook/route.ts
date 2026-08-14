/**
 * POST /api/sumit/webhook
 *
 * Receives Sumit payment events. We:
 *   1. Verify HMAC signature (if SUMIT_WEBHOOK_SECRET set)
 *   2. Ignore non-success notifications safely.
 *   3. Reject fulfillment until a durable event/order store is connected.
 *
 * Sumit posts JSON like:
 *   { EventType: 'payment.succeeded', PaymentID, DocumentID, SKU,
 *     ExternalIdentifier, Customer: { EmailAddress, Name }, Amount, ... }
 *
 * IMPORTANT: an in-memory Set is not idempotency in a serverless deployment.
 * Until a durable event/order store validates amount + SKU and records the
 * transition transactionally, success events fail closed with 503.
 */
import { NextResponse } from 'next/server';
import { isPaymentsEnabled, verifyWebhookSignature } from '@/lib/sumit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SumitWebhookEvent {
  EventType?: string;
  Type?: string;
  PaymentID?: string;
  payment_id?: string;
  DocumentID?: string;
  document_id?: string;
  SKU?: string;
  sku?: string;
  ExternalIdentifier?: string;
  external_identifier?: string;
  Amount?: number;
  amount?: number;
  Customer?: {
    EmailAddress?: string;
    email?: string;
    Name?: string;
    name?: string;
  };
}

export async function POST(request: Request) {
  if (!isPaymentsEnabled()) {
    return NextResponse.json({ error: 'payments-disabled' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature =
    request.headers.get('x-sumit-signature') ??
    request.headers.get('x-signature') ??
    null;

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'invalid-signature' }, { status: 401 });
  }

  let event: SumitWebhookEvent;
  try {
    event = JSON.parse(rawBody) as SumitWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const eventType = event.EventType ?? event.Type ?? 'unknown';
  const paymentId = event.PaymentID ?? event.payment_id;

  // Only act on success events
  const isSuccess =
    eventType === 'payment.succeeded' ||
    eventType === 'payment_succeeded' ||
    eventType === 'recurring.charged' ||
    eventType === 'document.created';

  if (!isSuccess) {
    console.log('[sumit/webhook] non-success event, logging only', { eventType, paymentId });
    return NextResponse.json({ ok: true, ignored: true, eventType });
  }

  // A signed event alone is not proof that it matches a server-created pending
  // order. Do not tag, fulfill or acknowledge success until durable idempotency
  // and amount/SKU/order validation are implemented.
  return NextResponse.json(
    { error: 'fulfillment-not-configured', retryable: true },
    { status: 503 },
  );
}
