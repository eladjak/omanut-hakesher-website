export type BookCompanionIssue = { code: string; item?: string; field?: string };

type JsonRecord = Record<string, unknown>;

const ROOT_FIELDS = new Set(["schemaVersion", "productDecision", "canonicalSurface", "launchState", "printPolicy", "links"]);
const LINK_FIELDS = new Set([
  "id", "bookPlacement", "purpose", "experience", "access", "lifecycle", "shortPath",
  "destinationPath", "fallbackPath", "media", "health", "printApproval",
]);
const ACCESS = new Set(["public", "book-reader"]);
const LIFECYCLES = new Set(["planned", "in-production", "ready", "retired"]);
const HEALTH = new Set(["not-tested", "passing", "failing"]);
const PRINT = new Set(["blocked", "approved"]);
const EXPERIENCES = new Set(["video", "audio", "guide", "interactive-local-first", "journey-hub"]);
const INTERNAL_OR_PROVIDER_URL = /^(?:https?:\/\/|\/\/)|(?:youtube|youtu\.be|vimeo|cloudinary|spotify|soundcloud)/i;
const SENSITIVE = /(?:[a-z]:[\\/]users[\\/]|\b[^\s@]+@[^\s@]+\.[^\s@]+\b|(?:\+?972|0[2-9])-?\d{7,9})/i;

function record(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function localPath(value: unknown): value is string {
  return typeof value === "string" && /^\/(?!\/)[a-z0-9][a-z0-9\-/]*$/.test(value);
}

function optionalLocalPath(value: unknown): boolean {
  return value === null || localPath(value);
}

function containsSensitive(value: unknown): boolean {
  if (typeof value === "string") return SENSITIVE.test(value);
  if (Array.isArray(value)) return value.some(containsSensitive);
  return record(value) && Object.values(value).some(containsSensitive);
}

export function validateBookCompanionContract(input: unknown): BookCompanionIssue[] {
  if (!record(input)) return [{ code: "contract-not-object" }];
  const issues: BookCompanionIssue[] = [];
  for (const field of Object.keys(input)) if (!ROOT_FIELDS.has(field)) issues.push({ code: "unexpected-root-field", field });
  if (input.schemaVersion !== 1) issues.push({ code: "unsupported-schema-version" });
  if (input.productDecision !== "full-book-companion-with-qr") issues.push({ code: "decision-mismatch" });
  if (!record(input.printPolicy)) issues.push({ code: "invalid-print-policy" });
  else {
    const requiredTrue = ["humanReadableAddressRequired", "editableRedirectRequired", "fallbackRequired", "healthCheckRequired", "ownerApprovalRequired"];
    for (const field of requiredTrue) if (input.printPolicy[field] !== true) issues.push({ code: "unsafe-print-policy", field });
    if (typeof input.printPolicy.minimumQrSizeMm !== "number" || input.printPolicy.minimumQrSizeMm < 25) {
      issues.push({ code: "qr-too-small", field: "minimumQrSizeMm" });
    }
  }
  if (!Array.isArray(input.links)) return [...issues, { code: "links-not-array" }];
  if (input.links.length < 5 || input.links.length > 8) issues.push({ code: "qr-count-outside-maintainable-range" });
  const ids = new Set<string>();
  const paths = new Set<string>();
  input.links.forEach((raw, index) => {
    const fallback = `index:${index}`;
    if (!record(raw)) { issues.push({ code: "link-not-object", item: fallback }); return; }
    const id = typeof raw.id === "string" ? raw.id : fallback;
    for (const field of Object.keys(raw)) if (!LINK_FIELDS.has(field)) issues.push({ code: "unexpected-link-field", item: id, field });
    if (!/^BC-\d{2}$/.test(id)) issues.push({ code: "invalid-id", item: id });
    if (ids.has(id)) issues.push({ code: "duplicate-id", item: id });
    ids.add(id);
    if (typeof raw.purpose !== "string" || raw.purpose.trim().length < 8 || raw.purpose.length > 160) issues.push({ code: "invalid-purpose", item: id });
    if (typeof raw.bookPlacement !== "string" || !/^(?:opening|closing|chapter-(?:[1-9]|1[0-3]))$/.test(raw.bookPlacement)) issues.push({ code: "invalid-placement", item: id });
    if (!EXPERIENCES.has(String(raw.experience))) issues.push({ code: "invalid-experience", item: id });
    if (!ACCESS.has(String(raw.access))) issues.push({ code: "invalid-access", item: id });
    if (!LIFECYCLES.has(String(raw.lifecycle))) issues.push({ code: "invalid-lifecycle", item: id });
    if (!HEALTH.has(String(raw.health))) issues.push({ code: "invalid-health", item: id });
    if (!PRINT.has(String(raw.printApproval))) issues.push({ code: "invalid-print-approval", item: id });
    for (const field of ["shortPath", "destinationPath", "fallbackPath"] as const) {
      const value = raw[field];
      if (!optionalLocalPath(value) || (typeof value === "string" && INTERNAL_OR_PROVIDER_URL.test(value))) {
        issues.push({ code: "invalid-or-external-path", item: id, field });
      }
      if (typeof value === "string") {
        if (paths.has(value) && field === "shortPath") issues.push({ code: "duplicate-short-path", item: id, field: value });
        if (field === "shortPath") paths.add(value);
      }
    }
    if (raw.experience === "video" || raw.experience === "audio") {
      if (!record(raw.media)) issues.push({ code: "media-contract-missing", item: id });
      else {
        if (raw.media.transcript !== "required") issues.push({ code: "transcript-not-required", item: id });
        if (raw.experience === "video" && raw.media.captions !== "required") issues.push({ code: "captions-not-required", item: id });
      }
    }
    if (raw.printApproval === "approved") {
      for (const field of ["shortPath", "destinationPath", "fallbackPath"] as const) {
        if (!localPath(raw[field])) issues.push({ code: "print-approved-without-path", item: id, field });
      }
      if (raw.health !== "passing" || raw.lifecycle !== "ready") issues.push({ code: "print-approved-before-ready", item: id });
    }
    if (containsSensitive(raw)) issues.push({ code: "sensitive-value", item: id });
  });
  return issues;
}

export function assertBookCompanionContract(input: unknown): void {
  const issues = validateBookCompanionContract(input);
  if (issues.length) throw new Error(`Book companion contract failed:\n${issues.map((x) => `${x.code}:${x.item ?? "root"}:${x.field ?? ""}`).join("\n")}`);
}
