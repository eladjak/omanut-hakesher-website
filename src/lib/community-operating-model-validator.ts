export type CommunityModelIssue = { code: string; field?: string; item?: string };
type Obj = Record<string, unknown>;

const SENSITIVE = /(?:[a-z]:[\\/]users[\\/]|\b[^\s@]+@[^\s@]+\.[^\s@]+\b|(?:\+?972|0[2-9])-?\d{7,9})/i;
const REQUIRED_AUDIENCES = ["book-readers", "course-learners", "guidance-participants"];
const REQUIRED_HUMAN_ROLES = ["accountable-owner", "community-lead", "moderator", "safety-responder", "technical-admin"];
const REQUIRED_GATES = [
  "namedStaffingAndBackup", "publishedCoverageHours", "rulesAndConsentAccepted", "reportBlockAppealTested",
  "exportDeletionTested", "incidentTabletopCompleted", "entitlementIsolationTested", "privacyNoticeApproved",
];

function obj(value: unknown): value is Obj {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasSensitive(value: unknown): boolean {
  if (typeof value === "string") return SENSITIVE.test(value);
  if (Array.isArray(value)) return value.some(hasSensitive);
  return obj(value) && Object.values(value).some(hasSensitive);
}

export function validateCommunityOperatingModel(input: unknown): CommunityModelIssue[] {
  if (!obj(input)) return [{ code: "model-not-object" }];
  const issues: CommunityModelIssue[] = [];
  if (input.schemaVersion !== 1) issues.push({ code: "unsupported-schema-version" });
  if (input.productDecision !== "one-community-across-ecosystem") issues.push({ code: "multiple-community-drift" });
  const serves = Array.isArray(input.serves) ? input.serves : [];
  for (const audience of REQUIRED_AUDIENCES) if (!serves.includes(audience)) issues.push({ code: "missing-audience", item: audience });

  if (!obj(input.spaceModel)) issues.push({ code: "space-model-missing" });
  else {
    if (input.spaceModel.sharedTownSquare !== true) issues.push({ code: "shared-community-missing" });
    if (input.spaceModel.entitlementBasedRooms !== true) issues.push({ code: "room-isolation-missing" });
    if (input.spaceModel.publicPosting !== false) issues.push({ code: "public-posting-not-contained" });
    if (input.spaceModel.privateMessagesAtMvp !== false) issues.push({ code: "private-messages-enabled-at-mvp" });
    if (input.spaceModel.guidanceMaterialSharedByDefault !== false) issues.push({ code: "guidance-confidentiality-broken" });
  }

  const roles = Array.isArray(input.roles) ? input.roles.filter(obj) : [];
  const ids = new Set<string>();
  for (const role of roles) {
    const id = String(role.id ?? "");
    if (ids.has(id)) issues.push({ code: "duplicate-role", item: id });
    ids.add(id);
  }
  for (const id of REQUIRED_HUMAN_ROLES) {
    const role = roles.find((entry) => entry.id === id);
    if (!role || role.humanRequired !== true) issues.push({ code: "human-role-missing", item: id });
  }

  if (!obj(input.aiBoundary)) issues.push({ code: "ai-boundary-missing" });
  else {
    for (const field of ["mayIssueFinalSanction", "mayHandleAppealAlone", "mayPromiseSafetyResponse"]) {
      if (input.aiBoundary[field] !== false) issues.push({ code: "ai-overreach", field });
    }
    if (input.aiBoundary.humanReviewsSensitiveCases !== true) issues.push({ code: "sensitive-human-review-missing" });
  }

  if (!obj(input.responseTargets)) issues.push({ code: "response-targets-missing" });
  else {
    if (input.responseTargets.roundTheClockClaim !== false) issues.push({ code: "unsupported-round-the-clock-claim" });
    if (input.responseTargets.coverageSchedulePublished !== false && input.launchState !== "ready") {
      issues.push({ code: "coverage-state-mismatch" });
    }
  }

  if (!obj(input.privacy)) issues.push({ code: "privacy-model-missing" });
  else {
    if (input.privacy.minimumAge !== 18) issues.push({ code: "invalid-minimum-age" });
    if (input.privacy.directMessagesEnabled !== false) issues.push({ code: "direct-messages-privacy-risk" });
    if (input.privacy.screenshotsWithoutConsent !== false) issues.push({ code: "screenshots-without-consent" });
    if (input.privacy.automatedTrainingOnMemberContent !== false) issues.push({ code: "member-content-training-enabled" });
    if (input.privacy.memberExportAndDeletionRequired !== true) issues.push({ code: "member-rights-missing" });
    const retention = ["deletedContentOperationalDays", "backupDeletionMaximumDays", "moderationEvidenceMaximumDays"];
    for (const field of retention) {
      const days = input.privacy[field];
      if (typeof days !== "number" || days < 0 || days > 365) issues.push({ code: "unsafe-retention", field });
    }
  }

  if (!obj(input.escalation)) issues.push({ code: "escalation-model-missing" });
  else {
    for (const field of ["peerSupportIsTreatment", "emergencyService"]) if (input.escalation[field] !== false) issues.push({ code: "unsafe-service-claim", field });
    for (const field of ["reportPathRequired", "blockPathRequired", "appealPathRequired", "immediateDangerRedirectRequired", "credibleThreatEscalatesToHuman"]) {
      if (input.escalation[field] !== true) issues.push({ code: "missing-escalation-control", field });
    }
  }

  if (!obj(input.launchGates)) issues.push({ code: "launch-gates-missing" });
  else {
    const launchGates = input.launchGates;
    for (const gate of REQUIRED_GATES) if (typeof launchGates[gate] !== "boolean") issues.push({ code: "invalid-launch-gate", field: gate });
    const openGates = REQUIRED_GATES.filter((gate) => launchGates[gate] !== true);
    if (openGates.length > 0 && input.launchState !== "contained-until-operations-ready") issues.push({ code: "launch-open-with-failed-gates" });
  }
  if (hasSensitive(input)) issues.push({ code: "sensitive-value" });
  return issues;
}

export function assertCommunityOperatingModel(input: unknown): void {
  const issues = validateCommunityOperatingModel(input);
  if (issues.length) throw new Error(`Community operating model failed:\n${issues.map((x) => `${x.code}:${x.item ?? "root"}:${x.field ?? ""}`).join("\n")}`);
}
