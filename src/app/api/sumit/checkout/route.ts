/**
 * POST /api/sumit/checkout
 *
 * Creates a Sumit hosted-checkout URL for one of the products defined in
 * src/lib/sumit-products.ts. Client posts:
 *   { productSlug, name, email, phone? }
 *
 * On success returns { checkoutUrl, paymentId }.
 * On Sumit-not-configured returns 503 so the client UI can degrade to "צור קשר".
 */
import { NextResponse } from 'next/server';
import {
  createCheckout,
  isConfigured as isSumitConfigured,
  isPaymentsEnabled,
} from '@/lib/sumit';
import {
  getCanonicalCheckoutProduct,
  isCommerceCatalogValid,
} from '@/lib/commerce-catalog';
import { FUNCTIONAL_BASE_URL } from '@/lib/site-url';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CheckoutBody {
  productSlug?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // This is deliberately the first request-dependent decision. While commerce
  // is disabled, do not parse customer data or reveal catalog/SKU validity.
  if (!isPaymentsEnabled()) {
    return NextResponse.json(
      { error: 'payments-disabled', message: 'הרכישה המקוונת אינה זמינה כרגע.' },
      { status: 503, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  if (!isCommerceCatalogValid()) {
    return NextResponse.json(
      { error: 'commerce-catalog-invalid' },
      { status: 503, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const productSlug = body.productSlug?.trim() ?? '';
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim().toLowerCase() ?? '';
  const phone = body.phone?.trim() ?? '';

  if (!productSlug) {
    return NextResponse.json({ error: 'missing-product' }, { status: 400 });
  }
  const product = getCanonicalCheckoutProduct(productSlug);
  if (!product) {
    return NextResponse.json({ error: 'unknown-product', productSlug }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ error: 'invalid-name' }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  }

  if (!isSumitConfigured()) {
    return NextResponse.json(
      {
        error: 'sumit-not-configured',
        message: 'מערכת התשלומים אינה מוגדרת. אנא צרו קשר בטלפון או בדואר אלקטרוני.',
      },
      { status: 503 },
    );
  }

  // Post-payment redirects must land on a live domain (omanut-hakesher.co.il
  // is NXDOMAIN). Centralized in src/lib/site-url.ts (env-overridable).
  const baseUrl = FUNCTIONAL_BASE_URL;

  // A redirect query string is not proof of payment. Keep the provider return
  // on the neutral status page until a server-verified order session exists;
  // never point checkout at the legacy `/thanks/purchase` success claim.
  const successUrl = `${baseUrl}/checkout/success`;

  const result = await createCheckout({
    productSku: product.sku,
    productName: product.nameHe,
    productDescription: product.description,
    amount: product.amount,
    customer: {
      name,
      email,
      phone: phone || undefined,
      externalId: `omanut:${product.slug}:${email}`,
    },
    successUrl,
    externalIdentifier: `omanut:${product.slug}`,
  });

  if (!result.ok) {
    if (result.reason === 'not-configured') {
      return NextResponse.json(
        { error: 'sumit-not-configured', message: 'מערכת התשלומים אינה מוגדרת.' },
        { status: 503 },
      );
    }
    console.error('[sumit/checkout] provider request failed', {
      productSlug,
      reason: result.reason,
    });
    return NextResponse.json(
      { error: 'checkout-failed' },
      { status: 502, headers: { 'Cache-Control': 'private, no-store, max-age=0' } },
    );
  }

  return NextResponse.json({
    ok: true,
    checkoutUrl: result.url,
    paymentId: result.paymentId,
    productName: product.nameHe,
    amount: product.amount,
  });
}
