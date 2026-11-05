import type { DayValue, StreakDay } from "@/types";
import { lastNDays, todayKey } from "@/lib/date";
import { seededRandom } from "@/lib/utils";

/**
 * Build a plausible streak history ending "yesterday" (today starts empty so
 * the dashboard can show the "finish today" warning). `pattern` marks how many
 * days back were missed / frozen so the numbers stay stable between reloads.
 */
export function buildStreakHistory(
  days: number,
  opts: { missedDaysAgo?: number[]; frozenDaysAgo?: number[]; seed?: string } = {},
): StreakDay[] {
  const { missedDaysAgo = [], frozenDaysAgo = [], seed = "munara" } = opts;
  const keys = lastNDays(days).reverse(); // oldest -> newest
  const today = todayKey();

  return keys.map((date, idx) => {
    const daysAgo = days - 1 - idx;
    const isToday = date === today;
    const missed = missedDaysAgo.includes(daysAgo);
    const frozen = frozenDaysAgo.includes(daysAgo);
    const goalMet = !isToday && !missed;
    const r = seededRandom(seed + date);

    return {
      date,
      active: isToday ? false : !missed || frozen,
      goalMet,
      frozen,
      xpEarned: isToday ? 0 : goalMet ? 30 + Math.round(r * 40) : 0,
    };
  });
}

export function xpByDayFromHistory(history: StreakDay[], days = 7): DayValue[] {
  return history.slice(-days).map((d) => ({ date: d.date, value: d.xpEarned }));
}

/** Minutes studied per day for the last `days` days (parent time chart). */
export function buildStudyMinutes(days: number, seed: string): DayValue[] {
  const keys = lastNDays(days).reverse();
  const today = todayKey();
  return keys.map((date) => {
    const r = seededRandom(seed + "min" + date);
    const isToday = date === today;
    return {
      date,
      value: isToday ? Math.round(r * 12) : 12 + Math.round(r * 33),
    };
  });
}
