export const COMPANION_PRODUCT_STATUSES = [
  "available",
  "beta",
  "contained",
  "planned",
  "archive",
] as const;

export const COMPANION_PRODUCT_OWNERS = [
  "website",
  "book",
  "course",
  "lms",
  "ecosystem",
  "owner",
  "content",
  "community-ops",
  "brand",
] as const;

export const COMPANION_PRODUCT_SURFACES = [
  "website",
  "book-repo",
  "course-repo",
  "lms",
  "audit-ledger",
  "brand-governance",
] as const;

export const COMPANION_CORE_PRODUCTS = [
  "website",
  "book",
  "course",
  "ecosystem",
] as const;

export const COMPANION_ACCESS_CLASSES = ["public", "protected", "reference"] as const;

export const COMPANION_ENTITLEMENTS = [
  "none",
  "book-purchase",
  "course-access",
  "community-access",
  "not-applicable",
] as const;

export type CompanionProductStatus = (typeof COMPANION_PRODUCT_STATUSES)[number];
export type CompanionProductOwner = (typeof COMPANION_PRODUCT_OWNERS)[number];
export type CompanionProductSurface = (typeof COMPANION_PRODUCT_SURFACES)[number];
export type CompanionCoreProduct = (typeof COMPANION_CORE_PRODUCTS)[number];
export type CompanionAccessClass = (typeof COMPANION_ACCESS_CLASSES)[number];
export type CompanionEntitlement = (typeof COMPANION_ENTITLEMENTS)[number];

export interface CompanionProduct {
  id: string;
  title: string;
  status: CompanionProductStatus;
  owner: CompanionProductOwner;
  surface: CompanionProductSurface;
  coreProduct: CompanionCoreProduct;
  access: CompanionAccessClass;
  entitlement: CompanionEntitlement;
  summary: string;
  routes?: string[];
  assets?: string[];
}

export type CompanionProductIssueCode =
  | "registry-not-array"
  | "item-not-object"
  | "forbidden-field"
  | "unexpected-field"
  | "invalid-id"
  | "invalid-title"
  | "invalid-summary"
  | "invalid-status"
  | "invalid-owner"
  | "invalid-surface"
  | "invalid-core-product"
  | "invalid-access"
  | "invalid-entitlement"
  | "invalid-route"
  | "invalid-asset"
  | "duplicate-id"
  | "duplicate-route"
  | "duplicate-asset"
  | "available-without-public-target"
  | "available-non-public"
  | "protected-without-entitlement"
  | "public-with-entitlement"
  | "reference-entitlement-mismatch"
  | "sensitive-value";

export interface CompanionProductIssue {
  code: CompanionProductIssueCode;
  item?: string;
  field?: string;
}

const ALLOWED_FIELDS = new Set([
  "id",
  "title",
  "status",
  "owner",
  "surface",
  "coreProduct",
  "access",
  "entitlement",
  "summary",
  "routes",
  "assets",
]);

const FORBIDDEN_FIELD = /(?:internal|restricted|client|customer|pii|email|phone|testimonial|price|proof|secret|token)/i;
const WINDOWS_HOME_PATH = /[a-z]:[\\/]users[\\/]/i;
const EMAIL_VALUE = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/;
const PHONE_VALUE = /(?:\+?972|0[2-9])-?\d{7,9}/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEnumValue<T extends readonly string[]>(values: T, value: unknown): value is T[number] {
  return typeof value === "string" && values.includes(value as T[number]);
}

function isNonEmptyText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function stringArray(value: unknown): string[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) return null;
  return value;
}

function containsSensitiveValue(value: unknown): boolean {
  if (typeof value === "string") {
    return WINDOWS_HOME_PATH.test(value) || EMAIL_VALUE.test(value) || PHONE_VALUE.test(value);
  }
  if (Array.isArray(value)) return value.some(containsSensitiveValue);
  if (isRecord(value)) return Object.values(value).some(containsSensitiveValue);
  return false;
}

function addDuplicateIssues(
  issues: CompanionProductIssue[],
  code: "duplicate-id" | "duplicate-route" | "duplicate-asset",
  values: string[],
  item: string,
): void {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) issues.push({ code, item, field: value });
    seen.add(value);
  }
}

