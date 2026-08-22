export type LegacyCatalogRole = "retired-checkout" | "booking-only";
export type CheckoutCatalogRole = "contained-canonical";

export interface LegacyCatalogProduct {
  slug: string;
  sku: string;
  type: string;
  price: { amount: number };
}

export interface CheckoutCatalogProduct {
  slug: string;
  sku: string;
  amount: number;
}

export interface CommerceCatalogValidationInput {
  legacyProducts: Record<string, LegacyCatalogProduct>;
  checkoutProducts: Record<string, CheckoutCatalogProduct>;
  legacyRoles: Record<string, LegacyCatalogRole>;
  checkoutRoles: Record<string, CheckoutCatalogRole>;
  onlineCheckoutAvailable: boolean;
  unresolvedRelationships?: UnresolvedCatalogRelationship[];
}

export interface UnresolvedCatalogRelationship {
  id: string;
  legacyKeys: string[];
  checkoutKeys: string[];
}

export type CommerceCatalogIssueCode =
  | "legacy-product-unclassified"
  | "checkout-product-unclassified"
  | "stale-legacy-role"
  | "stale-checkout-role"
  | "catalog-key-slug-mismatch"
  | "legacy-role-type-mismatch"
  | "invalid-product-amount"
  | "duplicate-sku"
  | "cross-catalog-slug-overlap"
  | "cross-catalog-sku-overlap"
  | "stale-catalog-relationship-reference"
  | "unresolved-catalog-relationship"
  | "public-checkout-enabled-during-containment";

export interface CommerceCatalogIssue {
  code: CommerceCatalogIssueCode;
  catalog?: "legacy" | "checkout" | "cross-catalog";
  key?: string;
}

function hasOwn(record: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function isPositiveFiniteAmount(amount: number): boolean {
  return Number.isFinite(amount) && amount > 0;
}

function duplicateSkuIssues(
  catalog: "legacy" | "checkout",
  products: Record<string, { sku: string }>,
): CommerceCatalogIssue[] {
  const issues: CommerceCatalogIssue[] = [];
  const firstKeyBySku = new Map<string, string>();

  for (const [key, product] of Object.entries(products)) {
    const existingKey = firstKeyBySku.get(product.sku);
    if (existingKey) {
      issues.push({ code: "duplicate-sku", catalog, key: `${existingKey},${key}` });
    } else {
      firstKeyBySku.set(product.sku, key);
    }
  }

  return issues;
}

/**
 * Fail-closed policy for the repository's two historical catalogs.
 *
 * `checkoutProducts` is the only catalog owned by the Sumit gateway.
 * `legacyProducts` remains a marketing/display catalog whose former endpoint
 * is retired. Explicit role manifests prevent a newly added product from
 * silently becoming payable or drifting into both catalogs.
 */
export function validateCommerceCatalogs(
  input: CommerceCatalogValidationInput,
): CommerceCatalogIssue[] {
  const issues: CommerceCatalogIssue[] = [];

  for (const [key, product] of Object.entries(input.legacyProducts)) {
    if (!hasOwn(input.legacyRoles, key)) {
      issues.push({ code: "legacy-product-unclassified", catalog: "legacy", key });
    }
    if (product.slug !== key) {
      issues.push({ code: "catalog-key-slug-mismatch", catalog: "legacy", key });
    }

    const role = input.legacyRoles[key];
    const isBookingOnly = product.type === "booking-required";
    if (
      (role === "booking-only" && !isBookingOnly) ||
      (role === "retired-checkout" && isBookingOnly)
    ) {
      issues.push({ code: "legacy-role-type-mismatch", catalog: "legacy", key });
    }

    const amount = product.price.amount;
    if (isBookingOnly ? amount !== 0 : !isPositiveFiniteAmount(amount)) {
      issues.push({ code: "invalid-product-amount", catalog: "legacy", key });
    }
  }

  for (const key of Object.keys(input.legacyRoles)) {
    if (!hasOwn(input.legacyProducts, key)) {
      issues.push({ code: "stale-legacy-role", catalog: "legacy", key });
    }
  }

  for (const [key, product] of Object.entries(input.checkoutProducts)) {
    if (!hasOwn(input.checkoutRoles, key)) {
      issues.push({ code: "checkout-product-unclassified", catalog: "checkout", key });
    }
    if (product.slug !== key) {
      issues.push({ code: "catalog-key-slug-mismatch", catalog: "checkout", key });
    }
    if (!isPositiveFiniteAmount(product.amount)) {
      issues.push({ code: "invalid-product-amount", catalog: "checkout", key });
    }
  }

  for (const key of Object.keys(input.checkoutRoles)) {
    if (!hasOwn(input.checkoutProducts, key)) {
      issues.push({ code: "stale-checkout-role", catalog: "checkout", key });
    }
  }

  issues.push(...duplicateSkuIssues("legacy", input.legacyProducts));
  issues.push(...duplicateSkuIssues("checkout", input.checkoutProducts));

  const legacyKeyBySku = new Map(
    Object.entries(input.legacyProducts).map(([key, product]) => [product.sku, key]),
  );
  for (const [key, product] of Object.entries(input.checkoutProducts)) {
    if (hasOwn(input.legacyProducts, key)) {
      issues.push({ code: "cross-catalog-slug-overlap", catalog: "cross-catalog", key });
    }
    const legacyKey = legacyKeyBySku.get(product.sku);
    if (legacyKey) {
      issues.push({
        code: "cross-catalog-sku-overlap",
        catalog: "cross-catalog",
        key: `${legacyKey},${key}`,
      });
    }
  }

  for (const relationship of input.unresolvedRelationships ?? []) {
    let referencesExist = true;
    for (const key of relationship.legacyKeys) {
      if (!hasOwn(input.legacyProducts, key)) {
        referencesExist = false;
        issues.push({
          code: "stale-catalog-relationship-reference",
          catalog: "legacy",
          key: `${relationship.id}:${key}`,
        });
      }
    }
    for (const key of relationship.checkoutKeys) {
      if (!hasOwn(input.checkoutProducts, key)) {
        referencesExist = false;
        issues.push({
          code: "stale-catalog-relationship-reference",
          catalog: "checkout",
          key: `${relationship.id}:${key}`,
        });
      }
    }
    if (referencesExist) {
      issues.push({
        code: "unresolved-catalog-relationship",
        catalog: "cross-catalog",
        key: relationship.id,
      });
    }
  }

  if (input.onlineCheckoutAvailable) {
    issues.push({ code: "public-checkout-enabled-during-containment" });
  }

  return issues;
}

export function assertCommerceCatalogIntegrity(input: CommerceCatalogValidationInput): void {
  const issues = validateCommerceCatalogs(input);
  if (issues.length === 0) return;

  const summary = issues
    .map((issue) => `${issue.code}${issue.key ? `:${issue.key}` : ""}`)
    .join(", ");
  throw new Error(`Commerce catalog integrity failed: ${summary}`);
}
