#!/usr/bin/env node

/**
 * Dependency-free structural smoke test for the public Hebrew routes.
 *
 * This complements browser/axe checks: it catches regressions in the server
 * response before JavaScript runs, without adding another test dependency.
 */

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/programs",
  "/programs/the-way",
  "/programs/the-way-plus",
  "/coaching",
  "/coaching/book",
  "/coaching/vip",
  "/club",
  "/book",
  "/sipurim",
  "/podcast",
  "/blog",
  "/resources",
  "/contact",
  "/community",
  "/events",
  "/events/love-event",
  "/lead",
  "/lead/23-reasons",
  "/lead/7-principles",
  "/lead/36-questions",
  "/lead/courage",
  "/lead/vision",
  "/lead/dating-talks",
  "/products",
  "/products/dating-card",
  "/privacy",
  "/terms",
  "/accessibility",
  "/thanks",
  "/welcome",
];

function hasAttribute(tag, name, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${name}\\s*=\\s*["']${escaped}["']`, "i").test(tag);
}

export function inspectHtml(html) {
  const findings = [];
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const mainTags = html.match(/<main\b[^>]*>/gi) ?? [];
  const mainContentTags = mainTags.filter((tag) =>
    hasAttribute(tag, "id", "main-content"),
  );

  if (!hasAttribute(htmlTag, "lang", "he")) findings.push("html-lang-he");
  if (!hasAttribute(htmlTag, "dir", "rtl")) findings.push("html-dir-rtl");
  if (mainContentTags.length !== 1) findings.push("single-main-content");
  if (!/<a\b[^>]*href\s*=\s*["']#main-content["'][^>]*>/i.test(html)) {
    findings.push("skip-link");
  }
  if (!/<h1\b[^>]*>/i.test(html)) findings.push("visible-page-heading-source");

  return findings;
}

function runSelfTest() {
  const valid = `
    <html lang="he" dir="rtl"><body>
      <a href="#main-content">דלגו לתוכן</a>
      <main id="main-content"><h1>כותרת</h1></main>
    </body></html>`;
  const broken = `<html lang="en"><body><main></main></body></html>`;

  const validFindings = inspectHtml(valid);
  const brokenFindings = inspectHtml(broken);
  const expectedBroken = [
    "html-lang-he",
    "html-dir-rtl",
    "single-main-content",
    "skip-link",
    "visible-page-heading-source",
  ];

  if (validFindings.length > 0) {
    throw new Error(`Valid fixture failed: ${validFindings.join(", ")}`);
  }
  for (const finding of expectedBroken) {
    if (!brokenFindings.includes(finding)) {
      throw new Error(`Negative control did not catch: ${finding}`);
    }
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        validFixtureFindings: validFindings,
        negativeControlFindings: brokenFindings,
      },
      null,
      2,
    ),
  );
}

async function checkRoute(baseUrl, route) {
  const url = new URL(route, baseUrl);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
      headers: { "user-agent": "omanut-public-a11y-smoke/1.0" },
    });
    const html = await response.text();
    const findings = inspectHtml(html);
    if (!response.ok) findings.unshift(`http-${response.status}`);
    return { route, status: response.status, findings };
  } catch (error) {
    return {
      route,
      status: null,
      findings: [`request-failed: ${error instanceof Error ? error.message : String(error)}`],
    };
  }
}

async function run() {
  if (process.argv.includes("--self-test")) {
    runSelfTest();
    return;
  }

  const argumentBase = process.argv.find((value) => /^https?:\/\//i.test(value));
  const baseUrl = argumentBase ?? process.env.PUBLIC_A11Y_BASE_URL ?? "http://127.0.0.1:3333";
  const results = [];

  for (const route of PUBLIC_ROUTES) {
    results.push(await checkRoute(baseUrl, route));
  }

  const failed = results.filter((result) => result.findings.length > 0);
  console.log(
    JSON.stringify(
      {
        baseUrl,
        checked: results.length,
        passed: results.length - failed.length,
        failed: failed.length,
        failures: failed,
      },
      null,
      2,
    ),
  );

  if (failed.length > 0) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
