/**
 * Munara — shared domain types for the prototype.
 *
 * Everything is designed to be extended later:
 * - IDs are plain strings so they can map onto real DB primary keys.
 * - Tasks use a discriminated union on `type` so new question formats are additive.
 * - User is a discriminated union on `role`; add fields per role without touching the other.
 * - Time-series data ("XP per day", "minutes per day") share the `DayValue` shape.
 */

import type { DayKey } from "@/lib/date";

/* ------------------------------------------------------------------ */
/* Subjects                                                           */
/* ------------------------------------------------------------------ */

export type SubjectId = "math" | "english" | "kazakh" | "russian" | "science";

/** Groups subjects into the two tabs shown on /student and on the landing page. */
export type SubjectGroupId = "exam" | "language";

/** Daily task-count tier — see data/load.ts for the actual counts. */
export type LoadLevel = "light" | "standard" | "intense";

export interface Subject {
  id: SubjectId;
  /** Display name, ru. */
  name: string;
  /** Compact label for chips / charts. */
  shortName: string;
  /** Emoji used as the subject icon across the app. */
  icon: string;
  /** One-liner for the landing page. */
  tagline: string;
  /** Marketing counts shown on the landing page ("24 темы", "180 видеоуроков"). */
  topicsCount: number;
  videoLessonsCount: number;
  /** Primary hex color (charts, accents). */
  color: string;
  /** Tailwind class bundles for light theming of cards/badges. */
  theme: {
    /** e.g. "bg-violet-50" */
    soft: string;
    /** e.g. "text-violet-700" */
    text: string;
    /** e.g. "ring-violet-200" */
    ring: string;
    /** e.g. "bg-violet-600" */
    solid: string;
  };
}

/* ------------------------------------------------------------------ */
/* Users                                                              */
/* ------------------------------------------------------------------ */

export type UserRole = "student" | "parent";

export type StartLevel = "beginner" | "core" | "advanced";

interface UserBase {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  avatarColor: string;
  createdAt: string; // ISO datetime
}

