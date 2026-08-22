/**
 * Sumit product catalog for אומנות הקשר.
 *
 * Canonical gateway catalog: each product is one contained checkout target.
 * Sumit will eventually:
 *   1. Charge credit/Bit/Apple Pay
 *   2. Auto-issue a Hebrew receipt (קבלה) via Sumit accounting
 *   3. Fire a webhook → /api/sumit/webhook
 *
 * The webhook currently fulfills nothing and fails closed. A durable pending-
 * order/event store and transactional fulfillment must be implemented before
 * checkout can be enabled.
 *
 * Prices in NIS, including 0% VAT (Elad = עוסק פטור).
 * Update prices here when promotional pricing changes — single source of truth.
 */

export interface SumitProduct {
  /** Slug used in the canonical /api/sumit/checkout body */
  slug: string;
  /** Hebrew product name (appears on the receipt) */
  nameHe: string;
  /** SKU sent to Sumit + matched in webhook for tagging */
  sku: string;
  /** Price in NIS */
  amount: number;
  /** Description on receipt + checkout page */
  description: string;
  /** Rav-Messer tag to add on successful purchase */
  ravMesserTag: string;
  /** Whether this product issues recurring billing (hora'at keva) */
  recurring?: boolean;
}

export const SUMIT_PRODUCTS: Record<string, SumitProduct> = {
  // Main program — "הדרך" 12-week program
  'hadrech-full': {
    slug: 'hadrech-full',
    nameHe: 'תוכנית "הדרך" — מסלול מלא',
    sku: 'hadrech-full-2026',
    amount: 2997,
    description: 'תוכנית 12 שבועות למציאת זוגיות — גישה מלאה לכל השיעורים, התרגילים, והקהילה',
    ravMesserTag: 'product:hadrech-full',
  },

  // Discovery call / consultation
  'discovery-call': {
    slug: 'discovery-call',
    nameHe: 'שיחת אבחון אישית',
    sku: 'discovery-call-2026',
    amount: 197,
    description: 'שיחת אבחון אישית 30 דקות עם אלעד יעקובוביץ׳ — להבין איפה אתה עומד ומה הצעד הבא',
    ravMesserTag: 'product:discovery-call',
  },

  // The book pre-order
  'book-preorder': {
    slug: 'book-preorder',
    nameHe: 'הספר "אומנות הקשר" — מכירה מוקדמת',
    sku: 'book-preorder-2026',
    amount: 89,
    description: 'מכירה מוקדמת של הספר "אומנות הקשר — הדרך לזוגיות שאתה ראוי לה". משלוח עם יציאת הספר.',
    ravMesserTag: 'product:book-preorder',
  },

  // 1-on-1 coaching package (3 sessions)
  'coaching-3pack': {
    slug: 'coaching-3pack',
    nameHe: 'חבילת ליווי אישי — 3 פגישות',
    sku: 'coaching-3pack-2026',
    amount: 1497,
    description: 'שלוש פגישות ליווי אישי של שעה עם אלעד יעקובוביץ׳, גמיש לתיאום, כולל וואטסאפ פתוח',
    ravMesserTag: 'product:coaching-3pack',
  },
};
