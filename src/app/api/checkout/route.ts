import { NextResponse } from "next/server";
import {
  createCheckout,
  isConfigured as isSumitConfigured,
  isPaymentsEnabled,
} from "@/lib/sumit";
import { getProduct } from "@/lib/products";
import { FUNCTIONAL_BASE_URL } from "@/lib/site-url";

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
  // Post-payment redirects must land on a domain that actually serves this
  // app (omanut-hakesher.co.il is NXDOMAIN). Centralized in src/lib/site-url.ts.
  return FUNCTIONAL_BASE_URL;
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

  if (!isPaymentsEnabled()) {
    return NextResponse.json(
      { error: "payments-disabled", message: "הרכישה המקוונת אינה זמינה כרגע." },
      { status: 503 },
    );
  }

  if (!isSumitConfigured()) {
    // Payment setup is an external dependency. Never manufacture a successful
    // order when it is unavailable: preview UIs can mock this route explicitly.
    return NextResponse.json(
      {
        error: "sumit-not-configured",
        message: "מערכת התשלומים אינה זמינה כרגע. אנא נסו שוב מאוחר יותר.",
      },
      { status: 503 },
    );
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
