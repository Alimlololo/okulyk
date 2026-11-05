import { Flame } from "lucide-react";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import type { ActivityPreviewRow } from "@/components/dashboard/ActivityPreviewList";
import { daysAgo, formatDayMonth, toDayKey } from "@/lib/date";
import { useLocale } from "@/i18n";
import type { Locale } from "@/i18n";
import type { ActivityEntry } from "@/types";

const TIME_LOCALE: Record<Locale, string> = { ru: "ru-RU", kz: "kk-KZ", en: "en-US" };

/** "today" / "yesterday" / "3 days ago" / "4 November" + time. */
export function useRelativeTime() {
  const { t, locale } = useLocale();
  return (iso: string) => {
    const key = toDayKey(new Date(iso));
    const delta = daysAgo(key);
    const day =
      delta === 0
        ? t("relative.today")
        : delta === 1
          ? t("relative.yesterday")
          : delta > 1 && delta < 7
            ? t("relative.daysAgo", { count: delta })
            : formatDayMonth(key, locale);
    const time = new Date(iso).toLocaleTimeString(TIME_LOCALE[locale], { hour: "2-digit", minute: "2-digit" });
    return `${day}, ${time}`;
  };
}

/** Maps activity entries into rows for the dashboard preview list. */
export function useActivityRows(entries: ActivityEntry[]): ActivityPreviewRow[] {
  const { t } = useLocale();
  const when = useRelativeTime();
  return entries.map((entry) => ({
    key: entry.id,
    icon: entry.subjectId ? (
      <SubjectIcon subjectId={entry.subjectId} size="sm" />
    ) : (
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-butter-soft text-butter-ink">
        <Flame className="h-4 w-4" aria-hidden="true" />
      </span>
    ),
    title: entry.title,
    subtitle: `${entry.subjectId ? `${t(`subjects.${entry.subjectId}.name`)} · ` : ""}${when(entry.date)}`,
    badge: (
      <>
        {entry.score && (
          <p className="text-sm font-bold text-ink">
            {entry.score.correct}/{entry.score.total}
          </p>
        )}
        <p className="text-xs text-muted">+{entry.xp} XP</p>
      </>
    ),
  }));
}
