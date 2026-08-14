import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import process from "node:process";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.BOOK_ACCESS_TEST_BASE_URL;

const protectedExamples = [
  ["/book/1", "הסיפור שאתה מספר לעצמך"],
  ["/book/1/four-a-day", "4 משפטים ביום"],
  ["/book/2/fear-map", "מפת הפחדים שלך"],
  ["/book/9/profile-photo", "מדריך תמונת פרופיל"],
  ["/book/11/chance-calculator", "רמזור הסיכויים"],
  ["/book/12/36-questions", "36 השאלות ליצירת קרבה"],
  ["/book/13/readiness-quiz", "שאלון מוכנות למחויבות"],
  ["/book/intro", "למה עוד ספר על זוגיות"],
  ["/book/closing/future-letter", "מכתב לעצמי בעתיד"],
  ["/book/not-a-real-route", "ChapterHub"],
  ["/book/not-a-real-chapter/not-a-real-tool", "ThirtySixQuestionsClient"],
];

async function getBuiltProtectedRoutes() {
  try {
    const manifest = JSON.parse(
      await readFile(new URL("../.next/prerender-manifest.json", import.meta.url), "utf8"),
    );
    return Object.keys(manifest.routes ?? {}).filter(
      (route) => route.startsWith("/book/") && route !== "/book/",
    );
  } catch {
    return [];
  }
}

async function listFiles(root) {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = `${root}/${entry.name}`;
    if (entry.isDirectory()) files.push(...(await listFiles(path)));
    else files.push(path);
  }
  return files;
}

const legacyAccess = await readFile(new URL("../src/lib/book-access.ts", import.meta.url), "utf8");
const proxySource = await readFile(new URL("../src/proxy.ts", import.meta.url), "utf8");
const gateSource = await readFile(
  new URL("../src/components/book/AccessGate.tsx", import.meta.url),
  "utf8",
);

assert.doesNotMatch(legacyAccess, /AHK-(?:2026-BOOK|BETA-TEST|ELAD-VIP)/);
assert.match(legacyAccess, /return false;/);
assert.match(proxySource, /matcher:\s*\["\/book\/:path\*"\]/);
assert.match(proxySource, /status:\s*503/);
assert.doesNotMatch(gateSource, /\{children\}/);

const bookAppRoot = fileURLToPath(new URL("../src/app/book", import.meta.url)).replaceAll("\\", "/");
const protectedPageFiles = (await listFiles(bookAppRoot)).filter(
  (path) => path.endsWith("/page.tsx") && path !== `${bookAppRoot}/page.tsx`,
);
assert.ok(protectedPageFiles.length > 0);
for (const path of protectedPageFiles) {
  const source = (await readFile(path, "utf8")).trim();
  assert.equal(
    source,
    'export { BookAccessUnavailable as default } from "@/components/book/BookAccessUnavailable";',
    `${path} must remain a fail-closed route stub`,
  );
}

const protectedPayloadSentinels = [
  "אם היית יכול/ה לבחור כל אחד בעולם",
  "אני יודע/ת מה באמת חשוב לי בזוגיות",
  "המוח שלנו מאמין למה שאנחנו חוזרים",
  "ספר/י את סיפור חייך בארבע דקות",
  "ארבע דקות שלמות",
  "עמוקה בין שני זרים",
];
const buildRoots = [
  new URL("../.next/static/chunks", import.meta.url),
  new URL("../.next/server/app/book", import.meta.url),
];
let checkedBuildArtifacts = 0;
for (const buildRoot of buildRoots) {
  try {
    const files = await listFiles(fileURLToPath(buildRoot).replaceAll("\\", "/"));
    for (const path of files.filter((file) => !file.endsWith(".map"))) {
      const artifact = await readFile(path, "utf8");
      checkedBuildArtifacts += 1;
      for (const sentinel of protectedPayloadSentinels) {
        assert.doesNotMatch(
          artifact,
          new RegExp(sentinel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
          `protected payload leaked into ${path}`,
        );
      }
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

if (!baseUrl) {
  console.log(
    `Static containment assertions passed (${checkedBuildArtifacts} build artifacts checked). Set BOOK_ACCESS_TEST_BASE_URL for raw HTTP checks.`,
  );
  process.exit(0);
}

const origin = baseUrl.replace(/\/$/, "");
const marketingResponse = await fetch(`${origin}/book`, { redirect: "manual" });
const marketingHtml = await marketingResponse.text();
assert.equal(marketingResponse.status, 200, "/book must remain public");
assert.doesNotMatch(marketingHtml, /אימות הגישה לתוכן הדיגיטלי אינו זמין כרגע/);

const builtRoutes = await getBuiltProtectedRoutes();
const protectedRoutes = [
  ...new Map(
    [
      ...protectedExamples,
      ...builtRoutes.map((path) => [path, "self.__next_f"]),
    ].map((entry) => [entry[0], entry]),
  ).values(),
];

for (const [path, protectedSentinel] of protectedRoutes) {
  for (const headers of [
    {},
    { RSC: "1", "Next-Router-Prefetch": "1", Accept: "text/x-component" },
    { Cookie: "omanut-book-access=%7B%22unlocked%22%3Atrue%7D" },
  ]) {
    const suffix = headers.RSC ? "?_rsc=negative-control" : "";
    const response = await fetch(`${origin}${path}${suffix}`, { headers, redirect: "manual" });
    const rawBody = await response.text();

    assert.equal(response.status, 503, `${path} must fail closed`);
    assert.equal(response.headers.get("cache-control"), "private, no-store, max-age=0");
    assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/);
    assert.match(rawBody, /אימות הגישה לתוכן הדיגיטלי אינו זמין כרגע/);
    assert.doesNotMatch(rawBody, new RegExp(protectedSentinel));
    assert.doesNotMatch(rawBody, /self.__next_f|_rsc=|react-server-dom/);
  }
}

console.log(
  `Raw HTTP containment checks passed for ${protectedRoutes.length} protected routes (${builtRoutes.length} from the production manifest).`,
);
