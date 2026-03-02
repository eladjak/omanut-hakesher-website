"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
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

export function GenderProvider({ children }: { children: ReactNode }) {
  const [gender, setGenderState] = useState<Gender>("neutral");
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Gender | null;
      if (stored === "male" || stored === "female" || stored === "neutral") {
        setGenderState(stored);
      }

      const welcomed = localStorage.getItem(WELCOMED_KEY);
      if (!welcomed) {
        setIsFirstVisit(true);
      }
    } catch {
      // localStorage unavailable — remain at defaults
    }
  }, []);

  // Apply CSS class when gender changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("gender-male", "gender-female");

    if (gender === "male") {
      root.classList.add("gender-male");
    } else if (gender === "female") {
      root.classList.add("gender-female");
    }

    try {
      localStorage.setItem(STORAGE_KEY, gender);
    } catch {
      // ignore
    }
  }, [gender, mounted]);

  const setGender = useCallback((newGender: Gender) => {
    setGenderState(newGender);
  }, []);

  const dismissWelcome = useCallback(() => {
    setIsFirstVisit(false);
    try {
      localStorage.setItem(WELCOMED_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  return (
    <GenderContext.Provider
      value={{ gender, setGender, isFirstVisit, dismissWelcome }}
    >
      {children}
    </GenderContext.Provider>
  );
}
