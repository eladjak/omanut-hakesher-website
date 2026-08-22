import { readFile } from "node:fs/promises";
import { validateBookCompanionContract } from "../src/lib/book-companion-contract-validator.ts";

const contract = JSON.parse(await readFile(new URL("../data/book-companion-links.json", import.meta.url), "utf8"));
const registry = JSON.parse(await readFile(new URL("../data/companion-products.json", import.meta.url), "utf8"));
const issues = validateBookCompanionContract(contract);
if (issues.length) throw new Error(issues.map((issue) => `${issue.code}:${issue.item ?? "root"}:${issue.field ?? ""}`).join("\n"));

const approved = contract.links.filter((link) => link.printApproval === "approved").length;
if (approved !== 0) throw new Error("No QR may be print-approved before real routes and health evidence exist");
const qrProduct = registry.find((item) => item.id === "CP-08");
if (qrProduct?.status !== "planned" || qrProduct?.owner !== "website" || qrProduct?.surface !== "website") {
  throw new Error("CP-08 must describe the planned website-owned QR layer");
}
const hub = registry.find((item) => item.id === "CP-07");
if (hub?.access !== "protected" || hub?.entitlement !== "book-purchase") {
  throw new Error("CP-07 protected reader destinations must remain behind book entitlement");
}
console.log(`Book companion contract: PASS (${contract.links.length} planned links, ${approved} print-approved)`);
