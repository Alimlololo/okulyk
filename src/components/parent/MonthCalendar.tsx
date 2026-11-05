import type { StreakDay } from "@/types";
import { addDays, formatDayMonth, fromDayKey, todayKey, weekdayShort } from "@/lib/date";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n";

type State = "done" | "missed" | "frozen" | "today" | "none" | "future";

const WEEKS = 5;

/** Five-week calendar (Monday-first, real weekdays) of streak outcomes for the parent overview. */
export function MonthCalendar({ history }: { history: StreakDay[] }) {
  const today = todayKey();
  const { t, locale } = useLocale();
  const byDate = new Map(history.map((d) => [d.date, d]));

  // Start on the Monday WEEKS-1 weeks before this week's Monday.
  const dow = (fromDayKey(today).getDay() + 6) % 7; // 0 = Monday
  const start = addDays(today, -dow - (WEEKS - 1) * 7);
  const keys = Array.from({ length: WEEKS * 7 }, (_, i) => addDays(start, i));

  const LABEL: Record<State, string> = {
    done: t("calendar.done"),
    missed: t("calendar.missed"),
    frozen: t("calendar.frozen"),
    today: t("calendar.today"),
    none: "—",
    future: "—",
  };
  return (
    <div className="max-w-md">
      <div className="grid grid-cols-7 gap-1.5">
        {keys.slice(0, 7).map((k) => (
          <span key={`h-${k}`} className="text-center text-[11px] font-medium text-muted">
            {weekdayShort(k, locale)}
          </span>
        ))}
        {keys.map((k) => {
          const d = byDate.get(k);
          const state: State =
            k > today
              ? "future"
              : d?.frozen
                ? "frozen"
                : d?.goalMet
                  ? "done"
                  : k === today
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
                "grid aspect-square place-items-center rounded-md text-[11px] font-semibold",
                state === "done" && "bg-fire-500 text-white",
                state === "missed" && "bg-ink/10 text-muted",
                state === "frozen" && "bg-sky text-sky-ink",
                state === "today" && "border-2 border-dashed border-ink/30 text-ink",
                state === "none" && "bg-ink/[0.03] text-ink/25",
                state === "future" && "text-ink/20",
              )}
            >
              {Number(k.slice(8))}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <Legend swatch="bg-fire-500" label={t("calendar.done")} />
        <Legend swatch="bg-ink/10" label={t("calendar.missed")} />
        <Legend swatch="bg-sky" label={t("calendar.frozen")} />
      </div>
      <p className="mt-2 text-xs text-muted">
        {t("x.parent.range", {
          from: formatDayMonth(keys[0], locale),
          to: formatDayMonth(today, locale),
        })}
      </p>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("h-2.5 w-2.5 rounded-sm", swatch)} aria-hidden="true" />
      {label}
    </span>
  );
}
