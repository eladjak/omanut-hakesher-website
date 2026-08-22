import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateBookCompanionContract } from "../src/lib/book-companion-contract-validator.ts";

const source = JSON.parse(await readFile(new URL("../data/book-companion-links.json", import.meta.url), "utf8"));
const codes = (value) => validateBookCompanionContract(value).map((issue) => issue.code);
assert.deepEqual(codes(source), []);

const controls = [
  ["duplicate id", "duplicate-id", (x) => { x.links[1].id = x.links[0].id; }],
  ["external provider URL", "invalid-or-external-path", (x) => { x.links[0].destinationPath = "https://youtube.example/video"; }],
  ["print without path", "print-approved-without-path", (x) => { x.links[0].printApproval = "approved"; }],
  ["print before health", "print-approved-before-ready", (x) => { x.links[0].printApproval = "approved"; }],
  ["captions optional", "captions-not-required", (x) => { x.links[0].media.captions = "optional"; }],
  ["unsafe print policy", "unsafe-print-policy", (x) => { x.printPolicy.fallbackRequired = false; }],
  ["too many QR links", "qr-count-outside-maintainable-range", (x) => { x.links.push(structuredClone(x.links[0])); x.links.at(-1).id = "BC-09"; }],
  ["sensitive value", "sensitive-value", (x) => { x.links[0].purpose = "contact person@example.invalid for this companion"; }],
];

for (const [name, expected, mutate] of controls) {
  const fixture = structuredClone(source);
  mutate(fixture);
  assert.ok(codes(fixture).includes(expected), `${name} must produce ${expected}`);
}
console.log(`Book companion negative controls: PASS (${controls.length}/${controls.length})`);
