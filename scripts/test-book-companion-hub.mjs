import assert from "node:assert/strict";
import { loadBookCompanionHubInputs, validateBookCompanionHub } from "./validate-book-companion-hub.mjs";

const source = await loadBookCompanionHubInputs();
assert.deepEqual(validateBookCompanionHub(source), []);

const controls = [
  ["destination added", "destination-present", (x) => { x.manifest.links[0].destinationPath = "/invented"; }],
  ["print approved", "print-not-blocked", (x) => { x.manifest.links[0].printApproval = "approved"; }],
  ["lifecycle overstated", "non-planned-lifecycle", (x) => { x.manifest.links[0].lifecycle = "ready"; }],
  ["health overstated", "health-overstated", (x) => { x.manifest.links[0].health = "passing"; }],
  ["missing gate", "manifest-must-have-eight-links", (x) => { x.manifest.links.pop(); }],
  ["fake CTA", "unapproved-href", (x) => { x.pageSource += '<a href="/buy-now">רכישה</a>'; }],
  ["email collection", "collection-control-present", (x) => { x.pageSource += '<form><input name="email" /></form>'; }],
  ["checkout", "forbidden-source-term:checkout", (x) => { x.pageSource += "checkout"; }],
  ["media draft import", "forbidden-source-term:content/book-companion/media", (x) => { x.pageSource += "content/book-companion/media/bc-01/script.md"; }],
  ["destination field read", "forbidden-source-term:destinationPath", (x) => { x.pageSource += "link.destinationPath"; }],
  ["private passage", "private-draft-passage-leaked", (x) => {
    const passage = x.draftTexts[0]
      .replace(/<!--[^]*?-->/gu, "")
      .split(/\n\s*\n/gu)
      .map((value) => value.replace(/^#+\s*/u, "").trim())
      .find((value) => value.length >= 100);
    x.pageSource += passage;
  }],
];

for (const [name, expected, mutate] of controls) {
  const fixture = structuredClone(source);
  mutate(fixture);
  const issues = validateBookCompanionHub(fixture);
  assert.ok(issues.some((issue) => issue.includes(expected)), `${name} must produce ${expected}`);
}

console.log(`Book Companion hub negative controls: PASS (${controls.length}/${controls.length})`);

