import { NextResponse } from "next/server";
import { createCheckout, isConfigured as isSumitConfigured } from "@/lib/sumit";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CheckoutBody {
  /** Product slug from src/lib/products.ts */
  slug?: string;
  /** Buyer's name (Hebrew accepted). Used on tax document. */
  name?: string;
  email?: string;
  /** Israeli phone, optional. */
  phone?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Israeli mobile: 05X-XXXXXXX (10 digits, optional dashes/spaces)
const PHONE_RE = /^0(5\d|2|3|4|7|8|9)[-\s]?\d{3}[-\s]?\d{4}$/;

function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/+$/, "");
  return "https://omanut-hakesher.co.il";
}

function generateOrderId(slug: string): string {
  // Compact ULID-ish: timestamp + 6 random chars. Sortable + unique.
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${slug}-${ts}-${rand}`;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const slug = body.slug?.trim() ?? "";
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const phone = body.phone?.trim() ?? "";

  const product = getProduct(slug);
  if (!product) {
    return NextResponse.json({ error: "unknown-product", slug }, { status: 400 });
  }
  if (product.type === "booking-required") {
    return NextResponse.json(
      { error: "booking-required", message: "מוצר זה דורש שיחת היכרות. עבור ל-/coaching/book" },
      { status: 400 },
    );
  }
  if (name.length < 2) {
    return NextResponse.json({ error: "invalid-name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }
  if (phone && !PHONE_RE.test(phone)) {
    return NextResponse.json({ error: "invalid-phone" }, { status: 400 });
  }

  if (!isSumitConfigured()) {
    // Dev/preview path: skip Sumit, return a dummy redirect to /thanks so the
    // UI flow can still be tested. Production deploys MUST set SUMIT_* env.
    console.warn("[/api/checkout] Sumit not configured — returning dev fallback");
    const orderId = generateOrderId(slug);
    return NextResponse.json({
      ok: true,
      mode: "dev-fallback",
      orderId,
      redirectUrl: `${siteUrl()}/checkout/success?dev=1&order=${encodeURIComponent(orderId)}&product=${encodeURIComponent(slug)}`,
    });
  }

  // 2026-07-09 salvage adaptation: this route (authored 2026-05-14 against the
  // old /billing/payments/beginredirect rail) now calls the repo's CURRENT
  // src/lib/sumit.ts (CreditGuy gateway, migrated 2026-07-05). The CreditGuy
  // schema does not send Items/documentType/maxPayments/language — the hosted
  // page collects payer details and receipt issuance is configured in the
  // Sumit dashboard (see src/lib/sumit.ts docs).
  const successUrl = `${siteUrl()}/checkout/success?product=${encodeURIComponent(slug)}`;
  const cancelUrl = `${siteUrl()}${product.path}?cancelled=1`;

  const result = await createCheckout({
    productSku: product.sku,
    productName: product.nameHe,
    productDescription: product.descriptionHe,
    amount: product.price.amount,
    quantity: 1,
    customer: { name, email, phone: phone || undefined, externalId: `omanut:${slug}:${email}` },
    successUrl,
    cancelUrl,
    externalIdentifier: `omanut:${slug}`,
  });

  if (!result.ok) {
    console.error("[/api/checkout] Sumit createCheckout failed", { slug, result });
    return NextResponse.json(
      { error: "checkout-failed", reason: result.reason, detail: result.detail },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: "sumit",
    orderId: result.identifier,
    redirectUrl: result.url,
  });
}
