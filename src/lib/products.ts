/**
 * Product catalog — single source of truth for everything the site sells.
 *
 * Each entry maps a public URL slug to: display info (page content),
 * pricing, and Sumit checkout configuration.
 *
 * Adding a product:
 *   1. Add it here.
 *   2. Create the landing page at `src/app/programs/<slug>/page.tsx` (or other
 *      route — match the `path` field).
 *   3. The landing page imports `getProduct(slug)` and renders a CheckoutButton.
 *   4. `POST /api/checkout { slug, name, email, phone? }` reads this catalog,
 *      calls Sumit, returns the hosted-checkout URL.
 */

export type ProductType = "one-time" | "recurring-monthly" | "booking-required";

export interface ProductPrice {
  /** Display price in ILS (₪). Sumit charges in same currency. */
  amount: number;
  /** Original/anchor price for "savings" framing. Optional. */
  anchorAmount?: number;
  /** Internal value-stack reference (e.g. for compare-to copy). */
  valueAmount?: number;
}

export interface Product {
  slug: string;
  /** Public-route path, e.g. `/programs/the-way`. */
  path: string;
  /** Display name (Hebrew, used on Sumit checkout + tax doc). */
  nameHe: string;
  /** Short tagline (Hebrew). */
  taglineHe: string;
  /** Description for Sumit document (Hebrew). */
  descriptionHe: string;
  /** Product type — drives checkout behavior. */
  type: ProductType;
  /** Pricing. For `booking-required`, leave amount=0 and route via booking. */
  price: ProductPrice;
  /** Max installments offered on Sumit checkout. */
  maxPayments?: number;
  /** Internal SKU, surfaced on tax document. */
  sku: string;
  /** Tag fed into Rav-Messer for post-purchase segmentation. */
  ravMesserTag?: string;
}

export const PRODUCTS: Record<string, Product> = {
  "the-way": {
    slug: "the-way",
    path: "/programs/the-way",
    nameHe: "תוכנית הדרך",
    taglineHe: "90 ימים למציאת זוגיות מאושרת — בליווי ובהתחייבות",
    descriptionHe:
      "תוכנית מקיפה למציאת זוגיות מאושרת תוך 90 יום: 6 שלבי השיטה, ליווי יומיומי ממנטור, קהילה תומכת, חדר תרגול.",
    type: "one-time",
    price: { amount: 1850, anchorAmount: 2050 },
    maxPayments: 12,
    sku: "OHK-WAY-001",
    ravMesserTag: "purchase:the-way",
  },
  "the-way-plus": {
    slug: "the-way-plus",
    path: "/programs/the-way-plus",
    nameHe: "תוכנית הדרך + חדר כושר לדייטים",
    taglineHe: "המסלול המלא — תוכנית הדרך + 12 מפגשי תרגול אונליין",
    descriptionHe:
      "תוכנית הדרך המלאה כולל חדר כושר לדייטים: 12 מפגשי תרגול אונליין לאימון מעשי, ליווי VIP, כל הבונוסים.",
    type: "one-time",
    price: { amount: 2970, anchorAmount: 4500, valueAmount: 12420 },
    maxPayments: 12,
    sku: "OHK-WAY-PLUS-001",
    ravMesserTag: "purchase:the-way-plus",
  },
  "dating-card": {
    slug: "dating-card",
    path: "/products/dating-card",
    nameHe: "כרטיס היכרויות מנצח",
    taglineHe: "אלעד והצוות יכתבו לך כרטיס היכרויות שמכפיל פניות",
    descriptionHe:
      "כתיבה אישית של פרופיל היכרויות מקצועי. שאלון אישי → ניסוח על ידי הצוות → שליחה למייל. כולל 3 בונוסים.",
    type: "one-time",
    price: { amount: 97, valueAmount: 800 },
    maxPayments: 1,
    sku: "OHK-CARD-001",
    ravMesserTag: "purchase:dating-card",
  },
  "club-90d": {
    slug: "club-90d",
    path: "/club",
    nameHe: "מועדון הדרך 90D",
    taglineHe: "מועדון חודשי — מפגש שבועי, ליווי, קהילה",
    descriptionHe:
      "מועדון מנויים חודשי: מפגש תמיכה שבועי, ליווי יומיומי בצ׳אט, קהילה, בונוסים. ללא התחייבות, ביטול בכל עת.",
    type: "recurring-monthly",
    price: { amount: 4, anchorAmount: 30 },
    sku: "OHK-CLUB-001",
    ravMesserTag: "purchase:club-90d",
  },
  "vip-coaching": {
    slug: "vip-coaching",
    path: "/coaching/vip",
    nameHe: "ליווי אישי VIP",
    taglineHe: "ליווי אישי עד החופה — מוגבל ל-10 לקוחות",
    descriptionHe:
      "ליווי אישי 6-12 חודשים עם התחייבות לתוצאה. שיחת היכרות חינמית של 30 דקות לבדיקת התאמה.",
    type: "booking-required",
    price: { amount: 0 },
    sku: "OHK-VIP-001",
    ravMesserTag: "lead:vip-consultation",
  },
};

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS[slug];
}

export function listProducts(): Product[] {
  return Object.values(PRODUCTS);
}

export function isValidSlug(slug: string): slug is keyof typeof PRODUCTS {
  return slug in PRODUCTS;
}

/** Format ₪ for UI display, e.g. 1850 → "₪1,850". */
export function formatILS(amount: number): string {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(amount);
}
