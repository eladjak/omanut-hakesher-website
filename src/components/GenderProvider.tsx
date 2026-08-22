"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Gender } from "@/lib/gendered-content";

interface GenderContextValue {
  gender: Gender;
  setGender: (gender: Gender) => void;
  isFirstVisit: boolean;
  dismissWelcome: () => void;
}

const GenderContext = createContext<GenderContextValue>({
  gender: "neutral",
  setGender: () => {},
  isFirstVisit: false,
  dismissWelcome: () => {},
});

export function useGender() {
  return useContext(GenderContext);
}

const STORAGE_KEY = "gender-preference";
const WELCOMED_KEY = "gender-welcomed";
const GENDER_CHANGE_EVENT = "omanut-gender-change";
const WELCOME_CHANGE_EVENT = "omanut-gender-welcome-change";

function getGenderSnapshot(): Gender {
  if (typeof window === "undefined") return "neutral";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "male" || stored === "female" || stored === "neutral") {
      return stored;
    }
  } catch {
    // localStorage may be unavailable; keep the neutral default.
  }

  return "neutral";
}

function getServerGenderSnapshot(): Gender {
  return "neutral";
}

function applyGender(gender: Gender) {
  const root = document.documentElement;
  root.classList.remove("gender-male", "gender-female");
  if (gender === "male") root.classList.add("gender-male");
  if (gender === "female") root.classList.add("gender-female");
}

function subscribeToGender(onStoreChange: () => void) {
  const notify = () => {
    applyGender(getGenderSnapshot());
    onStoreChange();
  };

  applyGender(getGenderSnapshot());
  window.addEventListener("storage", notify);
  window.addEventListener(GENDER_CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(GENDER_CHANGE_EVENT, notify);
  };
}

function getFirstVisitSnapshot() {
  if (typeof window === "undefined") return false;
  try {
    return !window.localStorage.getItem(WELCOMED_KEY);
  } catch {
    return false;
  }
}

function getServerFirstVisitSnapshot() {
  return false;
}

function subscribeToFirstVisit(onStoreChange: () => void) {
  const notify = () => onStoreChange();
  window.addEventListener("storage", notify);
  window.addEventListener(WELCOME_CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(WELCOME_CHANGE_EVENT, notify);
  };
}

export function GenderProvider({ children }: { children: ReactNode }) {
  const gender = useSyncExternalStore(
    subscribeToGender,
    getGenderSnapshot,
    getServerGenderSnapshot,
  );
  const isFirstVisit = useSyncExternalStore(
    subscribeToFirstVisit,
    getFirstVisitSnapshot,
    getServerFirstVisitSnapshot,
  );

  const setGender = useCallback((newGender: Gender) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, newGender);
    } catch {
      // Keep the UI usable when storage is unavailable.
    }
    applyGender(newGender);
    window.dispatchEvent(new Event(GENDER_CHANGE_EVENT));
  }, []);

  const dismissWelcome = useCallback(() => {
    try {
      window.localStorage.setItem(WELCOMED_KEY, "true");
    } catch {
      // Keep the UI usable when storage is unavailable.
    }
    window.dispatchEvent(new Event(WELCOME_CHANGE_EVENT));
  }, []);

  return (
    <GenderContext.Provider
      value={{ gender, setGender, isFirstVisit, dismissWelcome }}
    >
      {children}
    </GenderContext.Provider>
  );
}
