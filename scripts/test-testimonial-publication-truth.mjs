import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.env.TESTIMONIAL_TRUTH_TEST_BASE_URL?.replace(/\/$/, "");

const fromRoot = (...parts) => path.join(repoRoot, ...parts);
const read = (...parts) => readFile(fromRoot(...parts), "utf8");

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(root) {
  if (!(await exists(root))) return [];
  const entries = await readdir(root, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const absolute = path.join(root, entry.name);
      return entry.isDirectory() ? walkFiles(absolute) : [absolute];
    }),
  );
  return nested.flat();
}

const [
  policySource,
  librarySource,
  homeSource,
  coachingSource,
  storiesIndexSource,
  storyDetailSource,
  sitemapSource,
  archiveSource,
  publicPayloadSource,
  vercelIgnoreSource,
] = await Promise.all([
  read("src", "lib", "testimonial-publication-policy.ts"),
  read("src", "lib", "testimonials.ts"),
  read("src", "components", "HomeTestimonials.tsx"),
  read("src", "app", "coaching", "page.tsx"),
  read("src", "app", "sipurim", "page.tsx"),
  read("src", "app", "sipurim", "[slug]", "page.tsx"),
  read("src", "app", "sitemap.ts"),
  read("data", "testimonial-proof-archive", "src", "data", "testimonials.json"),
  read("src", "generated", "public-testimonials.json"),
  read(".vercelignore"),
]);

const archive = JSON.parse(archiveSource);
const publicPayload = JSON.parse(publicPayloadSource);
assert.deepEqual(
  Object.keys(publicPayload).sort(),
  ["$schema", "items", "quotes", "videos", "whatsapp_screenshots"],
  "generated public testimonial DTO has unexpected top-level fields",
);
assert.equal(publicPayload.$schema, "public-testimonial-dto-v1");
for (const key of ["items", "quotes", "whatsapp_screenshots", "videos"]) {
  assert.ok(Array.isArray(publicPayload[key]), `public DTO ${key} must be an array`);
}

function assertExactRecordKeys(record, allowed, required, label) {
  assert.equal(record && typeof record === "object" && !Array.isArray(record), true, `${label} must be an object`);
  const keys = Object.keys(record);
  assert.deepEqual(
    keys.filter((key) => !allowed.includes(key)),
    [],
    `${label} has unexpected fields`,
  );
  for (const key of required) assert.ok(keys.includes(key), `${label} is missing ${key}`);
}

