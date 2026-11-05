/** Supported interface languages. */
export type Locale = "ru" | "kz" | "en";

export const LOCALES: Locale[] = ["ru", "kz", "en"];

export const LOCALE_LABEL: Record<Locale, string> = {
  ru: "RU",
  kz: "KZ",
  en: "EN",
};

export const LOCALE_NAME: Record<Locale, string> = {
  ru: "Русский",
  kz: "Қазақша",
  en: "English",
};

/**
 * A piece of content translated into all three interface languages.
 * Used for mock content that genuinely needs per-record translation
 * (e.g. the warm greeting/motivation message pools) — as opposed to
 * static UI chrome, which is looked up from the dictionaries by key.
 */
export type LocalizedText = Record<Locale, string>;
