import { readFile } from "node:fs/promises";
import { validateOfferCatalogStagingProposal } from "../src/lib/offer-catalog-staging-proposal-validator.ts";

const proposal = JSON.parse(await readFile(new URL("../data/offer-catalog-staging-proposal.json", import.meta.url), "utf8"));
const issues = validateOfferCatalogStagingProposal(proposal);
if (issues.length) {
  throw new Error(issues.map((issue) => `${issue.code}:${issue.item ?? "root"}:${issue.field ?? ""}`).join("\n"));
}

const activeGates = Object.values(proposal.launchGates).filter((value) => value !== false).length;
const approvedOffers = proposal.offers.filter((offer) => offer.humanApproval !== null).length;
console.log(`Offer catalog staging proposal: PASS (${proposal.offers.length} offers, ${approvedOffers} human-approved, ${activeGates} launch gates claimed)`);
