import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const baseUrl = process.env.LEAD_DELIVERY_TEST_BASE_URL?.replace(/\/$/, "");
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const sources = {
  registry: read("src/lib/lead-magnets.ts"),
  policy: read("src/lib/marketing-list-policy.ts"),
  route: read("src/app/api/lead/subscribe/route.ts"),
  leadForm: read("src/components/lead/LeadMagnetTemplate.tsx"),
  leadIndex: read("src/app/lead/page.tsx"),
  newsletter: read("src/components/NewsletterForm.tsx"),
  publicSignupSurfaces: [
    read("src/app/page.tsx"),
    read("src/app/blog/page.tsx"),
    read("src/app/welcome/page.tsx"),
    read("src/components/Footer.tsx"),
  ],
  envExample: read(".env.example"),
};

function loadPolicy(source) {
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const commonJsModule = { exports: {} };
  vm.runInNewContext(compiled, {
    module: commonJsModule,
    exports: commonJsModule.exports,
    process: { env: {} },
    Set,
    Number,
  });
  return commonJsModule.exports;
}

function verifySourceContracts(candidate) {
  assert.doesNotMatch(candidate.registry, /\blistId\s*:/);
  assert.doesNotMatch(candidate.registry, /22958/);
  assert.match(candidate.route, /getApprovedMarketingList\(\)/);
  assert.match(candidate.route, /marketing-list-not-approved/);
  assert.match(candidate.route, /marketing-provider-not-configured/);
  assert.match(candidate.route, /listId:\s*marketingList\.listId/);
  assert.match(candidate.route, /if \(isNewsletter\)[\s\S]*marketing-subscription-failed/);
  assert.match(candidate.route, /marketingSubscribed:\s*false/);
  assert.match(candidate.route, /marketingSubscribed:\s*true/);
  assert.match(candidate.policy, /APPROVED_MARKETING_LISTS/);
  assert.match(candidate.policy, /consentBasis:\s*string/);
  assert.match(candidate.policy, /approvedAt:\s*string/);
  assert.match(candidate.policy, /owner:\s*string/);
  assert.match(candidate.policy, /matches\.length !== 1/);
  assert.doesNotMatch(candidate.leadForm, /fetch\("\/api\/lead\/subscribe"|name="email"|marketingConsent/);
  assert.match(candidate.leadForm, /אין צורך להשאיר אימייל או להצטרף לרשימת דיוור/);
  assert.match(candidate.leadForm, /href=\{assetUrl\}/);
  assert.match(candidate.leadIndex, /שלושת המדריכים בעמוד הזה זמינים לקריאה ישירה/);
  for (const slug of ["courage", "vision", "dating-talks"]) {
    assert.match(candidate.leadIndex, new RegExp(`slug: "${slug}"`));
  }
  for (const surface of candidate.publicSignupSurfaces) {
    assert.doesNotMatch(surface, /NewsletterForm|\/api\/lead\/subscribe|type="email"/);
    assert.match(surface, /OpenResourcesLinks/);
  }
  assert.match(candidate.newsletter, /ולא שמרנו את הכתובת/);
  assert.match(candidate.envExample, /RAV_MESSER_APPROVED_LIST_ID=/);
  assert.match(candidate.envExample, /source allowlist is empty by default/);

  const alignedLabels = [
    "23 נקודות לבדיקה כשקשר לא מתקדם",
    "7 עקרונות לתרגול קשר",
    "36 שאלות לשיחה שמעמיקה היכרות",
    "8 דרכים לתרגל אומץ",
    "איך לכתוב חזון אישי לזוגיות",
    "10 עקרונות לשיחה טובה בדייט",
  ];
  for (const label of alignedLabels) {
    assert.match(candidate.registry, new RegExp(label));
  }

  const retiredLabels = [
    "עדיין רווק",
    "עקרונות הזהב",
    "יכולות ליצור אהבה",
    "שיחות דייט מנצחות",
  ];
  for (const label of retiredLabels) {
    assert.doesNotMatch(candidate.registry, new RegExp(label));
  }
}

verifySourceContracts(sources);

const { APPROVED_MARKETING_LISTS, resolveApprovedMarketingListId } = loadPolicy(sources.policy);
assert.deepEqual([...APPROVED_MARKETING_LISTS], []);
assert.deepEqual(
  { ...resolveApprovedMarketingListId(undefined) },
  { status: "missing", listId: null },
);
assert.deepEqual(
  { ...resolveApprovedMarketingListId("abc") },
  { status: "invalid", listId: null },
);
assert.deepEqual(
  { ...resolveApprovedMarketingListId("0") },
  { status: "invalid", listId: null },
);
assert.deepEqual(
  { ...resolveApprovedMarketingListId("22958") },
  { status: "missing", listId: null },
);
assert.deepEqual(
  { ...resolveApprovedMarketingListId(" 31415 ") },
  { status: "missing", listId: null },
);

const approvedFixture = {
  listId: 31415,
  consentBasis: "explicit-checkbox-v1",
  approvedAt: "2026-08-14T00:00:00.000Z",
  owner: "test-owner",
};
assert.deepEqual(
  { ...resolveApprovedMarketingListId(" 31415 ", [approvedFixture]) },
  { status: "approved", ...approvedFixture },
);
assert.deepEqual(
  {
    ...resolveApprovedMarketingListId("31415", [
      { ...approvedFixture, consentBasis: "" },
    ]),
  },
  { status: "invalid", listId: null },
);
assert.deepEqual(
  {
    ...resolveApprovedMarketingListId("31415", [
      approvedFixture,
      { ...approvedFixture, owner: "second-owner" },
    ]),
  },
  { status: "missing", listId: null },
);

const negativeControls = [
  { ...sources, registry: `${sources.registry}\nconst leak = { listId: 22958 };` },
  { ...sources, route: sources.route.replace("marketing-list-not-approved", "list-unavailable") },
  { ...sources, leadForm: sources.leadForm.replace("אין צורך להשאיר אימייל או להצטרף לרשימת דיוור", "") },
  { ...sources, leadIndex: sources.leadIndex.replace('slug: "courage"', 'slug: "missing"') },
  {
    ...sources,
    publicSignupSurfaces: [
      `${sources.publicSignupSurfaces[0]}\nimport { NewsletterForm } from "@/components/NewsletterForm";`,
      ...sources.publicSignupSurfaces.slice(1),
    ],
  },
  { ...sources, envExample: sources.envExample.replace("RAV_MESSER_APPROVED_LIST_ID=", "") },
  { ...sources, policy: sources.policy.replace("matches.length !== 1", "matches.length === 0") },
];

for (const [index, candidate] of negativeControls.entries()) {
  assert.throws(
    () => verifySourceContracts(candidate),
    undefined,
    `negative control ${index + 1} should fail`,
  );
}

if (baseUrl) {
  const response = await fetch(`${baseUrl}/api/lead/subscribe`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      slug: "newsletter",
      email: "allowlist-negative-control@example.test",
      consent: true,
    }),
  });
  const payload = await response.json();
  assert.equal(response.status, 503);
  assert.equal(payload.error, "marketing-list-not-approved");
  assert.equal(payload.reason, "missing");
  assert.doesNotMatch(JSON.stringify(payload), /22958|31415|99999/);

  const guideIndex = await fetch(`${baseUrl}/lead`);
  assert.equal(guideIndex.status, 200);
  const guideIndexBody = await guideIndex.text();
  assert.match(guideIndexBody, /שלושת המדריכים בעמוד הזה זמינים לקריאה ישירה/);
  assert.doesNotMatch(guideIndexBody, /type="email"|הרשמה לרשימת/);

  for (const [slug, fileName] of [
    ["courage", "courage.pdf"],
    ["vision", "vision.pdf"],
    ["dating-talks", "dating-talks.pdf"],
  ]) {
    const redirect = await fetch(`${baseUrl}/lead/${slug}/download`, { redirect: "manual" });
    assert.ok([307, 308].includes(redirect.status), `${slug} download must redirect`);
    assert.match(redirect.headers.get("location") ?? "", new RegExp(`/downloads/${fileName}$`));
    const pdf = await fetch(`${baseUrl}/downloads/${fileName}`);
    assert.equal(pdf.status, 200, `${fileName} must be publicly readable`);
    assert.match(pdf.headers.get("content-type") ?? "", /application\/pdf/);
    assert.ok((await pdf.arrayBuffer()).byteLength > 100_000, `${fileName} must not be an empty placeholder`);
  }
}

console.log(
  "Lead delivery truth: PASS (three guides open directly without data collection; public signup forms absent; marketing API remains fail-closed; 7 negative controls)",
);
