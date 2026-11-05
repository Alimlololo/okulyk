import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "./types";
import { LOCALES } from "./types";
import { ru, type Dictionary } from "./dictionaries/ru";
import { kz } from "./dictionaries/kz";
import { en } from "./dictionaries/en";

const DICTIONARIES: Record<Locale, Dictionary> = { ru, kz, en };

/**
 * Russian is the default: it's the language the existing mock content
 * (lesson text, task prompts, reviews, FAQ answers) is written in, so
 * keeping it as the starting locale avoids a jarring mix of a translated
 * chrome over still-Russian content on first load. Kazakh and English are
 * one click away via the switcher.
 */
const DEFAULT_LOCALE: Locale = "ru";
const STORAGE_KEY = "munara.locale";

type Primitive = string | number;

/** Dot-path lookup, e.g. t("studentDashboard.doneOf"). */
function resolve(dict: Dictionary, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

function interpolate(template: string, params?: Record<string, Primitive>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  );
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Dictionary lookup by dot-path key, with optional {param} interpolation. */
  t: (key: string, params?: Record<string, Primitive>) => string;
  /** Pick a stable-but-varied line from a message pool (array dictionary key). */
  pick: (key: string, seed: string, params?: Record<string, Primitive>) => string;
  /** Raw array value (e.g. FAQ items, reviews) for the current locale. */
  list: <T>(key: string) => T[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function loadInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && (LOCALES as string[]).includes(stored)) return stored as Locale;
  } catch {
    /* localStorage unavailable — fall back to default */
  }
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(loadInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore — locale just won't persist across reloads */
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, Primitive>) => {
      const value = resolve(DICTIONARIES[locale], key) ?? resolve(DICTIONARIES[DEFAULT_LOCALE], key);
      if (typeof value !== "string") return key;
      return interpolate(value, params);
    },
    [locale],
  );

  const pick = useCallback(
    (key: string, seed: string, params?: Record<string, Primitive>) => {
      const value =
        resolve(DICTIONARIES[locale], key) ?? resolve(DICTIONARIES[DEFAULT_LOCALE], key);
      if (!Array.isArray(value) || value.length === 0) return key;
      // Deterministic-per-seed pseudo-random pick, so a given render (or a
      // given day/streak count) doesn't flicker between variants on re-render.
      let hash = 0;
      for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
      const line = value[hash % value.length] as string;
      return interpolate(line, params);
    },
    [locale],
  );

  const list = useCallback(
    <T,>(key: string): T[] => {
      const value =
        resolve(DICTIONARIES[locale], key) ?? resolve(DICTIONARIES[DEFAULT_LOCALE], key);
      return Array.isArray(value) ? (value as T[]) : [];
    },
    [locale],
  );

  // Keep <html lang> in sync for screen readers, hyphenation and fonts.
  useEffect(() => {
    document.documentElement.lang = locale === "kz" ? "kk" : locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t, pick, list }),
    [locale, setLocale, t, pick, list],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}
