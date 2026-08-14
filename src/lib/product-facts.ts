/**
 * Verified structural facts shared by public website surfaces.
 *
 * These are counts measured from the canonical book/course repositories, not
 * marketing estimates. Prices, proof counts, guarantees, credentials and
 * product status deliberately do not belong here: they require separate owner
 * approval and evidence records.
 */
export const PRODUCT_FACTS = {
  verifiedAt: "2026-08-13",
  book: {
    parts: 5,
    chapters: 13,
    numberedExercises: 54,
    coreExercises: 15,
  },
  course: {
    weeks: 12,
    contentLessons: 76,
    safetyLessons: 1,
    lmsMappedLessons: 75,
  },
  commerce: {
    // Keep the public UI fail-closed until payment verification, durable
    // fulfillment and idempotency are implemented and contract-tested.
    onlineCheckoutAvailable: false,
  },
  privacy: {
    // Analytics stays off until an explicit consent mechanism and an approved
    // privacy notice are implemented together.
    analyticsAvailable: false,
  },
} as const;
