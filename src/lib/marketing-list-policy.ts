export interface MarketingListApproval {
  listId: number;
  consentBasis: string;
  approvedAt: string;
  owner: string;
}

/**
 * Owner-reviewed destinations that may receive explicitly consenting contacts.
 *
 * Intentionally empty: an environment variable is deployment configuration,
 * not evidence of consent or owner approval. Enabling a destination requires
 * adding one reviewed record here as well as setting its ID in the environment.
 */
export const APPROVED_MARKETING_LISTS: readonly MarketingListApproval[] = [];

export type MarketingListResolution =
  | ({ status: "approved" } & MarketingListApproval)
  | { status: "missing" | "invalid"; listId: null };

/**
 * Resolve the one list that may receive new, explicitly consenting subscribers.
 *
 * Unknown IDs fail closed as `missing`, including legacy IDs and newly created
 * provider lists. Guide delivery remains a separate operation and does not
 * depend on a marketing-list decision.
 */
export function resolveApprovedMarketingListId(
  rawValue: string | undefined,
  approvedLists: readonly MarketingListApproval[] = APPROVED_MARKETING_LISTS,
): MarketingListResolution {
  const normalized = rawValue?.trim();
  if (!normalized) {
    return { status: "missing", listId: null };
  }

  if (!/^[1-9]\d*$/.test(normalized)) {
    return { status: "invalid", listId: null };
  }

  const listId = Number(normalized);
  if (!Number.isSafeInteger(listId)) {
    return { status: "invalid", listId: null };
  }

  const matches = approvedLists.filter((entry) => entry.listId === listId);
  if (matches.length !== 1) {
    return { status: "missing", listId: null };
  }

  const [approval] = matches;
  if (
    !approval ||
    !Number.isSafeInteger(approval.listId) ||
    !approval.consentBasis.trim() ||
    !approval.approvedAt.trim() ||
    Number.isNaN(Date.parse(approval.approvedAt)) ||
    !approval.owner.trim()
  ) {
    return { status: "invalid", listId: null };
  }

  return { status: "approved", ...approval };
}

export function getApprovedMarketingList(): MarketingListResolution {
  return resolveApprovedMarketingListId(
    process.env.RAV_MESSER_APPROVED_LIST_ID,
  );
}
