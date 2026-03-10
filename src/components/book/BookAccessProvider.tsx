"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { isBookUnlocked, lockBook, unlockBook } from "@/lib/book-access";

interface BookAccessContextValue {
  /** Whether the book is currently unlocked. Undefined during hydration. */
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
  // Start as false to match SSR; flip after mount to avoid hydration mismatch.
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setIsUnlocked(isBookUnlocked());
  }, []);

  const unlock = useCallback((code: string): boolean => {
    const success = unlockBook(code);
    if (success) setIsUnlocked(true);
    return success;
  }, []);

  const lock = useCallback(() => {
    lockBook();
    setIsUnlocked(false);
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
