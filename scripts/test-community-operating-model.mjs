import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateCommunityOperatingModel } from "../src/lib/community-operating-model-validator.ts";

const source = JSON.parse(await readFile(new URL("../data/community-operating-model.json", import.meta.url), "utf8"));
const codes = (value) => validateCommunityOperatingModel(value).map((x) => x.code);
assert.deepEqual(codes(source), []);
const controls = [
  ["missing readers", "missing-audience", (x) => { x.serves = x.serves.filter((v) => v !== "book-readers"); }],
  ["public posting", "public-posting-not-contained", (x) => { x.spaceModel.publicPosting = true; }],
  ["private messages", "private-messages-enabled-at-mvp", (x) => { x.spaceModel.privateMessagesAtMvp = true; }],
  ["AI final sanction", "ai-overreach", (x) => { x.aiBoundary.mayIssueFinalSanction = true; }],
  ["no human safety role", "human-role-missing", (x) => { x.roles = x.roles.filter((r) => r.id !== "safety-responder"); }],
  ["unsafe retention", "unsafe-retention", (x) => { x.privacy.moderationEvidenceMaximumDays = 900; }],
  ["open launch", "launch-open-with-failed-gates", (x) => { x.launchState = "ready"; }],
  ["member content training", "member-content-training-enabled", (x) => { x.privacy.automatedTrainingOnMemberContent = true; }],
  ["guidance shared", "guidance-confidentiality-broken", (x) => { x.spaceModel.guidanceMaterialSharedByDefault = true; }],
];
for (const [name, expected, mutate] of controls) {
  const fixture = structuredClone(source);
  mutate(fixture);
  assert.ok(codes(fixture).includes(expected), `${name} must produce ${expected}`);
}
console.log(`Community operating model negative controls: PASS (${controls.length}/${controls.length})`);
