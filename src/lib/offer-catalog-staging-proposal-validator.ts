export type OfferCatalogProposalIssue = { code: string; item?: string; field?: string };

type Obj = Record<string, unknown>;

const EXPECTED_OFFERS = new Map<string, { min: number; max: number }>([
  ["OH-BOOK-PRINT-01", { min: 99, max: 149 }],
  ["OH-DATING-CARD-SVC-01", { min: 249, max: 490 }],
  ["OH-WAY-COURSE-01", { min: 990, max: 2490 }],
  ["OH-GUIDANCE-3-01", { min: 1290, max: 2250 }],
]);
const FORBIDDEN_OPERATIONAL_KEYS = new Set([
  "checkoutUrl", "paymentUrl", "providerProductId", "providerSku", "liveProductId", "webhookSecret",
]);
const SENSITIVE = /(?:[a-z]:[\\/]users[\\/]|\b[^\s@]+@[^\s@]+\.[^\s@]+\b|(?:\+?972|0[2-9])-?\d{7,9})/i;

function obj(value: unknown): value is Obj {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasSensitive(value: unknown): boolean {
  if (typeof value === "string") return SENSITIVE.test(value);
  if (Array.isArray(value)) return value.some(hasSensitive);
  return obj(value) && Object.values(value).some(hasSensitive);
}

function findForbiddenKey(value: unknown): string | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findForbiddenKey(item);
      if (found) return found;
    }
    return null;
  }
  if (!obj(value)) return null;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_OPERATIONAL_KEYS.has(key)) return key;
    const found = findForbiddenKey(child);
    if (found) return found;
  }
  return null;
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === "string") : [];
}

function entitlementIds(offer: Obj): string[] {
  if (!Array.isArray(offer.entitlements)) return [];
  return offer.entitlements.filter(obj).map((entry) => String(entry.id ?? ""));
}

