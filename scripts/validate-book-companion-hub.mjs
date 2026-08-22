import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagePath = path.join(repoRoot, "src", "app", "book-companion", "page.tsx");
const manifestPath = path.join(repoRoot, "data", "book-companion-links.json");
const draftRoot = path.join(repoRoot, "content", "book-companion", "media");

const FORBIDDEN_SOURCE_TERMS = [
  "destinationPath",
  "shortPath",
  "fallbackPath",
  "printApproval",
  "sourceHash",
  "content/book-companion/media",
  "draft-not-approved",
  "checkout",
  "mailto:",
  "<form",
  "<input",
];
const ALLOWED_HREFS = new Set(["/book", "/resources"]);

function longDraftPassages(text) {
  return text
    .replace(/<!--[^]*?-->/gu, "")
    .split(/\n\s*\n/gu)
    .map((value) => value.replace(/^#+\s*/u, "").trim())
    .filter((value) => value.length >= 100);
}

export function validateBookCompanionHub({ pageSource, manifest, draftTexts }) {
  const issues = [];
  if (!Array.isArray(manifest?.links) || manifest.links.length !== 8) issues.push("manifest-must-have-eight-links");
  for (const link of manifest?.links ?? []) {
    if (link.lifecycle !== "planned") issues.push(`non-planned-lifecycle:${link.id}`);
    if (link.shortPath !== null || link.destinationPath !== null || link.fallbackPath !== null) {
      issues.push(`destination-present:${link.id}`);
    }
    if (link.printApproval !== "blocked") issues.push(`print-not-blocked:${link.id}`);
    if (link.health !== "not-tested") issues.push(`health-overstated:${link.id}`);
  }

  if (!pageSource.includes('from "../../../data/book-companion-links.json"')) issues.push("canonical-manifest-not-imported");
  if (!pageSource.includes("companionManifest.links.map")) issues.push("manifest-links-not-rendered");
  if (!pageSource.includes('new Set(["BC-01", "BC-08"])')) issues.push("production-drafts-not-bounded");
  for (const term of FORBIDDEN_SOURCE_TERMS) {
    if (pageSource.toLowerCase().includes(term.toLowerCase())) issues.push(`forbidden-source-term:${term}`);
  }
  if (/<(?:form|input|textarea|select)\b/iu.test(pageSource)) issues.push("collection-control-present");
  if (/\b(?:price|payment|purchase|email)\b/iu.test(pageSource)) issues.push("commerce-or-email-present");
  if (/https?:\/\//iu.test(pageSource)) issues.push("external-url-present");

  const hrefs = [...pageSource.matchAll(/href="([^"]+)"/gu)].map((match) => match[1]);
  for (const href of hrefs) if (!ALLOWED_HREFS.has(href)) issues.push(`unapproved-href:${href}`);
  if (!hrefs.includes("/book") || !hrefs.includes("/resources")) issues.push("required-navigation-missing");

  for (const draftText of draftTexts) {
    for (const passage of longDraftPassages(draftText)) {
      if (pageSource.includes(passage)) issues.push("private-draft-passage-leaked");
    }
  }
  return issues;
}

export async function loadBookCompanionHubInputs() {
  const [pageSource, manifest, ...draftTexts] = await Promise.all([
    readFile(pagePath, "utf8"),
    readFile(manifestPath, "utf8").then(JSON.parse),
    ...["bc-01", "bc-08"].flatMap((id) =>
      ["script.md", "short-cut.md", "fallback.md"].map((name) => readFile(path.join(draftRoot, id, name), "utf8")),
    ),
  ]);
  return { pageSource, manifest, draftTexts };
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const inputs = await loadBookCompanionHubInputs();
  const issues = validateBookCompanionHub(inputs);
  if (issues.length) throw new Error(`Book Companion hub failed:\n${issues.join("\n")}`);
  console.log("Book Companion hub: PASS (8 planned gates, 2 production drafts, 2 real navigation links)");
}
