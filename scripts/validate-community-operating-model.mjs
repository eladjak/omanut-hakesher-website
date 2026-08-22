import { readFile } from "node:fs/promises";
import { validateCommunityOperatingModel } from "../src/lib/community-operating-model-validator.ts";

const model = JSON.parse(await readFile(new URL("../data/community-operating-model.json", import.meta.url), "utf8"));
const registry = JSON.parse(await readFile(new URL("../data/companion-products.json", import.meta.url), "utf8"));
const issues = validateCommunityOperatingModel(model);
if (issues.length) throw new Error(issues.map((x) => `${x.code}:${x.item ?? "root"}:${x.field ?? ""}`).join("\n"));
const open = Object.values(model.launchGates).filter((value) => value !== true).length;
const community = registry.find((item) => item.id === "CP-21");
if (
  community?.status !== "contained" ||
  community?.owner !== "community-ops" ||
  community?.coreProduct !== "ecosystem" ||
  community?.entitlement !== "community-access"
) {
  throw new Error("CP-21 must remain a contained ecosystem community owned by community operations");
}
console.log(`Community operating model: PASS (${model.serves.length} audiences, ${open} launch gates intentionally open)`);
