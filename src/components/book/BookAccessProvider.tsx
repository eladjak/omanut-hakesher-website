"use client";

import {
  createContext,
  useCallback,
  useContext,
} from "react";
import { isBookUnlocked, lockBook, unlockBook } from "@/lib/book-access";

interface BookAccessContextValue {
  /** Whether a server-verified entitlement is present. */
  isUnlocked: boolean;
  /** Attempt to unlock with a code. Returns true on success. */
  unlock: (code: string) => boolean;
  /** Remove access (for testing). */
  lock: () => void;
}

const BookAccessContext = createContext<BookAccessContextValue | null>(null);

export function BookAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // The compatibility shim is deliberately fail-closed on server and client.
  const isUnlocked = isBookUnlocked();

  const unlock = useCallback((code: string): boolean => {
    return unlockBook(code);
  }, []);

  const lock = useCallback(() => {
    lockBook();
  }, []);

  return (
    <BookAccessContext.Provider value={{ isUnlocked, unlock, lock }}>
      {children}
    </BookAccessContext.Provider>
  );
}

export function useBookAccess(): BookAccessContextValue {
  const ctx = useContext(BookAccessContext);
  if (!ctx) {
    throw new Error("useBookAccess must be used inside <BookAccessProvider>");
  }
  return ctx;
}
