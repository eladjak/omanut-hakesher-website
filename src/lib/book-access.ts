/**
 * Book Access Code System
 * Client-side only, localStorage-based (MVP - Supabase later)
 */

const STORAGE_KEY = "omanut-book-access";

const VALID_CODES: ReadonlySet<string> = new Set([
  "AHK-2026-BOOK",
  "AHK-BETA-TEST",
  "AHK-ELAD-VIP",
]);

export interface AccessInfo {
  unlocked: boolean;
  code?: string;
  unlockedAt?: string;
}

interface StoredAccess {
  code: string;
  unlockedAt: string;
}

/**
 * Normalizes a code: uppercase, trim whitespace.
 */
function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

/**
 * Validates an access code against the known valid list.
 */
export function validateAccessCode(code: string): boolean {
  return VALID_CODES.has(normalizeCode(code));
}

/**
 * Returns true if the book is currently unlocked in localStorage.
 * Safe to call on the server (returns false when localStorage is unavailable).
 */
export function isBookUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const stored = JSON.parse(raw) as StoredAccess;
    return typeof stored.code === "string" && VALID_CODES.has(stored.code);
  } catch {
    return false;
  }
}

/**
 * Validates the code and, if valid, saves it to localStorage.
 * Returns true on success, false if the code is invalid.
 */
export function unlockBook(code: string): boolean {
  const normalized = normalizeCode(code);
  if (!VALID_CODES.has(normalized)) return false;

  if (typeof window === "undefined") return false;

  const stored: StoredAccess = {
    code: normalized,
    unlockedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  return true;
}

/**
 * Clears the access from localStorage (used for testing / logout).
 */
export function lockBook(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Returns full access info from localStorage.
 */
export function getAccessInfo(): AccessInfo {
  if (typeof window === "undefined") return { unlocked: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { unlocked: false };
    const stored = JSON.parse(raw) as StoredAccess;
    if (typeof stored.code !== "string" || !VALID_CODES.has(stored.code)) {
      return { unlocked: false };
    }
    return {
      unlocked: true,
      code: stored.code,
      unlockedAt: stored.unlockedAt,
    };
  } catch {
    return { unlocked: false };
  }
}
