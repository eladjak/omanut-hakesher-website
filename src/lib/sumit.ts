/**
 * Sumit hosted-checkout integration (minimum-viable).
 *
 * Strategy: Elad creates products in Sumit dashboard (app.sumit.co.il),
 * copies the public checkout URL per product into env, and we render
 * anchor links to those URLs. Sumit handles card capture, Israeli tax
 * invoices, recurring billing, receipts natively. No PCI scope on our side.
 *
 * To switch to embedded iframe or REST API later, only this file changes.
 *
 * Env vars (set in Vercel dashboard, blank in dev = "sandbox" mode):
 *   SUMIT_SANDBOX                = "true" | "false"  (default: true in dev)
 *   SUMIT_CHECKOUT_HADRECH       = full Sumit checkout URL for תוכנית הדרך
 *   SUMIT_CHECKOUT_COACHING      = full Sumit checkout URL for ליווי אישי
 *   SUMIT_CHECKOUT_BOOK          = full Sumit checkout URL for הספר
 *   SUMIT_CHECKOUT_WORKSHOP      = full Sumit checkout URL for סדנת אונליין
 */

export type SumitProduct = "hadrech" | "coaching" | "book" | "workshop";

const ENV_MAP: Record<SumitProduct, string> = {
  hadrech: "SUMIT_CHECKOUT_HADRECH",
  coaching: "SUMIT_CHECKOUT_COACHING",
  book: "SUMIT_CHECKOUT_BOOK",
  workshop: "SUMIT_CHECKOUT_WORKSHOP",
};

const FALLBACK_INFO_URL: Record<SumitProduct, string> = {
  hadrech: "/hadrech",
  coaching: "/coaching",
  book: "/book",
  workshop: "/community",
};

export type CheckoutResult =
  | { mode: "live" | "sandbox"; url: string; configured: true }
  | { mode: "unconfigured"; url: string; configured: false };

/**
 * Returns the checkout URL for a given product.
 * If the env var is missing (dev / pre-launch), falls back to the
 * product info page with a query flag so the UI can show "Coming soon".
 */
export function getCheckoutUrl(product: SumitProduct): CheckoutResult {
  const envKey = ENV_MAP[product];
  const url = process.env[envKey];

  if (!url) {
    return {
      mode: "unconfigured",
      url: `${FALLBACK_INFO_URL[product]}?checkout=coming-soon`,
      configured: false,
    };
  }

  const isSandbox =
    process.env.SUMIT_SANDBOX === "true" ||
    url.includes("sandbox.sumit.co.il") ||
    process.env.NODE_ENV !== "production";

  return {
    mode: isSandbox ? "sandbox" : "live",
    url,
    configured: true,
  };
}

export const SUMIT_PRODUCT_LABELS: Record<SumitProduct, string> = {
  hadrech: "תוכנית הדרך",
  coaching: "ליווי אישי",
  book: "הספר אומנות הקשר",
  workshop: "סדנת אונליין",
};
