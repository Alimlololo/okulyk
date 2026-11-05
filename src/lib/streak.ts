/**
 * Client-side streak logic (mock).
 *
 * Rules mirrored from Duolingo-style engagement:
 * - A day "qualifies" when the daily goal is met OR a freeze is applied.
 * - The current streak = count of consecutive qualifying days ending today
 *   (or yesterday, if today isn't done yet — you don't lose the streak until
 *   the day is actually over).
 * - Any fully-elapsed day where the goal was missed and no freeze was used
 *   breaks the chain -> streak resets to 0.
 */

import type { DailyPlan, StreakData, StreakDay } from "@/types";
import { addDays, todayKey, type DayKey } from "@/lib/date";

export function completedItemCount(plan: DailyPlan): number {
  return plan.items.filter((i) => i.status === "completed").length;
}

export function isDailyGoalMet(plan: DailyPlan): boolean {
  return completedItemCount(plan) >= plan.minItemsToKeepStreak;
}

export function dailyProgressPercent(plan: DailyPlan): number {
  if (plan.minItemsToKeepStreak === 0) return 100;
  return Math.min(
    100,
    Math.round((completedItemCount(plan) / plan.minItemsToKeepStreak) * 100),
  );
}

/** A day counts toward the streak if the goal was met or it was frozen. */
function qualifies(day: StreakDay): boolean {
  return day.goalMet || day.frozen;
}

/**
 * Walk the history backwards from `today` and count the consecutive qualifying
 * run. Today not being done yet is fine — we start counting from yesterday.
 */
export function computeCurrentStreak(
  history: StreakDay[],
  today: DayKey = todayKey(),
): number {
  const byDate = new Map(history.map((d) => [d.date, d]));
  let streak = 0;
  let cursor = today;

  const todayDay = byDate.get(today);
  if (!todayDay || !qualifies(todayDay)) {
    // Day isn't over — don't penalize yet, evaluate from yesterday.
    cursor = addDays(today, -1);
  }

  while (true) {
    const day = byDate.get(cursor);
    if (!day || !qualifies(day)) break;
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export interface StreakUpdate {
  streak: StreakData;
  streakDelta: number;
  goalJustMet: boolean;
}

/**
 * Record today's outcome into the streak and recompute derived fields.
 * `xpEarned` is added to today's entry (cumulative across sessions in a day).
 */
export function recordDailyOutcome(
  streak: StreakData,
  outcome: { goalMet: boolean; xpEarned: number },
  today: DayKey = todayKey(),
): StreakUpdate {
  const prevCurrent = streak.current;
  const history = streak.history.map((d) => ({ ...d }));

  let todayEntry = history.find((d) => d.date === today);
  if (!todayEntry) {
    todayEntry = {
      date: today,
      active: true,
      goalMet: false,
      frozen: false,
      xpEarned: 0,
    };
    history.push(todayEntry);
  }

  const goalJustMet = outcome.goalMet && !todayEntry.goalMet;
  todayEntry.active = true;
  todayEntry.goalMet = todayEntry.goalMet || outcome.goalMet;
  todayEntry.xpEarned += outcome.xpEarned;

  const current = computeCurrentStreak(history, today);

  return {
    streak: {
      ...streak,
      history,
      current,
      longest: Math.max(streak.longest, current),
      lastQualifiedDate:
        todayEntry.goalMet || todayEntry.frozen ? today : streak.lastQualifiedDate,
    },
    streakDelta: current - prevCurrent,
    goalJustMet,
  };
}

/**
 * Streak freeze — monetization stub. Marks today (or the given day) as frozen
 * so a missed day doesn't break the chain, and spends one freeze.
 */
export function applyStreakFreeze(
  streak: StreakData,
  day: DayKey = todayKey(),
): StreakData {
  if (streak.freezesAvailable <= 0) return streak;

  const history = streak.history.map((d) => ({ ...d }));
  let entry = history.find((d) => d.date === day);
  if (!entry) {
    entry = { date: day, active: false, goalMet: false, frozen: false, xpEarned: 0 };
    history.push(entry);
  }
  entry.frozen = true;

  const current = computeCurrentStreak(history, todayKey());
  return {
    ...streak,
    history,
    current,
    longest: Math.max(streak.longest, current),
    freezesAvailable: streak.freezesAvailable - 1,
    lastQualifiedDate: day,
  };
}
