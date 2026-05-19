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
import { createCheckout, isConfigured as isSumitConfigured } from '@/lib/sumit';
import { getSumitProduct } from '@/lib/sumit-products';

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
  const product = getSumitProduct(productSlug);
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

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://omanut-hakesher.co.il';

  const successUrl = `${baseUrl}${product.successPath}`;

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
    // eslint-disable-next-line no-console
    console.error('[sumit/checkout] failed', { productSlug, email, detail: result.detail });
    return NextResponse.json(
      { error: 'checkout-failed', detail: result.detail ?? 'unknown' },
      { status: 502 },
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
