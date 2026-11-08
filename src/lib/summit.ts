/**
 * Summit (Hashavshevet) checkout integration.
 *
 * Summit offers multiple billing models. We deliberately AVOID their "Daily"
 * (per-day recurring) model — Elad's products use:
 *   - one-time     (single payment, optionally with installments — תשלומים)
 *   - subscription (monthly recurring — חודשי, NOT daily)
 *
 * Activation: set SUMMIT_ACCOUNT_ID + per-product SUMMIT_*_PAGE_ID env vars
 * in production. While unset, the SummitCheckout component shows a WhatsApp
 * fallback CTA so the page is never broken for visitors.
 *
 * Iframe URL pattern (Summit hosted checkout):
 *   https://www.greeninvoice.co.il/secure/payment/{accountId}/{pageId}
 * Each pageId is configured inside Summit's admin (one page per product),
 * which is where one-time vs installments vs monthly subscription is set —
 * NOT here in code. This keeps the choice manual and avoids picking "Daily"
 * accidentally.
 */

export type SummitMode = 'one-time' | 'installments' | 'monthly';

export interface SummitProduct {
  /** Stable product slug used as env-var key (uppercased) */
  slug: string;
  /** Public-facing Hebrew name */
  titleHe: string;
  /** Display amount in ILS (₪) — for label only; real amount lives in Summit */
  amountIls: number;
  /** Billing model (informational — actual config lives in Summit admin) */
  mode: SummitMode;
  /** Max installments to advertise (relevant when mode = 'installments') */
  maxInstallments?: number;
}

export const SUMMIT_PRODUCTS: Record<string, SummitProduct> = {
  'hadrech-jim': {
    slug: 'hadrech-jim',
    titleHe: 'הדרך + חדר כושר לדייטים',
    amountIls: 2970,
    mode: 'installments',
    maxInstallments: 12,
  },
  'hadrech-only': {
    slug: 'hadrech-only',
    titleHe: 'תוכנית הדרך (בלבד)',
    amountIls: 1850,
    mode: 'installments',
    maxInstallments: 12,
  },
  'jim-only': {
    slug: 'jim-only',
    titleHe: 'חדר כושר לדייטים (בלבד)',
    amountIls: 1850,
    mode: 'installments',
    maxInstallments: 12,
  },
  'club-90d': {
    slug: 'club-90d',
    titleHe: 'מועדון הדרך 90D',
    amountIls: 30,
    mode: 'monthly',
  },
  'dating-card': {
    slug: 'dating-card',
    titleHe: 'כרטיס היכרויות מנצח',
    amountIls: 97,
    mode: 'one-time',
  },
};

export function getSummitProduct(slug: string): SummitProduct | undefined {
  return SUMMIT_PRODUCTS[slug];
}

/**
 * Build the Summit iframe URL for a product. Returns null when env is
 * incomplete — callers must render a fallback (WhatsApp CTA) in that case.
 */
export function getSummitCheckoutUrl(slug: string): string | null {
  const accountId = process.env.NEXT_PUBLIC_SUMMIT_ACCOUNT_ID;
  if (!accountId) return null;

  const envKey = `NEXT_PUBLIC_SUMMIT_PAGE_${slug.toUpperCase().replace(/-/g, '_')}`;
  const pageId = process.env[envKey];
  if (!pageId) return null;

  return `https://www.greeninvoice.co.il/secure/payment/${accountId}/${pageId}`;
}
