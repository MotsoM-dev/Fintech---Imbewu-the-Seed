"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type ThemeMode = "light" | "dark";

const themeKey = "imbewu-theme";
const themeEvent = "imbewu-theme-change";

function readStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(themeKey);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
}

function getPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  return readStoredTheme() ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function applyTheme(theme: ThemeMode) {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function subscribeToThemeChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleStorage = (event: StorageEvent) => {
    if (event.key === themeKey) onStoreChange();
  };
  const handlePreferenceChange = () => {
    if (!readStoredTheme()) onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(themeEvent, onStoreChange);
  media.addEventListener("change", handlePreferenceChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(themeEvent, onStoreChange);
    media.removeEventListener("change", handlePreferenceChange);
  };
}

function getServerTheme(): ThemeMode {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeToThemeChanges, getPreferredTheme, getServerTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    try {
      window.localStorage.setItem(themeKey, nextTheme);
    } catch {
      // Local storage can be unavailable in private or restricted browser contexts.
    }

    applyTheme(nextTheme);
    window.dispatchEvent(new Event(themeEvent));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return { theme, setTheme, toggleTheme };
}