export function validateCompanionProductRegistry(input: unknown): CompanionProductIssue[] {
  if (!Array.isArray(input)) return [{ code: "registry-not-array" }];

  const issues: CompanionProductIssue[] = [];
  const ids: string[] = [];
  const routesAcrossRegistry: string[] = [];
  const assetsAcrossRegistry: string[] = [];

  input.forEach((rawItem, index) => {
    const fallbackId = `index:${index}`;
    if (!isRecord(rawItem)) {
      issues.push({ code: "item-not-object", item: fallbackId });
      return;
    }

    const itemId = typeof rawItem.id === "string" ? rawItem.id : fallbackId;
    for (const field of Object.keys(rawItem)) {
      if (FORBIDDEN_FIELD.test(field)) {
        issues.push({ code: "forbidden-field", item: itemId, field });
      } else if (!ALLOWED_FIELDS.has(field)) {
        issues.push({ code: "unexpected-field", item: itemId, field });
      }
    }

    if (!/^CP-\d{2}$/.test(String(rawItem.id ?? ""))) {
      issues.push({ code: "invalid-id", item: itemId });
    } else {
      ids.push(rawItem.id as string);
    }
    if (!isNonEmptyText(rawItem.title, 120)) issues.push({ code: "invalid-title", item: itemId });
    if (!isNonEmptyText(rawItem.summary, 320)) issues.push({ code: "invalid-summary", item: itemId });
    if (!isEnumValue(COMPANION_PRODUCT_STATUSES, rawItem.status)) issues.push({ code: "invalid-status", item: itemId });
    if (!isEnumValue(COMPANION_PRODUCT_OWNERS, rawItem.owner)) issues.push({ code: "invalid-owner", item: itemId });
    if (!isEnumValue(COMPANION_PRODUCT_SURFACES, rawItem.surface)) issues.push({ code: "invalid-surface", item: itemId });
    if (!isEnumValue(COMPANION_CORE_PRODUCTS, rawItem.coreProduct)) issues.push({ code: "invalid-core-product", item: itemId });
    if (!isEnumValue(COMPANION_ACCESS_CLASSES, rawItem.access)) issues.push({ code: "invalid-access", item: itemId });
    if (!isEnumValue(COMPANION_ENTITLEMENTS, rawItem.entitlement)) issues.push({ code: "invalid-entitlement", item: itemId });

    const routes = stringArray(rawItem.routes);
    const assets = stringArray(rawItem.assets);
    if (routes === null) {
      issues.push({ code: "invalid-route", item: itemId, field: "routes" });
    } else {
      for (const route of routes) {
        if (!/^\/(?!\/)[a-z0-9][a-z0-9\-/]*$/.test(route)) {
          issues.push({ code: "invalid-route", item: itemId, field: route });
        }
        routesAcrossRegistry.push(route);
      }
    }
    if (assets === null) {
      issues.push({ code: "invalid-asset", item: itemId, field: "assets" });
    } else {
      for (const asset of assets) {
        if (!/^\/(?!\/)[a-z0-9][a-z0-9._\-/]*$/.test(asset)) {
          issues.push({ code: "invalid-asset", item: itemId, field: asset });
        }
        assetsAcrossRegistry.push(asset);
      }
    }

    const routeCount = routes?.length ?? 0;
    const assetCount = assets?.length ?? 0;
    if (rawItem.status === "available" && routeCount + assetCount === 0) {
      issues.push({ code: "available-without-public-target", item: itemId });
    }
    if (rawItem.status === "available" && rawItem.access !== "public") {
      issues.push({ code: "available-non-public", item: itemId });
    }
    if (
      rawItem.access === "protected" &&
      (rawItem.entitlement === "none" || rawItem.entitlement === "not-applicable")
    ) {
      issues.push({ code: "protected-without-entitlement", item: itemId });
    }
    if (rawItem.access === "public" && rawItem.entitlement !== "none") {
      issues.push({ code: "public-with-entitlement", item: itemId });
    }
    if (rawItem.access === "reference" && rawItem.entitlement !== "not-applicable") {
      issues.push({ code: "reference-entitlement-mismatch", item: itemId });
    }
    if (containsSensitiveValue(rawItem)) issues.push({ code: "sensitive-value", item: itemId });
  });

  addDuplicateIssues(issues, "duplicate-id", ids, "registry");
  addDuplicateIssues(issues, "duplicate-route", routesAcrossRegistry, "registry");
  addDuplicateIssues(issues, "duplicate-asset", assetsAcrossRegistry, "registry");
  return issues;
}

export function assertCompanionProductRegistry(input: unknown): asserts input is CompanionProduct[] {
  const issues = validateCompanionProductRegistry(input);
  if (issues.length === 0) return;
  const summary = issues
    .map((issue) => `${issue.code}${issue.item ? `:${issue.item}` : ""}${issue.field ? `:${issue.field}` : ""}`)
    .join(", ");
  throw new Error(`Companion product registry failed: ${summary}`);
}
