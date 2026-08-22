export type ProofKind =
  | "testimonial"
  | "email-quote"
  | "whatsapp-screenshot"
  | "video";

export type ProofPublicationSurface =
  | "homepage"
  | "coaching"
  | "stories-index"
  | "story-detail";

interface VerifiedProofPublicationBase {
  subjectId: string;
  surfaces: readonly ProofPublicationSurface[];
  sourceVerifiedAt: string;
  consentVerifiedAt: string;
  wordingApprovedAt: string;
  consentScope: string;
  contentSha256: string;
  expiresAt?: string;
}

export type VerifiedProofPublicationRecord =
  | (VerifiedProofPublicationBase & {
      kind: "email-quote";
      assetSha256?: never;
    })
  | (VerifiedProofPublicationBase & {
      kind: Exclude<ProofKind, "email-quote">;
      assetSha256: string;
    });

/**
 * Item-level publication ledger.
 *
 * It starts empty on purpose. Add an entry only after the source, the current
 * wording and the person's consent for the named surfaces have all been
 * checked and documented outside the public repository. An old screenshot,
 * video or web page is not treated as evergreen consent.
 */
export const VERIFIED_PROOF_PUBLICATION_LEDGER: readonly VerifiedProofPublicationRecord[] = [];

function isoDateTimestamp(value: string, endOfDay = false): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  if (Number.isNaN(timestamp)) return null;
  if (new Date(timestamp).toISOString().slice(0, 10) !== value) return null;
  return endOfDay ? timestamp + 86_399_999 : timestamp;
}

function recordIsComplete(record: VerifiedProofPublicationRecord): boolean {
  const now = Date.now();
  const approvalDates = [
    record.sourceVerifiedAt,
    record.consentVerifiedAt,
    record.wordingApprovedAt,
  ].map((value) => isoDateTimestamp(value));
  const expiresAt = record.expiresAt
    ? isoDateTimestamp(record.expiresAt, true)
    : null;
  const mediaAssetIsBound =
    record.kind === "email-quote" || /^[a-f0-9]{64}$/.test(record.assetSha256);

  return (
    record.subjectId.trim().length > 0 &&
    record.consentScope.trim().length > 0 &&
    /^[a-f0-9]{64}$/.test(record.contentSha256) &&
    mediaAssetIsBound &&
    record.surfaces.length > 0 &&
    approvalDates.every((timestamp) => timestamp !== null && timestamp <= now) &&
    (!record.expiresAt || (expiresAt !== null && expiresAt >= now))
  );
}

export function isApprovedForPublication(
  kind: ProofKind,
  subjectId: string,
  surface: ProofPublicationSurface,
  contentSha256: string,
  assetSha256?: string,
): boolean {
  return VERIFIED_PROOF_PUBLICATION_LEDGER.some(
    (record) =>
      record.kind === kind &&
      record.subjectId === subjectId &&
      record.surfaces.includes(surface) &&
      record.contentSha256 === contentSha256 &&
      (record.kind === "email-quote" || record.assetSha256 === assetSha256) &&
      recordIsComplete(record),
  );
}
