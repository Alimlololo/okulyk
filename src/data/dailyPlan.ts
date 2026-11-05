import type { DailyPlan, StudentUser } from "@/types";
import { todayKey } from "@/lib/date";
import { lessonsBySubject } from "@/data/lessons";
import { DEFAULT_LOAD_LEVEL, LOAD_TASK_COUNTS } from "@/data/load";

/**
 * Generate today's plan: one entry per subject the student picked. The
 * number of tasks per subject follows the parent/onboarding "daily load"
 * setting (light/standard/intense, see data/load.ts) instead of a fixed
 * lesson size. In a real app this would come from a scheduler that also
 * considers weak topics and spaced repetition.
 */
export function buildDailyPlan(student: StudentUser): DailyPlan {
  const subjects = student.selectedSubjects;

  const items = subjects.map((subjectId) => {
    const lessons = lessonsBySubject(subjectId);
    // Prefer a lesson matching a weak topic, otherwise the first one — used
    // for the video/summary shown at the top of the lesson, independent of
    // how many practice tasks the load setting asks for.
    const weak = student.weakTopics.find((w) => w.subjectId === subjectId);
    const lesson = (weak && lessons.find((l) => l.topic === weak.topic)) ?? lessons[0];
    const level = student.subjectLoad?.[subjectId] ?? DEFAULT_LOAD_LEVEL;
    const totalTasks = LOAD_TASK_COUNTS[level];

    return {
      subjectId,
      lessonId: lesson.id,
      status: "not_started" as const,
      totalTasks,
      completedTasks: 0,
      xpReward: lesson.xpReward,
    };
  });

  return {
    id: `plan-${student.id}-${todayKey()}`,
    studentId: student.id,
    date: todayKey(),
    items,
    minItemsToKeepStreak: Math.min(student.dailyGoal, items.length),
  };
}