export interface StudentUser extends UserBase {
  role: "student";
  grade: number; // 1..7
  /** Subjects the student is actively preparing for. */
  selectedSubjects: SubjectId[];
  /** Linked parent accounts (0..n). */
  parentIds: string[];
  /** Result of the intro placement test; null until onboarding is done. */
  level: StartLevel | null;
  onboarded: boolean;
  streak: StreakData;
  xp: XpData;
  /** Minimum completed daily-plan items required to keep the streak. */
  dailyGoal: number;
  /** Rolling per-subject mastery, recomputed as lessons are completed. */
  subjectProgress: SubjectProgress[];
  /** Topics flagged as weak (drives parent "needs attention" + recommendations). */
  weakTopics: WeakTopic[];
  /** Minutes spent studying per day (parent "time spent" chart). */
  studyMinutes: DayValue[];
  /**
   * Daily task-count tier per subject (parent/onboarding controlled).
   * Missing entries default to "standard" — see data/load.ts.
   */
  subjectLoad?: Partial<Record<SubjectId, LoadLevel>>;
  /**
   * Explicitly `false` right after onboarding, until the dashboard shows the
   * one-time "welcome" message and flips it to `true`. `undefined` (seeded
   * demo accounts) is treated the same as `true` — no welcome banner.
   */
  hasSeenWelcome?: boolean;
  /** Per-subject starting level from the diagnostic — feeds task difficulty. */
  diagnosticLevel?: Partial<Record<SubjectId, StartLevel>>;
  /** In-progress / completed state of the post-onboarding diagnostic flow. */
  diagnostic?: DiagnosticState;
  /** Lesson ids whose video has been opened in the video library. */
  watchedVideoIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Diagnostic (full placement) flow                                   */
/* ------------------------------------------------------------------ */

export interface DiagnosticQuestion {
  id: string;
  subjectId: SubjectId;
  grade: number;
  topic: string;
  difficulty: StartLevel;
  prompt: string;
  options: TaskOption[];
  correctOptionId: string;
  explanation: string;
}

export interface DiagnosticState {
  /** Subjects being tested, in the order they're presented. */
  subjects: SubjectId[];
  /** Index into `subjects` of the subject currently in progress. */
  subjectIndex: number;
  answers: Record<string, string>;
  done: boolean;
}

export interface DiagnosticResult {
  bySubject: Partial<
    Record<SubjectId, { correct: number; total: number; level: StartLevel }>
  >;
}

export interface ParentUser extends UserBase {
  role: "parent";
  /** Linked student accounts (1..n). */
  childIds: string[];
  notificationPrefs: NotificationPrefs;
}

export type User = StudentUser | ParentUser;

/* ------------------------------------------------------------------ */
/* Streak & XP                                                        */
/* ------------------------------------------------------------------ */

export interface StreakDay {
  date: DayKey;
  /** Student opened at least one task that day. */
  active: boolean;
  /** Daily goal met -> this day counts toward the streak. */
  goalMet: boolean;
  /** Streak protected by a freeze (future monetization hook). */
  frozen: boolean;
  xpEarned: number;
}

export interface StreakData {
  current: number;
  longest: number;
  /** Last day the goal was met (or a freeze applied). */
  lastQualifiedDate: DayKey | null;
  /** Remaining streak freezes (paid feature stub). */
  freezesAvailable: number;
  /** Recent day-by-day history, newest last. ~35 days in mock data. */
  history: StreakDay[];
}

export interface DayValue {
  date: DayKey;
  value: number;
}

export interface XpData {
  total: number;
  /** XP earned in the current calendar week. */
  weekly: number;
  weeklyGoal: number;
  level: number;
  /** XP earned per day for the last 7 days (dashboard widget). */
  byDay: DayValue[];
}

/* ------------------------------------------------------------------ */
/* Lessons                                                            */
/* ------------------------------------------------------------------ */

export type LessonStatus = "not_started" | "in_progress" | "completed";

export interface Lesson {
  id: string;
  subjectId: SubjectId;
  title: string;
  summary: string;
  /** Topic tag — matches WeakTopic.topic for cross-referencing. */
  topic: string;
  grade: number;
  /** Ordering within a subject track. */
  order: number;
  durationMin: number;
  videoPreviewLabel: string;
  taskIds: string[];
  xpReward: number;
}

/* ------------------------------------------------------------------ */
/* Tasks (discriminated union on `type`)                              */
/* ------------------------------------------------------------------ */

export type TaskType = "single_choice" | "multi_choice" | "text_input" | "matching";

export interface TaskOption {
  id: string;
  label: string;
}

interface TaskBase {
  id: string;
  lessonId: string;
  subjectId: SubjectId;
  prompt: string;
  /** Shown after the learner answers. */
  explanation: string;
  xp: number;
  /** Drives selection once the diagnostic has placed the student on a level. Defaults to "core". */
  difficulty?: StartLevel;
}

export interface SingleChoiceTask extends TaskBase {
  type: "single_choice";
  options: TaskOption[];
  correctOptionId: string;
}

export interface MultiChoiceTask extends TaskBase {
  type: "multi_choice";
  options: TaskOption[];
  correctOptionIds: string[];
}

export interface TextInputTask extends TaskBase {
  type: "text_input";
  /** Any of these (case/space-insensitive) is accepted. */
  acceptedAnswers: string[];
  placeholder?: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingTask extends TaskBase {
  type: "matching";
  pairs: MatchingPair[];
}

export type Task =
  | SingleChoiceTask
  | MultiChoiceTask
  | TextInputTask
  | MatchingTask;

/* ------------------------------------------------------------------ */
/* Daily plan                                                         */
/* ------------------------------------------------------------------ */

export interface DailyPlanItem {
  subjectId: SubjectId;
  lessonId: string;
  status: LessonStatus;
  totalTasks: number;
  completedTasks: number;
  /** Correct answers so far — lets an interrupted practice resume. */
  correctTasks?: number;
  xpReward: number;
}

export interface DailyPlan {
  id: string;
  studentId: string;
  date: DayKey;
  items: DailyPlanItem[];
  /** Items that must reach `completed` for the day to count. */
  minItemsToKeepStreak: number;
}

/* ------------------------------------------------------------------ */
/* Progress & weak topics                                             */
/* ------------------------------------------------------------------ */

export interface SubjectProgress {
  subjectId: SubjectId;
  completedLessons: number;
  totalLessons: number;
  /** 0..100 */
  percent: number;
  /** 0..100 — rolling accuracy on practice for this subject. */
  accuracy: number;
  lastActivity: DayKey | null;
  /** Title of the last topic/lesson the student finished — shown as "продолжить с того же места". */
  lastTopic?: string;
}

export interface WeakTopic {
  subjectId: SubjectId;
  topic: string;
  /** 0..100 accuracy on this topic. */
  accuracy: number;
  recommendedMinutes: number;
}

/* ------------------------------------------------------------------ */
/* Activity feed                                                      */
/* ------------------------------------------------------------------ */

export type ActivityKind = "lesson_completed" | "practice_completed" | "streak_milestone";

export interface ActivityEntry {
  id: string;
  studentId: string;
  date: string; // ISO datetime
  kind: ActivityKind;
  subjectId: SubjectId | null;
  title: string;
  /** Present for practice/lesson results. */
  score?: { correct: number; total: number };
  xp: number;
}

/* ------------------------------------------------------------------ */
/* Placement (intro) test                                             */
/* ------------------------------------------------------------------ */

export interface PlacementQuestion {
  id: string;
  subjectId: SubjectId;
  prompt: string;
  options: TaskOption[];
  correctOptionId: string;
}

export interface PlacementResult {
  answered: number;
  correct: number;
  level: StartLevel;
  bySubject: Partial<Record<SubjectId, { correct: number; total: number }>>;
}

/* ------------------------------------------------------------------ */
/* Notifications                                                      */
/* ------------------------------------------------------------------ */

export interface NotificationPrefs {
  eveningReminder: boolean;
  streakLost: boolean;
  weeklyReport: boolean;
  newWeakTopic: boolean;
  channelPush: boolean;
  channelWhatsApp: boolean;
  whatsappPhone?: string;
}
