"use client";

import { useCallback, useSyncExternalStore } from "react";

const BOOK_STORAGE_CHANGE_EVENT = "omanut-book-storage-change";

interface BookStorageChangeDetail {
  key: string;
}

function notifyBookStorageChange(key: string) {
  window.dispatchEvent(
    new CustomEvent<BookStorageChangeDetail>(BOOK_STORAGE_CHANGE_EVENT, {
      detail: { key },
    }),
  );
}

export function readBookStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeBookStorageItem(key: string, value: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, value);
    notifyBookStorageChange(key);
    return true;
  } catch {
    return false;
  }
}

export function removeBookStorageItem(key: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.removeItem(key);
    notifyBookStorageChange(key);
    return true;
  } catch {
    return false;
  }
}

function getServerSnapshot(): null {
  return null;
}

/**
 * Hydration-safe localStorage source for the protected book tools.
 *
 * The browser value is exposed only after hydration, and changes propagate
 * both across tabs (the native `storage` event) and within the current tab.
 */
export function useBookStorageItem(key: string): string | null {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === null || event.key === key) onStoreChange();
      };
      const handleLocalChange = (event: Event) => {
        const detail = (event as CustomEvent<BookStorageChangeDetail>).detail;
        if (detail?.key === key) onStoreChange();
      };

      window.addEventListener("storage", handleStorage);
      window.addEventListener(BOOK_STORAGE_CHANGE_EVENT, handleLocalChange);
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(BOOK_STORAGE_CHANGE_EVENT, handleLocalChange);
      };
    },
    [key],
  );

  const getSnapshot = useCallback(() => readBookStorageItem(key), [key]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
