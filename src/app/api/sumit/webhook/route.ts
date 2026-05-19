/**
 * POST /api/sumit/webhook
 *
 * Receives Sumit payment events. We:
 *   1. Verify HMAC signature (if SUMIT_WEBHOOK_SECRET set)
 *   2. On payment.succeeded → tag the buyer in Rav-Messer with the product tag
 *   3. Idempotent: dedupe by Sumit PaymentID (in-memory for now — see TODO)
 *
 * Sumit posts JSON like:
 *   { EventType: 'payment.succeeded', PaymentID, DocumentID, SKU,
 *     ExternalIdentifier, Customer: { EmailAddress, Name }, Amount, ... }
 *
 * TODO (post-MVP): persist webhook events to Supabase `billing_events` table
 * for cross-process idempotency + audit trail. For now, in-memory Set is fine
 * because Vercel serverless restarts are rare and Sumit retries are throttled.
 */
import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/sumit';
import { findProductBySku } from '@/lib/sumit-products';
import { subscribeToList, isConfigured as isRavMesserConfigured } from '@/lib/ravmesser';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// In-memory dedup. Reset on cold start, which is acceptable here.
const seenPaymentIds = new Set<string>();

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

// Rav-Messer master list — same as lead-magnet list. Tags drive segmentation.
const OMANUT_HAKESHER_LIST_ID = 22958;

export async function POST(request: Request) {
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
  const sku = event.SKU ?? event.sku;
  const customerEmail = (event.Customer?.EmailAddress ?? event.Customer?.email ?? '').toLowerCase();
  const customerName = event.Customer?.Name ?? event.Customer?.name ?? '';

  // Idempotency — drop duplicate retries
  if (paymentId && seenPaymentIds.has(paymentId)) {
    return NextResponse.json({ ok: true, dedup: true });
  }
  if (paymentId) seenPaymentIds.add(paymentId);

  // Only act on success events
  const isSuccess =
    eventType === 'payment.succeeded' ||
    eventType === 'payment_succeeded' ||
    eventType === 'recurring.charged' ||
    eventType === 'document.created';

  if (!isSuccess) {
    // eslint-disable-next-line no-console
    console.log('[sumit/webhook] non-success event, logging only', { eventType, paymentId });
    return NextResponse.json({ ok: true, ignored: true, eventType });
  }

  if (!sku) {
    // eslint-disable-next-line no-console
    console.warn('[sumit/webhook] success event missing SKU', { paymentId });
    return NextResponse.json({ ok: true, warning: 'no-sku' });
  }

  const product = findProductBySku(sku);
  if (!product) {
    // eslint-disable-next-line no-console
    console.warn('[sumit/webhook] unknown SKU', { sku, paymentId });
    return NextResponse.json({ ok: true, warning: 'unknown-sku', sku });
  }

  // Add Rav-Messer tag so downstream automations can fire (welcome sequence, etc.)
  if (customerEmail && isRavMesserConfigured()) {
    const nameParts = customerName.trim().split(/\s+/);
    const firstName = nameParts[0] ?? '';
    const lastName = nameParts.slice(1).join(' ') || undefined;

    const subResult = await subscribeToList({
      email: customerEmail,
      firstName: firstName || undefined,
      lastName,
      listId: OMANUT_HAKESHER_LIST_ID,
      tags: ['customer', product.ravMesserTag, 'source:website'],
      customFields: {
        last_purchase_sku: product.sku,
        last_purchase_at: new Date().toISOString(),
        sumit_payment_id: paymentId ?? '',
      },
    });

    if (!subResult.ok) {
      // eslint-disable-next-line no-console
      console.error('[sumit/webhook] Rav-Messer tag failed', {
        email: customerEmail,
        sku,
        reason: subResult.reason,
      });
    }
  }

  // eslint-disable-next-line no-console
  console.log('[sumit/webhook] processed success', {
    eventType,
    paymentId,
    sku,
    productSlug: product.slug,
    email: customerEmail,
  });

  return NextResponse.json({
    ok: true,
    processed: true,
    productSlug: product.slug,
  });
}
