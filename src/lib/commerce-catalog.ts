import { PRODUCT_FACTS } from "@/lib/product-facts";
import { PRODUCTS } from "@/lib/products";
import { SUMIT_PRODUCTS, type SumitProduct } from "@/lib/sumit-products";
import {
  validateCommerceCatalogs,
  type CheckoutCatalogRole,
  type LegacyCatalogRole,
  type UnresolvedCatalogRelationship,
} from "@/lib/commerce-catalog-validator";

/**
 * Explicit disposition of the display/marketing catalog formerly connected to
 * `/api/checkout`. Adding or removing an entry without updating this manifest
 * makes the canonical checkout endpoint fail closed.
 */
export const LEGACY_CATALOG_ROLES: Readonly<Record<string, LegacyCatalogRole>> = {
  "the-way": "retired-checkout",
  "the-way-plus": "retired-checkout",
  "dating-card": "retired-checkout",
  "club-90d": "retired-checkout",
  "vip-coaching": "booking-only",
};

/**
 * Sumit owns this catalog, but every product remains contained until durable
 * order state and fulfillment exist. This is classification, not launch state.
 */
export const CHECKOUT_CATALOG_ROLES: Readonly<Record<string, CheckoutCatalogRole>> = {
  "hadrech-full": "contained-canonical",
  "discovery-call": "contained-canonical",
  "book-preorder": "contained-canonical",
  "coaching-3pack": "contained-canonical",
};

/**
 * The legacy and gateway catalogs use different keys, so mechanical duplicate
 * checks cannot resolve this likely product-family collision. Prices/SKUs must
 * not be merged by inference; checkout stays invalid until an owner decides
 * which offer is canonical and removes this unresolved relationship.
 */
export const UNRESOLVED_CATALOG_RELATIONSHIPS: UnresolvedCatalogRelationship[] = [
  {
    id: "the-way-program-family",
    legacyKeys: ["the-way", "the-way-plus"],
    checkoutKeys: ["hadrech-full"],
  },
];

export const COMMERCE_CATALOG_ISSUES = validateCommerceCatalogs({
  legacyProducts: PRODUCTS,
  checkoutProducts: SUMIT_PRODUCTS,
  legacyRoles: LEGACY_CATALOG_ROLES,
  checkoutRoles: CHECKOUT_CATALOG_ROLES,
  onlineCheckoutAvailable: PRODUCT_FACTS.commerce.onlineCheckoutAvailable,
  unresolvedRelationships: UNRESOLVED_CATALOG_RELATIONSHIPS,
});

export function isCommerceCatalogValid(): boolean {
  return COMMERCE_CATALOG_ISSUES.length === 0;
}

/** The sole product lookup used by the canonical Sumit checkout endpoint. */
export function getCanonicalCheckoutProduct(slug: string): SumitProduct | undefined {
  return SUMIT_PRODUCTS[slug];
}
