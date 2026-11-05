/** Date helpers. All "day keys" are ISO calendar dates: `YYYY-MM-DD`. */
import type { Locale } from "@/i18n/types";

export type DayKey = string;

export function toDayKey(date: Date): DayKey {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDayKey(key: DayKey): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function todayKey(): DayKey {
  return toDayKey(new Date());
}

export function addDays(key: DayKey, days: number): DayKey {
  const d = fromDayKey(key);
  d.setDate(d.getDate() + days);
  return toDayKey(d);
}

export function diffDays(a: DayKey, b: DayKey): number {
  const ms = fromDayKey(a).getTime() - fromDayKey(b).getTime();
  return Math.round(ms / 86_400_000);
}

/** Descending list of day keys ending today, e.g. lastNDays(7) -> [today, ..., today-6]. */
export function lastNDays(n: number, endKey: DayKey = todayKey()): DayKey[] {
  return Array.from({ length: n }, (_, i) => addDays(endKey, -i));
}

const WEEKDAYS: Record<Locale, string[]> = {
  ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  kz: ["Жс", "Дс", "Сс", "Ср", "Бс", "Жм", "Сб"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
const MONTHS: Record<Locale, string[]> = {
  ru: [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ],
  kz: [
    "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
    "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан",
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
};

export function weekdayShort(key: DayKey, locale: Locale = "ru"): string {
  return WEEKDAYS[locale][fromDayKey(key).getDay()];
}

export function formatDayMonth(key: DayKey, locale: Locale = "ru"): string {
  const d = fromDayKey(key);
  const month = MONTHS[locale][d.getMonth()];
  return locale === "en" ? `${month} ${d.getDate()}` : `${d.getDate()} ${month}`;
}

/**
 * Days between `key` and today, for relative-time display
 * (e.g. "today" / "yesterday" / "3 days ago") — the caller supplies the
 * localized phrasing via the i18n `t()` function.
 */
export function daysAgo(key: DayKey): number {
  return diffDays(todayKey(), key);
}
