import { useEffect } from "react";

/** Sets a descriptive browser-tab title: "<page> — Munara". */
export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — Munara` : "Munara — подготовка к НИШ";
  }, [title]);
}

/** i18n key for a time-of-day greeting ("x.greeting.morning" etc.). */
export function greetingKey(date = new Date()): string {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "x.greeting.morning";
  if (h >= 12 && h < 18) return "x.greeting.day";
  if (h >= 18 && h < 23) return "x.greeting.evening";
  return "x.greeting.night";
}
