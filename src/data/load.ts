import type { LoadLevel } from "@/types";

/** Ordered tiers, light to heavy. */
export const LOAD_LEVELS: LoadLevel[] = ["light", "standard", "intense"];

/**
 * Target tasks-per-day for a subject at each tier. Chosen to be clearly
 * distinct; "intense" intentionally exceeds what a single mock lesson holds —
 * buildDailyPlan() cycles back through the subject's task bank to fill it
 * (see data/tasks.ts#tasksForSubjectCount). A real backend would draw from a
 * much larger bank instead of repeating.
 */
export const LOAD_TASK_COUNTS: Record<LoadLevel, number> = {
  light: 4,
  standard: 8,
  intense: 12,
};

export const DEFAULT_LOAD_LEVEL: LoadLevel = "standard";
