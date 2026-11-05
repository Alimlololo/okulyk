import type { ParentUser, StudentUser } from "@/types";
import { computeCurrentStreak } from "@/lib/streak";
import { lastNDays } from "@/lib/date";
import { buildStreakHistory, buildStudyMinutes, xpByDayFromHistory } from "@/data/history";

/* ------------------------------------------------------------------ */
/* Student 1 — Амина, 5 класс (main demo account)                     */
/* ------------------------------------------------------------------ */

const aminaHistory = buildStreakHistory(35, {
  missedDaysAgo: [21, 22],
  frozenDaysAgo: [9],
  seed: "amina",
});
const aminaStreak = computeCurrentStreak(aminaHistory);

export const AMINA: StudentUser = {
  id: "stu-amina",
  role: "student",
  name: "Амина",
  email: "amina@example.kz",
  avatarColor: "#6C4CF1",
  createdAt: "2026-06-01T09:00:00.000Z",
  grade: 5,
  selectedSubjects: ["math", "english", "russian", "science"],
  parentIds: ["par-dinara"],
  level: "core",
  onboarded: true,
  dailyGoal: 3,
  streak: {
    current: aminaStreak,
    longest: Math.max(aminaStreak, 24),
    lastQualifiedDate: aminaHistory.filter((d) => d.goalMet || d.frozen).at(-1)?.date ?? null,
    freezesAvailable: 2,
    history: aminaHistory,
  },
  xp: {
    total: 4820,
    weekly: 260,
    weeklyGoal: 350,
    level: 7,
    byDay: xpByDayFromHistory(aminaHistory, 7),
  },
  subjectProgress: [
    { subjectId: "math", completedLessons: 6, totalLessons: 12, percent: 50, accuracy: 62, lastActivity: aminaHistory.at(-2)?.date ?? null, lastTopic: "Дроби" },
    { subjectId: "english", completedLessons: 8, totalLessons: 12, percent: 67, accuracy: 81, lastActivity: aminaHistory.at(-2)?.date ?? null, lastTopic: "Reading comprehension" },
    { subjectId: "russian", completedLessons: 7, totalLessons: 12, percent: 58, accuracy: 74, lastActivity: aminaHistory.at(-3)?.date ?? null, lastTopic: "Безударные гласные" },
    { subjectId: "science", completedLessons: 9, totalLessons: 12, percent: 75, accuracy: 88, lastActivity: aminaHistory.at(-2)?.date ?? null, lastTopic: "Организм человека" },
    { subjectId: "kazakh", completedLessons: 0, totalLessons: 12, percent: 0, accuracy: 0, lastActivity: null },
  ],
  weakTopics: [
    { subjectId: "math", topic: "Дроби", accuracy: 41, recommendedMinutes: 15 },
    { subjectId: "math", topic: "Логические задачи", accuracy: 58, recommendedMinutes: 10 },
    { subjectId: "russian", topic: "Безударные гласные", accuracy: 63, recommendedMinutes: 10 },
  ],
  studyMinutes: buildStudyMinutes(14, "amina"),
};

/* ------------------------------------------------------------------ */
/* Student 2 — Нұрислам, 3 класс                                      */
/* ------------------------------------------------------------------ */

const nurislamHistory = buildStreakHistory(35, {
  missedDaysAgo: [3, 8, 14, 15],
  frozenDaysAgo: [],
  seed: "nurislam",
});
const nurislamStreak = computeCurrentStreak(nurislamHistory);

export const NURISLAM: StudentUser = {
  id: "stu-nurislam",
  role: "student",
  name: "Нұрислам",
  email: "nurislam@example.kz",
  avatarColor: "#0D9488",
  createdAt: "2026-07-10T09:00:00.000Z",
  grade: 3,
  selectedSubjects: ["math", "kazakh", "english"],
  parentIds: ["par-dinara"],
  level: "beginner",
  onboarded: true,
  dailyGoal: 2,
  streak: {
    current: nurislamStreak,
    longest: 11,
    lastQualifiedDate: nurislamHistory.filter((d) => d.goalMet || d.frozen).at(-1)?.date ?? null,
    freezesAvailable: 1,
    history: nurislamHistory,
  },
  xp: {
    total: 1740,
    weekly: 120,
    weeklyGoal: 250,
    level: 3,
    byDay: xpByDayFromHistory(nurislamHistory, 7),
  },
  subjectProgress: [
    { subjectId: "math", completedLessons: 4, totalLessons: 12, percent: 33, accuracy: 70, lastActivity: nurislamHistory.at(-2)?.date ?? null, lastTopic: "Логические задачи" },
    { subjectId: "kazakh", completedLessons: 5, totalLessons: 12, percent: 42, accuracy: 66, lastActivity: nurislamHistory.at(-2)?.date ?? null, lastTopic: "Сөз таптары" },
    { subjectId: "english", completedLessons: 2, totalLessons: 12, percent: 17, accuracy: 55, lastActivity: nurislamHistory.at(-5)?.date ?? null, lastTopic: "Present Continuous" },
    { subjectId: "russian", completedLessons: 0, totalLessons: 12, percent: 0, accuracy: 0, lastActivity: null },
    { subjectId: "science", completedLessons: 0, totalLessons: 12, percent: 0, accuracy: 0, lastActivity: null },
  ],
  weakTopics: [
    { subjectId: "english", topic: "Present Continuous", accuracy: 44, recommendedMinutes: 10 },
    { subjectId: "kazakh", topic: "Сөз таптары", accuracy: 59, recommendedMinutes: 10 },
  ],
  studyMinutes: buildStudyMinutes(14, "nurislam"),
};

/* ------------------------------------------------------------------ */
/* Parent — Динара (linked to both students)                          */
/* ------------------------------------------------------------------ */

export const DINARA: ParentUser = {
  id: "par-dinara",
  role: "parent",
  name: "Динара",
  email: "dinara@example.kz",
  avatarColor: "#0A8074",
  createdAt: "2026-06-01T09:00:00.000Z",
  childIds: ["stu-amina", "stu-nurislam"],
  notificationPrefs: {
    eveningReminder: true,
    streakLost: true,
    weeklyReport: true,
    newWeakTopic: false,
    channelPush: true,
    channelWhatsApp: false,
  },
};

export const STUDENTS: Record<string, StudentUser> = {
  [AMINA.id]: AMINA,
  [NURISLAM.id]: NURISLAM,
};

export const PARENTS: Record<string, ParentUser> = {
  [DINARA.id]: DINARA,
};

/** Freshly-registered student used to demo the onboarding flow. */
export function makeFreshStudent(opts: { name: string; email: string }): StudentUser {
  // A brand-new account has no past: empty streak history, zero XP and zero
  // study minutes — calendars render the days before sign-up as blank.
  const zeros = (n: number) => lastNDays(n).reverse().map((date) => ({ date, value: 0 }));
  return {
    id: `stu-${Date.now()}`,
    role: "student",
    name: opts.name.trim() || "Ученик",
    email: opts.email.trim().toLowerCase(),
    avatarColor: "#FF7A1A",
    createdAt: new Date().toISOString(),
    grade: 5,
    selectedSubjects: [],
    parentIds: [],
    level: null,
    onboarded: false,
    dailyGoal: 3,
    streak: {
      current: 0,
      longest: 0,
      lastQualifiedDate: null,
      freezesAvailable: 1,
      history: [],
    },
    xp: { total: 0, weekly: 0, weeklyGoal: 300, level: 1, byDay: zeros(7) },
    subjectProgress: [],
    weakTopics: [],
    studyMinutes: zeros(14),
  };
}