export function validateOfferCatalogStagingProposal(input: unknown): OfferCatalogProposalIssue[] {
  if (!obj(input)) return [{ code: "proposal-not-object" }];
  const issues: OfferCatalogProposalIssue[] = [];

  if (input.schemaVersion !== 1) issues.push({ code: "unsupported-schema-version" });
  if (input.decisionId !== "offer-ladder-balanced-b") issues.push({ code: "decision-drift" });
  if (input.contractState !== "staging-proposal-only") issues.push({ code: "contract-not-staging-only" });
  if (input.currency !== "ILS") issues.push({ code: "currency-drift" });
  if (input.humanApproval !== null) issues.push({ code: "human-approval-invented", field: "humanApproval" });

  if (!obj(input.activation)) issues.push({ code: "activation-missing" });
  else {
    for (const field of ["publicCatalog", "publicPricing", "checkout", "providerSync", "fulfillmentWriters", "deploy"]) {
      if (input.activation[field] !== false) issues.push({ code: "activation-not-blocked", field });
    }
  }

  if (!obj(input.pricePolicy)) issues.push({ code: "price-policy-missing" });
  else {
    for (const field of ["amountsAreUnapprovedHypotheses", "consumerTotalPriceRequired", "mandatoryChargesMustNotBeHidden"]) {
      if (input.pricePolicy[field] !== true) issues.push({ code: "unsafe-price-policy", field });
    }
    for (const field of ["comparisonPriceAllowed", "discountClaimAllowed", "guaranteeClaimAllowed"]) {
      if (input.pricePolicy[field] !== false) issues.push({ code: "unsupported-price-claim-enabled", field });
    }
  }

  if (!Array.isArray(input.offers)) return [...issues, { code: "offers-not-array" }];
  if (input.offers.length !== 4) issues.push({ code: "offer-count-not-four" });
  const seen = new Set<string>();
  for (const raw of input.offers) {
    if (!obj(raw)) { issues.push({ code: "offer-not-object" }); continue; }
    const sku = String(raw.sku ?? "missing-sku");
    if (seen.has(sku)) issues.push({ code: "duplicate-sku", item: sku });
    seen.add(sku);
    const expectedRange = EXPECTED_OFFERS.get(sku);
    if (!expectedRange) issues.push({ code: "unexpected-sku", item: sku });
    else if (
      !obj(raw.consumerPriceHypothesisRangeIls)
      || raw.consumerPriceHypothesisRangeIls.min !== expectedRange.min
      || raw.consumerPriceHypothesisRangeIls.max !== expectedRange.max
      || raw.consumerPriceHypothesisRangeIls.basis !== "existing-a-b-c-options"
      || expectedRange.min >= expectedRange.max
    ) issues.push({ code: "price-hypothesis-range-invalid", item: sku });
    if (raw.selectedPriceIls !== null) issues.push({ code: "selected-price-invented", item: sku, field: "selectedPriceIls" });
    if ("proposedConsumerPriceIls" in raw) issues.push({ code: "exact-proposed-price-present", item: sku, field: "proposedConsumerPriceIls" });
    if (raw.billing !== "one-time") issues.push({ code: "recurring-billing-introduced", item: sku });
    if (raw.activationState !== "blocked") issues.push({ code: "offer-activation-not-blocked", item: sku });
    if (raw.humanApproval !== null) issues.push({ code: "human-approval-invented", item: sku, field: "humanApproval" });
    if (!Array.isArray(raw.contents) || raw.contents.length === 0) issues.push({ code: "contents-missing", item: sku });
    if (!Array.isArray(raw.exclusions) || raw.exclusions.length === 0) issues.push({ code: "exclusions-missing", item: sku });
    if (!Array.isArray(raw.entitlements)) issues.push({ code: "entitlements-missing", item: sku });
    if (!obj(raw.fulfillment) || raw.fulfillment.state !== "blocked-until-staging" || raw.fulfillment.requiresBuyerIsolation !== true) {
      issues.push({ code: "unsafe-fulfillment-boundary", item: sku });
    }
    if (!obj(raw.refundBoundary) || raw.refundBoundary.policyApproved !== false || raw.refundBoundary.publicPromiseAllowed !== false) {
      issues.push({ code: "unsafe-refund-boundary", item: sku });
    }
  }
  for (const sku of EXPECTED_OFFERS.keys()) if (!seen.has(sku)) issues.push({ code: "missing-sku", item: sku });

  const book = input.offers.find((entry) => obj(entry) && entry.sku === "OH-BOOK-PRINT-01") as Obj | undefined;
  if (!book || !stringList(book.contents).includes("edition-matched-book-companion") || !entitlementIds(book).includes("book-purchase")) {
    issues.push({ code: "book-companion-boundary-missing", item: "OH-BOOK-PRINT-01" });
  }
  const dating = input.offers.find((entry) => obj(entry) && entry.sku === "OH-DATING-CARD-SVC-01") as Obj | undefined;
  if (!dating || entitlementIds(dating).length !== 0) issues.push({ code: "dating-service-entitlement-invented", item: "OH-DATING-CARD-SVC-01" });
  const course = input.offers.find((entry) => obj(entry) && entry.sku === "OH-WAY-COURSE-01") as Obj | undefined;
  const courseEntitlements = course ? entitlementIds(course) : [];
  for (const id of ["course-access", "simulator-access", "community-access"]) {
    if (!courseEntitlements.includes(id)) issues.push({ code: "course-entitlement-missing", item: id });
  }

  if (!obj(input.nonSkuDecisions)) issues.push({ code: "non-sku-decisions-missing" });
  else {
    const companion = input.nonSkuDecisions.bookCompanion;
    if (!obj(companion) || companion.standaloneSku !== false || companion.includedWithBook !== true) issues.push({ code: "book-companion-sku-drift" });
    const simulator = input.nonSkuDecisions.simulator;
    if (!obj(simulator)) issues.push({ code: "simulator-non-sku-missing" });
    else {
      if (simulator.standaloneSku !== false || simulator.independentCheckout !== false) issues.push({ code: "simulator-standalone-sale-enabled" });
      if (simulator.freeTrialDeliveredReplies !== 5 || simulator.providerFailureConsumesTrial !== false) issues.push({ code: "simulator-trial-drift" });
      if (simulator.postTrialAccess !== "product-specific-course-entitlement") issues.push({ code: "simulator-entitlement-drift" });
      if (simulator.unlimitedUsageClaimAllowed !== false) issues.push({ code: "unlimited-simulator-claim-enabled" });
    }
    const community = input.nonSkuDecisions.community;
    if (!obj(community)) issues.push({ code: "community-non-sku-missing" });
    else {
      if (community.standaloneSku !== false || community.publicMembershipSale !== false) issues.push({ code: "community-standalone-sale-enabled" });
      if (community.oneCommunityAcrossBookCourseGuidance !== true) issues.push({ code: "community-fragmentation-drift" });
      if (community.courseGrant !== "P6M" || community.guidanceGrant !== "active-guidance-plus-P3M") issues.push({ code: "community-duration-drift" });
      if (community.bookGrant !== "invite-only-expiring-pilot" || community.bookPurchaseAutomaticallyGrantsAccess !== false) issues.push({ code: "book-community-auto-grant-enabled" });
    }
  }

  if (!obj(input.launchGates)) issues.push({ code: "launch-gates-missing" });
  else for (const [field, value] of Object.entries(input.launchGates)) if (value !== false) issues.push({ code: "launch-gate-claimed", field });

  const forbiddenKey = findForbiddenKey(input);
  if (forbiddenKey) issues.push({ code: "operational-provider-field-present", field: forbiddenKey });
  if (hasSensitive(input)) issues.push({ code: "sensitive-value" });
  return issues;
}

export function assertOfferCatalogStagingProposal(input: unknown): void {
  const issues = validateOfferCatalogStagingProposal(input);
  if (issues.length) {
    throw new Error(`Offer catalog staging proposal failed:\n${issues.map((issue) => `${issue.code}:${issue.item ?? "root"}:${issue.field ?? ""}`).join("\n")}`);
  }
}
