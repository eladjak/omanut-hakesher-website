import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateOfferCatalogStagingProposal } from "../src/lib/offer-catalog-staging-proposal-validator.ts";

const source = JSON.parse(await readFile(new URL("../data/offer-catalog-staging-proposal.json", import.meta.url), "utf8"));
const codes = (value) => validateOfferCatalogStagingProposal(value).map((issue) => issue.code);
assert.deepEqual(codes(source), []);

const controls = [
  ["three offers", "offer-count-not-four", (x) => { x.offers.pop(); }],
  ["fifth offer", "offer-count-not-four", (x) => { x.offers.push(structuredClone(x.offers[0])); x.offers.at(-1).sku = "OH-EXTRA-01"; }],
  ["range minimum drift", "price-hypothesis-range-invalid", (x) => { x.offers[0].consumerPriceHypothesisRangeIls.min = 1; }],
  ["range maximum drift", "price-hypothesis-range-invalid", (x) => { x.offers[1].consumerPriceHypothesisRangeIls.max = 1; }],
  ["range basis drift", "price-hypothesis-range-invalid", (x) => { x.offers[2].consumerPriceHypothesisRangeIls.basis = "market-proof"; }],
  ["range removed", "price-hypothesis-range-invalid", (x) => { delete x.offers[3].consumerPriceHypothesisRangeIls; }],
  ["selected price invented", "selected-price-invented", (x) => { x.offers[0].selectedPriceIls = 129; }],
  ["exact proposed price restored", "exact-proposed-price-present", (x) => { x.offers[0].proposedConsumerPriceIls = 129; }],
  ["root approval invented", "human-approval-invented", (x) => { x.humanApproval = { approvedBy: "owner" }; }],
  ["offer approval invented", "human-approval-invented", (x) => { x.offers[1].humanApproval = "approved"; }],
  ["checkout enabled", "activation-not-blocked", (x) => { x.activation.checkout = true; }],
  ["public price enabled", "activation-not-blocked", (x) => { x.activation.publicPricing = true; }],
  ["offer activation enabled", "offer-activation-not-blocked", (x) => { x.offers[2].activationState = "active"; }],
  ["provider field", "operational-provider-field-present", (x) => { x.offers[0].providerProductId = "live-123"; }],
  ["book companion removed", "book-companion-boundary-missing", (x) => { x.offers[0].contents = []; }],
  ["dating entitlement invented", "dating-service-entitlement-invented", (x) => { x.offers[1].entitlements = [{ id: "course-access" }]; }],
  ["course simulator removed", "course-entitlement-missing", (x) => { x.offers[2].entitlements = x.offers[2].entitlements.filter((e) => e.id !== "simulator-access"); }],
  ["community sold standalone", "community-standalone-sale-enabled", (x) => { x.nonSkuDecisions.community.standaloneSku = true; }],
  ["simulator sold standalone", "simulator-standalone-sale-enabled", (x) => { x.nonSkuDecisions.simulator.independentCheckout = true; }],
  ["trial consumes provider failure", "simulator-trial-drift", (x) => { x.nonSkuDecisions.simulator.providerFailureConsumesTrial = true; }],
  ["book auto grants community", "book-community-auto-grant-enabled", (x) => { x.nonSkuDecisions.community.bookPurchaseAutomaticallyGrantsAccess = true; }],
  ["refund promise", "unsafe-refund-boundary", (x) => { x.offers[3].refundBoundary.publicPromiseAllowed = true; }],
  ["launch gate claimed", "launch-gate-claimed", (x) => { x.launchGates.ownerApprovedCatalog = true; }],
  ["email leaked", "sensitive-value", (x) => { x.offers[0].publicName = "write to person@example.invalid"; }],
];

for (const [name, expected, mutate] of controls) {
  const fixture = structuredClone(source);
  mutate(fixture);
  assert.ok(codes(fixture).includes(expected), `${name} must produce ${expected}`);
}

console.log(`Offer catalog negative controls: PASS (${controls.length}/${controls.length})`);
