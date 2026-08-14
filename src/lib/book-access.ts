/**
 * Deprecated client access shim.
 *
 * Client-side access codes cannot establish an entitlement and must never
 * unlock protected content. The protected routes are fail-closed at the server
 * boundary until an order/account-backed verifier is implemented.
 */

const LEGACY_STORAGE_KEY = "omanut-book-access";

export interface AccessInfo {
  unlocked: boolean;
  code?: string;
  unlockedAt?: string;
}

/** Client validation is intentionally disabled. */
export function validateAccessCode(code: string): boolean {
  void code;
  return false;
}

/** Always locked until a server-verified entitlement source is connected. */
export function isBookUnlocked(): boolean {
  return false;
}

/**
 * Client code entry is no longer an authorization path. Kept as a fail-closed
 * compatibility shim for any stale client bundle or import.
 */
export function unlockBook(code: string): boolean {
  void code;
  return false;
}

/**
 * Clears the access from localStorage (used for testing / logout).
 */
export function lockBook(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

/** Returns only the fail-closed state; never trusts legacy browser storage. */
export function getAccessInfo(): AccessInfo {
  return { unlocked: false };
}
