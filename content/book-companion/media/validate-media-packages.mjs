import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const IDS = ["BC-01", "BC-03", "BC-08"];
const REQUIRED_FILES = [
  "brief.md",
  "script.md",
  "short-cut.md",
  "transcript.txt",
  "shot-list.md",
  "fallback.md",
  "metadata.json",
  "approval-checklist.md",
];
const AI_TELLS = [
  "מן הסתם", "ראוי לציין", "כפי שצוין", "במקרה הזה", "מצד שני",
  "באופן כללי", "חשוב לזכור", "כמו כן", "בנוסף לכך", "אם כן",
];
const HYPE_OR_CLAIMS = [
  /מהפכני/u,
  /משנה חיים/u,
  /הדרך היחידה/u,
  /תמצאו זוגיות/u,
  /יביא לכם/u,
  /מבטיח לכם/u,
  /מוכח ש/u,
];
const URL = /(?:https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|co\.il|org|net)(?:\/|\b))/iu;

function normalize(value) {
  return value.replace(/\r\n/g, "\n").trim();
}

function spoken(markdown) {
  const match = markdown.match(/<!-- SPOKEN_START -->\s*([\s\S]*?)\s*<!-- SPOKEN_END -->/u);
  return match?.[1] ?? null;
}

function words(value) {
  return value.match(/[\p{L}\p{N}]+(?:['׳״][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function addTextChecks(issues, id, label, value) {
  if (value.includes("—")) issues.push(`${id}:${label}:em-dash-forbidden`);
  if (URL.test(value)) issues.push(`${id}:${label}:url-forbidden`);
  for (const phrase of AI_TELLS) if (value.includes(phrase)) issues.push(`${id}:${label}:ai-tell:${phrase}`);
  for (const pattern of HYPE_OR_CLAIMS) if (pattern.test(value)) issues.push(`${id}:${label}:hype-or-claim:${pattern.source}`);
}

export function validateMediaPackage(id, files) {
  const issues = [];
  if (!IDS.includes(id)) issues.push(`${id}:unexpected-id`);
  for (const file of REQUIRED_FILES) if (typeof files[file] !== "string") issues.push(`${id}:missing-file:${file}`);
  if (issues.length) return issues;

  let metadata;
  try { metadata = JSON.parse(files["metadata.json"]); }
  catch { return [...issues, `${id}:invalid-metadata-json`]; }

  if (metadata.id !== id) issues.push(`${id}:metadata-id-mismatch`);
  if (metadata.register !== "PUBLIC") issues.push(`${id}:register-must-be-public`);
  if (metadata.status !== "draft-not-approved") issues.push(`${id}:status-must-remain-draft`);
  if (metadata.ownerApproval !== false) issues.push(`${id}:owner-approval-must-be-false`);
  if (metadata.mediaFile !== null || metadata.publicUrl !== null) issues.push(`${id}:media-or-url-invented`);
  if (metadata.sourceHash !== "PLACEHOLDER_OWNER_APPROVAL_REQUIRED") issues.push(`${id}:source-hash-not-placeholder`);
  if (!Array.isArray(metadata.sourceReferences) || metadata.sourceReferences.length !== 2) issues.push(`${id}:source-references-invalid`);
  if (id === "BC-03") {
    if (metadata.presenterSource !== "owner-recording") issues.push(`${id}:presenter-must-be-owner-recording`);
    if (metadata.fictionalDemonstration !== true) issues.push(`${id}:demonstration-must-be-fictional`);
    if (metadata.additionalPeople !== false) issues.push(`${id}:additional-people-must-be-false`);
  }

  const full = spoken(files["script.md"]);
  const short = spoken(files["short-cut.md"]);
  if (full === null) issues.push(`${id}:full-spoken-markers-missing`);
  if (short === null) issues.push(`${id}:short-spoken-markers-missing`);
  if (full !== null) {
    const count = words(full);
    if (count < 160 || count > 320) issues.push(`${id}:full-script-word-count:${count}`);
    if (normalize(full) !== normalize(files["transcript.txt"])) issues.push(`${id}:transcript-mismatch`);
    addTextChecks(issues, id, "full-script", full);
  }
  if (short !== null) {
    const count = words(short);
    if (count < 55 || count > 120) issues.push(`${id}:short-script-word-count:${count}`);
    addTextChecks(issues, id, "short-cut", short);
  }
  addTextChecks(issues, id, "fallback", files["fallback.md"]);

  for (const heading of ["## Register", "## הרגע בספר", "## המטרה", "## מה לא מבטיחים", "## אורך וקצב"]) {
    if (!files["brief.md"].includes(heading)) issues.push(`${id}:brief-section-missing:${heading}`);
  }
  for (const heading of ["## הכנה", "## הצילום", "## קצב וביצוע"]) {
    if (!files["shot-list.md"].includes(heading)) issues.push(`${id}:shot-section-missing:${heading}`);
  }
  if (/\[[xX]\]/u.test(files["approval-checklist.md"])) issues.push(`${id}:approval-checkbox-already-checked`);
  if (!files["approval-checklist.md"].includes("Final status: draft-not-approved")) issues.push(`${id}:approval-status-missing`);

  const all = Object.values(files).join("\n");
  if (URL.test(all)) issues.push(`${id}:package-url-forbidden`);
  return issues;
}

export async function loadMediaPackage(id) {
  const folder = path.join(ROOT, id.toLowerCase());
  const pairs = await Promise.all(REQUIRED_FILES.map(async (name) => [name, await readFile(path.join(folder, name), "utf8")]));
  return Object.fromEntries(pairs);
}

export async function validateAllMediaPackages() {
  const issues = [];
  for (const id of IDS) issues.push(...validateMediaPackage(id, await loadMediaPackage(id)));
  return issues;
}

const isMain = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  const issues = await validateAllMediaPackages();
  if (issues.length) throw new Error(`Book Companion media packages failed:\n${issues.join("\n")}`);
  console.log(`Book Companion media packages: PASS (${IDS.length}/${IDS.length}, draft-only, no URLs or media)`);
}
