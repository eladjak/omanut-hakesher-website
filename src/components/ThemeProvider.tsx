"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

const THEME_KEY = "theme";
const THEME_CHANGE_EVENT = "omanut-theme-change";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage may be unavailable; fall back to the OS preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function subscribeToTheme(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const notify = () => {
    applyTheme(getThemeSnapshot());
    onStoreChange();
  };
  applyTheme(getThemeSnapshot());
  window.addEventListener("storage", notify);
  window.addEventListener(THEME_CHANGE_EVENT, notify);
  media.addEventListener("change", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(THEME_CHANGE_EVENT, notify);
    media.removeEventListener("change", notify);
  };
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = getThemeSnapshot() === "light" ? "dark" : "light";
    try {
      window.localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      // The visual toggle still works for this page when storage is unavailable.
    }
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
