import { Flame, Snowflake } from "lucide-react";
import type { StreakDay } from "@/types";
import { weekdayShort, formatDayMonth, todayKey } from "@/lib/date";
import { trailingDays } from "@/lib/stats";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n";

interface StreakCalendarProps {
  history: StreakDay[];
  /** How many trailing days to show — a multiple of 7 keeps the columns aligned. */
  days?: number;
}

type State = "done" | "missed" | "frozen" | "today" | "none";

/** "Last N days" grid, 7 per row with weekday headers: done / missed / frozen / today. */
export function StreakCalendar({ history, days = 14 }: StreakCalendarProps) {
  const keys = trailingDays(days);
  const byDate = new Map(history.map((d) => [d.date, d]));
  const today = todayKey();
  const { t, locale } = useLocale();

  const LABEL: Record<State, string> = {
    done: t("calendar.done"),
    missed: t("calendar.missed"),
    frozen: t("calendar.frozenStreak"),
    today: t("calendar.todayNotDoneYet"),
    none: "—",
  };

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5">
        {keys.slice(0, 7).map((k) => (
          <span key={`h-${k}`} className="text-center text-[11px] font-medium text-muted">
            {weekdayShort(k, locale)}
          </span>
        ))}
        {keys.map((k) => {
          const d = byDate.get(k);
          const isToday = k === today;
          const state: State = d?.frozen
            ? "frozen"
            : d?.goalMet
              ? "done"
              : isToday
                ? "today"
                : d
                  ? "missed"
                  : "none";
          return (
            <div
              key={k}
              title={`${formatDayMonth(k, locale)} — ${LABEL[state]}`}
              aria-label={`${formatDayMonth(k, locale)}: ${LABEL[state]}`}
              className={cn(
                "grid aspect-square place-items-center rounded-lg text-[11px] font-semibold",
                STATE_CLASS[state],
              )}
            >
              {state === "done" ? (
                <Flame className="h-4 w-4" fill="currentColor" aria-hidden="true" />
              ) : state === "frozen" ? (
                <Snowflake className="h-4 w-4" aria-hidden="true" />
              ) : (
                Number(k.slice(8))
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
        <Legend swatch="bg-fire-500" label={t("calendar.done")} />
        <Legend swatch="bg-ink/10" label={t("calendar.missed")} />
        <Legend swatch="bg-sky" label={t("calendar.frozen")} />
        <Legend swatch="border border-dashed border-ink/40" label={t("calendar.today")} />
      </div>
    </div>
  );
}

const STATE_CLASS: Record<State, string> = {
  done: "bg-fire-500 text-white",
  missed: "bg-ink/10 text-muted",
  frozen: "bg-sky text-sky-ink",
  today: "border-2 border-dashed border-ink/30 text-ink",
  none: "bg-ink/[0.03] text-ink/25",
};

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-sm", swatch)} aria-hidden="true" />
      {label}
    </span>
  );
}
