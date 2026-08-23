import assert from "node:assert/strict";
import { loadMediaPackage, validateAllMediaPackages, validateMediaPackage } from "./validate-media-packages.mjs";

assert.deepEqual(await validateAllMediaPackages(), []);
const source = await loadMediaPackage("BC-01");
const bc03 = await loadMediaPackage("BC-03");
const controls = [
  ["wrong id", "unexpected-id", "BC-99", (x) => x],
  ["public URL", "package-url-forbidden", "BC-01", (x) => { x["fallback.md"] += "\nhttps://example.invalid"; }],
  ["invented media", "media-or-url-invented", "BC-01", (x) => { const m = JSON.parse(x["metadata.json"]); m.mediaFile = "welcome.mp4"; x["metadata.json"] = JSON.stringify(m); }],
  ["premature approval", "owner-approval-must-be-false", "BC-01", (x) => { const m = JSON.parse(x["metadata.json"]); m.ownerApproval = true; x["metadata.json"] = JSON.stringify(m); }],
  ["source hash invented", "source-hash-not-placeholder", "BC-01", (x) => { const m = JSON.parse(x["metadata.json"]); m.sourceHash = "abc123"; x["metadata.json"] = JSON.stringify(m); }],
  ["em dash", "em-dash-forbidden", "BC-01", (x) => { x["fallback.md"] += "\nזה כאן — וזה שם"; }],
  ["AI tell", "ai-tell", "BC-01", (x) => { x["fallback.md"] += "\nראוי לציין שזה עובד"; }],
  ["hype claim", "hype-or-claim", "BC-01", (x) => { x["fallback.md"] += "\nהדרך היחידה לזוגיות"; }],
  ["checked approval", "approval-checkbox-already-checked", "BC-01", (x) => { x["approval-checklist.md"] = x["approval-checklist.md"].replace("- [ ]", "- [x]"); }],
  ["transcript drift", "transcript-mismatch", "BC-01", (x) => { x["transcript.txt"] += "\nמשפט שלא נאמר"; }],
];

for (const [name, expected, id, mutate] of controls) {
  const fixture = structuredClone(source);
  mutate(fixture);
  const issues = validateMediaPackage(id, fixture);
  assert.ok(issues.some((issue) => issue.includes(expected)), `${name} must produce ${expected}`);
}

const syntheticPresenter = structuredClone(bc03);
{
  const metadata = JSON.parse(syntheticPresenter["metadata.json"]);
  metadata.presenterSource = "synthetic-avatar";
  syntheticPresenter["metadata.json"] = JSON.stringify(metadata);
}
assert.ok(
  validateMediaPackage("BC-03", syntheticPresenter).some((issue) => issue.includes("presenter-must-be-owner-recording")),
  "synthetic presenter must be rejected",
);

const realPersonDemo = structuredClone(bc03);
{
  const metadata = JSON.parse(realPersonDemo["metadata.json"]);
  metadata.fictionalDemonstration = false;
  realPersonDemo["metadata.json"] = JSON.stringify(metadata);
}
assert.ok(
  validateMediaPackage("BC-03", realPersonDemo).some((issue) => issue.includes("demonstration-must-be-fictional")),
  "non-fictional demonstration must be rejected",
);

const additionalPerson = structuredClone(bc03);
{
  const metadata = JSON.parse(additionalPerson["metadata.json"]);
  metadata.additionalPeople = true;
  additionalPerson["metadata.json"] = JSON.stringify(metadata);
}
assert.ok(
  validateMediaPackage("BC-03", additionalPerson).some((issue) => issue.includes("additional-people-must-be-false")),
  "additional people must be rejected",
);

console.log(`Book Companion media negative controls: PASS (${controls.length + 3}/${controls.length + 3})`);