for (const item of publicPayload.items) {
  assertExactRecordKeys(
    item,
    ["slug", "name", "title", "category", "image", "assetSha256", "aspect", "short_quote", "full_text", "context", "cta_target", "source", "featured"],
    ["slug", "name", "title", "category", "image", "assetSha256", "aspect", "short_quote", "context", "cta_target", "source", "featured"],
    "public testimonial item",
  );
}
for (const quote of publicPayload.quotes) {
  assertExactRecordKeys(
    quote,
    ["id", "author", "age", "occupation", "context", "quote", "source"],
    ["id", "author", "context", "quote", "source"],
    "public email quote",
  );
}
for (const shot of publicPayload.whatsapp_screenshots) {
  assertExactRecordKeys(
    shot,
    ["id", "image", "assetSha256"],
    ["id", "image", "assetSha256"],
    "public message screenshot",
  );
}
for (const video of publicPayload.videos) {
  assertExactRecordKeys(
    video,
    ["id", "title", "embed", "assetSha256"],
    ["id", "title", "embed", "assetSha256"],
    "public testimonial video",
  );
}
async function importTranspiledPolicy(source) {
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(output).toString("base64")}`);
}

async function importPolicyFixture(records) {
  const declaration =
    "export const VERIFIED_PROOF_PUBLICATION_LEDGER: readonly VerifiedProofPublicationRecord[] = [];";
  assert.ok(policySource.includes(declaration), "fixture loader could not find the empty ledger");
  return importTranspiledPolicy(
    policySource.replace(
      declaration,
      `export const VERIFIED_PROOF_PUBLICATION_LEDGER = ${JSON.stringify(records)};`,
    ),
  );
}

const policyModule = await importTranspiledPolicy(policySource);
const ledger = policyModule.VERIFIED_PROOF_PUBLICATION_LEDGER;

assert.ok(Array.isArray(ledger), "publication ledger must be an array");
assert.match(policySource, /VERIFIED_PROOF_PUBLICATION_LEDGER/);
assert.match(policySource, /toISOString\(\)\.slice\(0, 10\) !== value/);
assert.match(policySource, /timestamp <= now/);
assert.match(policySource, /record\.assetSha256 === assetSha256/);
assert.match(vercelIgnoreSource, /data\/testimonial-proof-archive\//);
assert.equal(
  await exists(fromRoot("src", "data", "testimonials.json")),
  false,
  "historical testimonial JSON must stay outside src/ and the deployment graph",
);
assert.match(librarySource, /@\/generated\/public-testimonials\.json/);
assert.doesNotMatch(librarySource, /@\/data\/testimonials\.json|testimonial-proof-archive/);
assert.match(librarySource, /getPublishedTestimonials/);
assert.match(librarySource, /getPublishedEmailQuotes/);
assert.match(librarySource, /getPublishedWhatsAppShots/);
assert.match(librarySource, /getPublishedVideos/);
assert.match(librarySource, /item\.assetSha256/);
assert.match(librarySource, /getPublishedTestimonials\("story-detail"\)/);
assert.doesNotMatch(librarySource, /export\s+const\s+(testimonials|emailQuotes|whatsappShots|videos)\b/);

function homepageProofSurfaceIsSafe(source) {
  const rendersApprovedProof = /getPublishedTestimonials\("homepage"\)/.test(source);
  const staysEmpty = /return\s+null/.test(source) && !/@\/lib\/testimonials/.test(source);
  const rendersInspectableAlternative =
    /data-proof-substitute="verification-path"/.test(source) &&
    /עדויות אינם מוצגים בלי אימות מקור והסכמה לפרסום/.test(source) &&
    !/@\/lib\/testimonials|testimonial-proof-archive|\b(?:quote|author|short_quote|full_text)\s*:/.test(source);
  return rendersApprovedProof || staysEmpty || rendersInspectableAlternative;
}

assert.equal(
  homepageProofSurfaceIsSafe(homeSource),
  true,
  "homepage must use approved proof, stay empty, or render a non-testimonial verification path",
);
assert.equal(
  homepageProofSurfaceIsSafe(`${homeSource}\nconst fakeProof = { quote: "unapproved" };`),
  false,
  "negative control: hard-coded proof must invalidate the non-testimonial substitute",
);
assert.match(coachingSource, /getPublishedTestimonials\("coaching"\)/);
assert.match(coachingSource, /getPublishedVideos\("coaching"\)/);
assert.match(storiesIndexSource, /getPublishedTestimonials\("stories-index"\)/);
assert.match(storyDetailSource, /getPublishedTestimonials\("story-detail"\)/);
assert.match(storyDetailSource, /getTestimonial\(slug\)/);
assert.match(sitemapSource, /getAllSlugs/);

for (const source of [homeSource, coachingSource, storiesIndexSource, storyDetailSource]) {
  assert.doesNotMatch(source, /from\s+["']@\/data\/testimonials\.json["']/);
  assert.doesNotMatch(source, /\btestimonials\s+as\s+/);
}

// A testimonial does not imply a five-star rating. A rating needs its own
// verified source and consent scope rather than being synthesized in JSON-LD.
assert.doesNotMatch(storyDetailSource, /reviewRating|ratingValue|AggregateRating/);

const archiveIds = new Map([
  ["testimonial", new Set(archive.items.map((item) => item.slug))],
  ["email-quote", new Set(archive.quotes.map((item) => item.id))],
  ["whatsapp-screenshot", new Set(archive.whatsapp_screenshots.map((item) => item.id))],
  ["video", new Set(archive.videos.map((item) => item.id))],
]);
const publicPayloadRecords = [
  ...publicPayload.items.map((item) => ({ kind: "testimonial", id: item.slug, value: item })),
  ...publicPayload.quotes.map((item) => ({ kind: "email-quote", id: item.id, value: item })),
  ...publicPayload.whatsapp_screenshots.map((item) => ({ kind: "whatsapp-screenshot", id: item.id, value: item })),
  ...publicPayload.videos.map((item) => ({ kind: "video", id: item.id, value: item })),
];
for (const record of publicPayloadRecords) {
  const contentSha256 = createHash("sha256")
    .update(JSON.stringify(record.value), "utf8")
    .digest("hex");
  const assetSha256 = record.value.assetSha256;
  if (record.kind !== "email-quote") {
    assert.match(
      assetSha256 ?? "",
      /^[a-f0-9]{64}$/,
      `public media DTO is missing a valid asset hash: ${record.kind}:${record.id}`,
    );
    if (typeof record.value.image === "string") {
      assert.match(record.value.image, /^\/(?!.*\.\.)[^?#]+$/);
      const publicAssetPath = fromRoot("public", ...record.value.image.slice(1).split("/"));
      assert.equal(
        await exists(publicAssetPath),
        true,
        `approved public media file is missing: ${record.kind}:${record.id}`,
      );
      const actualAssetSha256 = createHash("sha256")
        .update(await readFile(publicAssetPath))
        .digest("hex");
      assert.equal(
        actualAssetSha256,
        assetSha256,
        `public media bytes do not match the approved asset hash: ${record.kind}:${record.id}`,
      );
    }
  }
  const matchingLedgerRecord = ledger.find(
    (entry) =>
      entry.kind === record.kind &&
      entry.subjectId === record.id &&
      entry.contentSha256 === contentSha256 &&
      entry.surfaces.some((surface) =>
        policyModule.isApprovedForPublication(
          record.kind,
          record.id,
          surface,
          contentSha256,
          assetSha256,
        ),
      ),
  );
  assert.ok(
    matchingLedgerRecord,
    `public DTO record lacks a complete matching ledger entry: ${record.kind}:${record.id}`,
  );
}
if (ledger.length === 0) {
  assert.deepEqual(
    publicPayloadRecords,
    [],
    "generated public testimonial DTO must remain empty while the ledger is empty",
  );
}
const ledgerKeys = new Set();
for (const record of ledger) {
  assert.ok(archiveIds.has(record.kind), `unknown proof kind in ledger: ${record.kind}`);
  assert.ok(
    archiveIds.get(record.kind).has(record.subjectId),
    `ledger subject is missing from archive: ${record.kind}:${record.subjectId}`,
  );
  const key = `${record.kind}:${record.subjectId}`;
  assert.ok(!ledgerKeys.has(key), `duplicate ledger subject: ${key}`);
  ledgerKeys.add(key);
  assert.ok(
    policyModule.isApprovedForPublication(
      record.kind,
      record.subjectId,
      record.surfaces[0],
      record.contentSha256,
      record.assetSha256,
    ),
    `ledger record is incomplete or expired: ${key}`,
  );
}

const publicRoot = fromRoot("public");
const publicFiles = await walkFiles(publicRoot);
const publicRelative = publicFiles.map((file) => path.relative(publicRoot, file).replaceAll("\\", "/"));
const quarantinedPublicRoot = fromRoot("data", "testimonial-proof-archive", "public");
const quarantinedPublicRoutes = (await walkFiles(quarantinedPublicRoot)).map((file) =>
  path.relative(quarantinedPublicRoot, file).replaceAll("\\", "/"),
);
const archivePublicPaths = [
  ...archive.items.map((item) => item.image),
  ...archive.whatsapp_screenshots.map((item) => item.image),
]
  .filter((value) => typeof value === "string" && value.startsWith("/"))
  .map((value) => value.slice(1));

const knownSensitivePublicFiles = new Set([
  ...archivePublicPaths.filter((relative) => publicRelative.includes(relative)),
  ...publicRelative.filter((relative) =>
    /^(testimonials\/|assets\/testimonials\/|assets\/media\/youtube-testimonial-)/i.test(relative),
  ),
]);

// The current ledger is intentionally empty. In that state no testimonial
// media may remain under public/, because direct static URLs bypass React and
// every surface-level publication check.
if (ledger.length === 0) {
  assert.deepEqual(
    [...knownSensitivePublicFiles].sort(),
    [],
    "unapproved testimonial media remains directly addressable under public/",
  );
}

const dataConsumers = await walkFiles(fromRoot("src"));
const applicationSources = (
  await Promise.all(
    dataConsumers
      .filter((file) => /\.(?:ts|tsx|js|jsx)$/.test(file))
      .filter((file) => !file.endsWith(path.join("src", "lib", "testimonials.ts")))
      .map(async (file) => ({ file, source: await readFile(file, "utf8") })),
  )
);

for (const { file, source } of applicationSources) {
  assert.doesNotMatch(
    source,
    /@\/data\/testimonials\.json/,
    `raw testimonial archive imported outside the gated library: ${path.relative(repoRoot, file)}`,
  );
  if (ledger.length === 0) {
    assert.doesNotMatch(
      source,
      /youtube-nocookie\.com\/embed\/(?:Kbd7BRJ25TM|chvsmJzcihE)/,
      `unapproved testimonial video is hard-coded in ${path.relative(repoRoot, file)}`,
    );
  }
  assert.doesNotMatch(
    source,
    /["']@type["']\s*:\s*["'](?:Review|AggregateRating)["']|reviewRating|ratingValue/,
    `unverified review schema found in ${path.relative(repoRoot, file)}`,
  );
}

function collectSensitiveTokens() {
  const tokens = [];
  for (const item of archive.items) {
    tokens.push(item.slug, item.name, item.short_quote, item.full_text, item.image);
  }
  for (const quote of archive.quotes) tokens.push(quote.id, quote.author, quote.quote);
  for (const shot of archive.whatsapp_screenshots) tokens.push(shot.id, shot.image);
  for (const video of archive.videos) {
    tokens.push(video.id, video.embed, video.embed?.split("/").pop());
  }
  for (const relative of quarantinedPublicRoutes) {
    tokens.push(relative, path.basename(relative));
  }
  return [...new Set(tokens.filter((value) => typeof value === "string" && value.length >= 8))];
}

const sensitiveTokens = collectSensitiveTokens();
function assertNoSensitiveTokens(content, label, ignoredTokens = []) {
  const ignored = new Set(ignoredTokens);
  const match = sensitiveTokens.find((token) => !ignored.has(token) && content.includes(token));
  assert.equal(match, undefined, `${label} contains an unapproved archive token`);
}

const publicTextFiles = publicFiles.filter((file) =>
  /\.(?:md|txt|json|xml|html|svg|js|css|webmanifest)$/i.test(file),
);
for (const file of publicTextFiles) {
  assertNoSensitiveTokens(await readFile(file, "utf8"), path.relative(repoRoot, file));
}

let browserBuildFilesChecked = 0;
let serverBuildFilesChecked = 0;
const browserChunkRoot = fromRoot(".next", "static");
if (await exists(browserChunkRoot)) {
  const browserChunkFiles = (await walkFiles(browserChunkRoot)).filter((file) =>
    /\.(?:js|json|html|txt|rsc|map)$/.test(file),
  );
  browserBuildFilesChecked = browserChunkFiles.length;
  for (const file of browserChunkFiles) {
    assertNoSensitiveTokens(await readFile(file, "utf8"), path.relative(repoRoot, file));
  }
}

const serverBuildRoot = fromRoot(".next", "server");
if (await exists(serverBuildRoot)) {
  const serverBuildFiles = (await walkFiles(serverBuildRoot)).filter((file) =>
    /\.(?:js|json|html|rsc|txt|body|meta|map)$/.test(file),
  );
  serverBuildFilesChecked = serverBuildFiles.length;
  for (const file of serverBuildFiles) {
    const relative = path.relative(repoRoot, file).replaceAll("\\", "/");
    const requestEchoSlugs = archive.items
      .map((item) => item.slug)
      .filter((slug) => relative.includes(`/sipurim/${slug}.`));
    assertNoSensitiveTokens(await readFile(file, "utf8"), relative, requestEchoSlugs);
  }
}

async function get(route) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  return { response, body: await response.text() };
}

if (baseUrl) {
  for (const route of ["/", "/coaching", "/community", "/sipurim", "/sitemap.xml"]) {
    const { response, body } = await get(route);
    assert.equal(response.status, 200, `${route} must return HTTP 200`);
    assertNoSensitiveTokens(body, `HTTP ${route}`);
    assert.doesNotMatch(body, /["']@type["']\s*:\s*["']Review["']/);
  }

  const stories = await get("/sipurim");
  assert.match(stories.body, /ארבע עדשות קריאה/);
  assert.match(stories.body, /בדיקת התאמה/);

  const sitemap = await get("/sitemap.xml");
  assert.doesNotMatch(sitemap.body, /<loc>[^<]*\/sipurim\/[^<]+<\/loc>/);

  const legacyStoriesRoute = await get("/testimonials");
  assert.ok([307, 308].includes(legacyStoriesRoute.response.status));
  assert.match(legacyStoriesRoute.response.headers.get("location") ?? "", /\/sipurim$/);
  assertNoSensitiveTokens(legacyStoriesRoute.body, "HTTP /testimonials redirect");

  const coaching = await get("/coaching");
  assert.match(coaching.body, /בדיקת התאמה מעשית/);
  assert.match(coaching.body, /ארבע השאלות האלה/);

  for (const item of archive.items) {
    const { response, body } = await get(`/sipurim/${encodeURIComponent(item.slug)}`);
    const isApproved = policyModule.isApprovedForPublication(
      "testimonial",
      item.slug,
      "story-detail",
      createHash("sha256").update(JSON.stringify(item), "utf8").digest("hex"),
    );
    assert.equal(response.status, isApproved ? 200 : 404);
    if (!isApproved) {
      // Next's generic 404 payload may echo the caller-supplied request URL.
      // That is not evidence that the private archive supplied the slug.
      assertNoSensitiveTokens(body, "HTTP unapproved story detail", [item.slug]);
    }
  }

  for (const [index, relative] of quarantinedPublicRoutes.entries()) {
    const { response, body } = await get(
      `/${relative.split("/").map(encodeURIComponent).join("/")}`,
    );
    assert.ok(
      response.status >= 400,
      `quarantined proof asset route ${index + 1} returned a public success or redirect`,
    );
    assertNoSensitiveTokens(body, `HTTP quarantined proof asset route ${index + 1}`, [
      relative,
      path.basename(relative),
    ]);

    if (/\.(?:avif|gif|jpe?g|png|webp)$/i.test(relative)) {
      const optimized = await get(
        `/_next/image?url=${encodeURIComponent(`/${relative}`)}&w=640&q=75`,
      );
      assert.ok(
        optimized.response.status >= 400,
        `image optimizer exposed quarantined proof asset route ${index + 1}`,
      );
      assertNoSensitiveTokens(
        optimized.body,
        `HTTP image optimizer proof route ${index + 1}`,
        [relative, path.basename(relative)],
      );
    }
  }
}

// Policy fixtures and negative controls prove that publication is bound to the
// exact content, media, surface and valid approval period.
const hashA = "a".repeat(64);
const hashB = "b".repeat(64);
const iso = (offsetDays) =>
  new Date(Date.now() + offsetDays * 86_400_000).toISOString().slice(0, 10);
const validMediaRecord = {
  kind: "testimonial",
  subjectId: "fixture-media",
  surfaces: ["homepage"],
  sourceVerifiedAt: iso(-1),
  consentVerifiedAt: iso(-1),
  wordingApprovedAt: iso(-1),
  consentScope: "fixture homepage publication",
  contentSha256: hashA,
  assetSha256: hashB,
  expiresAt: iso(30),
};
const validMediaPolicy = await importPolicyFixture([validMediaRecord]);
assert.equal(
  validMediaPolicy.isApprovedForPublication(
    "testimonial",
    "fixture-media",
    "homepage",
    hashA,
    hashB,
  ),
  true,
);
assert.equal(
  validMediaPolicy.isApprovedForPublication(
    "testimonial",
    "fixture-media",
    "homepage",
    hashA,
  ),
  false,
);
assert.equal(
  validMediaPolicy.isApprovedForPublication(
    "testimonial",
    "fixture-media",
    "homepage",
    hashA,
    "c".repeat(64),
  ),
  false,
);
assert.equal(
  validMediaPolicy.isApprovedForPublication(
    "testimonial",
    "fixture-media",
    "homepage",
    "d".repeat(64),
    hashB,
  ),
  false,
);
assert.equal(
  validMediaPolicy.isApprovedForPublication(
    "testimonial",
    "fixture-media",
    "coaching",
    hashA,
    hashB,
  ),
  false,
);

for (const invalidRecord of [
  { ...validMediaRecord, sourceVerifiedAt: "2026-02-30" },
  { ...validMediaRecord, consentVerifiedAt: iso(1) },
  { ...validMediaRecord, wordingApprovedAt: iso(1) },
  { ...validMediaRecord, expiresAt: iso(-2) },
  { ...validMediaRecord, assetSha256: undefined },
]) {
  const fixture = await importPolicyFixture([invalidRecord]);
  assert.equal(
    fixture.isApprovedForPublication(
      "testimonial",
      "fixture-media",
      "homepage",
      hashA,
      hashB,
    ),
    false,
  );
}

const validQuoteRecord = {
  kind: "email-quote",
  subjectId: "fixture-quote",
  surfaces: ["stories-index"],
  sourceVerifiedAt: iso(-1),
  consentVerifiedAt: iso(-1),
  wordingApprovedAt: iso(-1),
  consentScope: "fixture stories publication",
  contentSha256: hashA,
};
const validQuotePolicy = await importPolicyFixture([validQuoteRecord]);
assert.equal(
  validQuotePolicy.isApprovedForPublication(
    "email-quote",
    "fixture-quote",
    "stories-index",
    hashA,
  ),
  true,
);

assert.throws(() => assert.doesNotMatch("export const testimonials = []", /export\s+const\s+testimonials\b/));
assert.throws(() => assert.doesNotMatch("ratingValue: '5'", /ratingValue/));
assert.throws(() => assertNoSensitiveTokens(`${sensitiveTokens[0]} injected`, "negative-control"));

console.log(
  `PASS testimonial publication truth: ledger=${ledger.length}, public-sensitive-assets=${knownSensitivePublicFiles.size}, public-text-files=${publicTextFiles.length}, static-build-files=${browserBuildFilesChecked}, server-build-files=${serverBuildFilesChecked}, quarantined-asset-routes=${quarantinedPublicRoutes.length}, archive-items=${archive.items.length}, quotes=${archive.quotes.length}, whatsapp=${archive.whatsapp_screenshots.length}, videos=${archive.videos.length}${baseUrl ? ", http=checked" : ", http=skipped"}`,
);
