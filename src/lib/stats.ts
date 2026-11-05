/**
 * Dashboard metrics derived from real data (streak history, activity log,
 * study minutes) — no random numbers, so everything a student does shows up
 * on both the student and the parent dashboards.
 */
import type { ActivityEntry, DayValue, StreakDay } from "@/types";
import { lastNDays, toDayKey, type DayKey } from "@/lib/date";

export interface Trend {
  direction: "up" | "down";
  percent: number;
}

/** Oldest → newest day keys for the trailing `n` days, ending today. */
export function trailingDays(n: number, offset = 0): DayKey[] {
  const all = lastNDays(n + offset).reverse();
  return all.slice(0, n);
}

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/** Change vs the previous period; undefined when there's nothing to compare against. */
export function trendOf(current: number, previous: number): Trend | undefined {
  if (previous <= 0) return undefined;
  const delta = Math.round(((current - previous) / previous) * 100);
  return { direction: delta >= 0 ? "up" : "down", percent: Math.min(999, Math.abs(delta)) };
}

/** 1 for each of the last 7 days that counted toward the streak, else 0. */
export function streakWeek(history: StreakDay[]): number[] {
  const byDate = new Map(history.map((d) => [d.date, d]));
  return trailingDays(7).map((k) => {
    const d = byDate.get(k);
    return d && (d.goalMet || d.frozen) ? 1 : 0;
  });
}

const entryDay = (e: ActivityEntry) => toDayKey(new Date(e.date));

function tasksOn(entries: ActivityEntry[], day: DayKey): number {
  return sum(entries.filter((e) => e.score && entryDay(e) === day).map((e) => e.score!.total));
}

/** Tasks solved per day this week, the weekly total and the change vs last week. */
export function weeklyTasks(entries: ActivityEntry[]) {
  const thisWeek = trailingDays(7);
  const prevWeek = lastNDays(14).reverse().slice(0, 7);
  const perDay = thisWeek.map((d) => tasksOn(entries, d));
  const total = sum(perDay);
  const prevTotal = sum(prevWeek.map((d) => tasksOn(entries, d)));
  return { perDay, total, trend: trendOf(total, prevTotal) };
}

/** Average % of correct answers per day this week (0 for days without practice). */
export function weeklyScores(entries: ActivityEntry[]): number[] {
  return trailingDays(7).map((d) => {
    const scored = entries.filter((e) => e.score && e.score.total > 0 && entryDay(e) === d);
    if (scored.length === 0) return 0;
    return Math.round(
      sum(scored.map((e) => (e.score!.correct / e.score!.total) * 100)) / scored.length,
    );
  });
}

/** Values of a per-day series for the trailing `n` days (missing days = 0). */
export function windowValues(series: DayValue[], n: number): DayValue[] {
  const byDate = new Map(series.map((d) => [d.date, d.value]));
  return trailingDays(n).map((date) => ({ date, value: byDate.get(date) ?? 0 }));
}
