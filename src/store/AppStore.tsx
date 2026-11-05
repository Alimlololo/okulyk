import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  ActivityEntry,
  DailyPlan,
  LoadLevel,
  NotificationPrefs,
  ParentUser,
  StartLevel,
  StudentUser,
  SubjectId,
} from "@/types";
import { STUDENTS, PARENTS, DINARA, makeFreshStudent } from "@/data/users";
import { activityForStudent } from "@/data/activity";
import { windowValues } from "@/lib/stats";
import { buildDailyPlan } from "@/data/dailyPlan";
import { getLesson } from "@/data/lessons";
import { SUBJECTS } from "@/data/subjects";
import { scoreDiagnostic, overallDiagnosticLevel } from "@/data/diagnostic";
import {
  applyStreakFreeze,
  computeCurrentStreak,
  isDailyGoalMet,
  recordDailyOutcome,
} from "@/lib/streak";
import { todayKey } from "@/lib/date";
import { clamp } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* State shape                                                        */
/* ------------------------------------------------------------------ */

export type Session =
  | { role: "student"; userId: string }
  | { role: "parent"; userId: string }
  | null;

interface StoreState {
  session: Session;
  students: Record<string, StudentUser>;
  parents: Record<string, ParentUser>;
  dailyPlans: Record<string, DailyPlan>; // keyed by studentId
  completedLessonIds: Record<string, string[]>; // keyed by studentId
  activityLog: Record<string, ActivityEntry[]>; // keyed by studentId, newest first
}

export type AuthError = "notFound" | "emailTaken";

export interface LessonResult {
  correct: number;
  total: number;
  xpEarned: number;
  newStreak: number;
  streakDelta: number;
  goalJustMet: boolean;
  firstCompletionOfLesson: boolean;
}

interface StoreApi extends StoreState {
  /** Log in with an existing account's email. Returns an error code on failure. */
  login: (role: "student" | "parent", email: string) => AuthError | null;
  /** Create a new account with the name/email the user typed. */
  register: (role: "student" | "parent", payload: { name: string; email: string }) => AuthError | null;
  logout: () => void;
  completeOnboarding: (
    studentId: string,
    payload: { grade: number; subjects: SubjectId[]; loadLevel: LoadLevel },
  ) => void;
  startPlanItem: (studentId: string, lessonId: string) => void;
  recordTaskProgress: (studentId: string, lessonId: string, completed: number, correct: number) => void;
  toggleSubject: (studentId: string, subjectId: SubjectId) => void;
  updateSubjectLoad: (studentId: string, subjectId: SubjectId, level: LoadLevel) => void;
  markWelcomeSeen: (studentId: string) => void;
  startDiagnostic: (studentId: string) => void;
  answerDiagnosticQuestion: (studentId: string, questionId: string, optionId: string) => void;
  advanceDiagnosticSubject: (studentId: string) => void;
  markVideoWatched: (studentId: string, lessonId: string) => void;
  finishLesson: (
    studentId: string,
    lessonId: string,
    score: { correct: number; total: number },
  ) => LessonResult;
  useStreakFreeze: (studentId: string) => void;
  updateNotificationPrefs: (parentId: string, patch: Partial<NotificationPrefs>) => void;
  resetDemo: () => void;
}

const AppStoreContext = createContext<StoreApi | null>(null);

const STORAGE_KEY = "munara.state.v2";

/* ------------------------------------------------------------------ */
/* Init & persistence                                                 */
/* ------------------------------------------------------------------ */

function freshState(): StoreState {
  const students = structuredClone(STUDENTS) as Record<string, StudentUser>;
  const dailyPlans: Record<string, DailyPlan> = {};
  for (const s of Object.values(students)) {
    // Recompute the streak in case the calendar day has changed since the mock
    // history was generated.
    s.streak.current = computeCurrentStreak(s.streak.history);
    s.streak.longest = Math.max(s.streak.longest, s.streak.current);
    dailyPlans[s.id] = buildDailyPlan(s);
  }
  return {
    session: null,
    students,
    parents: structuredClone(PARENTS) as Record<string, ParentUser>,
    dailyPlans,
    completedLessonIds: {},
    activityLog: {},
  };
}

/** Keep the rolling per-day windows (XP, study minutes) aligned with today. */
function rollWindows(s: StudentUser): void {
  s.xp.byDay = windowValues(s.xp.byDay, 7);
  s.studyMinutes = windowValues(s.studyMinutes, 14);
}

function loadState(): StoreState {
  if (typeof window === "undefined") return freshState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw) as StoreState & { day?: string };
    // Roll the daily plan over when the day changes.
    if (parsed.day !== todayKey()) {
      for (const s of Object.values(parsed.students)) {
        s.streak.current = computeCurrentStreak(s.streak.history);
        rollWindows(s);
        parsed.dailyPlans[s.id] = buildDailyPlan(s);
      }
      parsed.completedLessonIds = {};
    }
    return {
      session: parsed.session ?? null,
      students: parsed.students,
      parents: parsed.parents,
      dailyPlans: parsed.dailyPlans,
      completedLessonIds: parsed.completedLessonIds ?? {},
      activityLog: parsed.activityLog ?? {},
    };
  } catch {
    return freshState();
  }
}

/* ------------------------------------------------------------------ */
/* Provider                                                           */
/* ------------------------------------------------------------------ */

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(loadState);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...state, day: todayKey() }),
      );
    } catch {
      /* storage may be unavailable — prototype still works in memory */
    }
  }, [state]);

  const login = useCallback<StoreApi["login"]>((role, rawEmail) => {
    const email = rawEmail.trim().toLowerCase();
    const cur = stateRef.current;
    const pool = role === "student" ? Object.values(cur.students) : Object.values(cur.parents);
    const user = pool.find((u) => u.email.toLowerCase() === email);
    if (!user) return "notFound";
    setState((prev) => ({ ...prev, session: { role, userId: user.id } as Session }));
    return null;
  }, []);

  const register = useCallback<StoreApi["register"]>((role, payload) => {
    const email = payload.email.trim().toLowerCase();
    const cur = stateRef.current;
    const taken = [...Object.values(cur.students), ...Object.values(cur.parents)].some(
      (u) => u.email.toLowerCase() === email,
    );
    if (taken) return "emailTaken";
    if (role === "student") {
      const fresh = makeFreshStudent(payload);
      setState((prev) => ({
        ...prev,
        students: { ...prev.students, [fresh.id]: fresh },
        dailyPlans: { ...prev.dailyPlans, [fresh.id]: buildDailyPlan(fresh) },
        session: { role: "student", userId: fresh.id },
      }));
    } else {
      // Demo: a new parent account is linked to the demo children so the
      // dashboard has something to show.
      const parent: ParentUser = {
        ...structuredClone(DINARA),
        id: `par-${Date.now()}`,
        name: payload.name.trim() || DINARA.name,
        email,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        parents: { ...prev.parents, [parent.id]: parent },
        session: { role: "parent", userId: parent.id },
      }));
    }
    return null;
  }, []);

  const logout = useCallback(() => {
    setState((prev) => ({ ...prev, session: null }));
  }, []);

  const completeOnboarding = useCallback<StoreApi["completeOnboarding"]>(
    (studentId, payload) => {
      setState((prev) => {
        const student = prev.students[studentId];
        if (!student) return prev;
        const subjectLoad = Object.fromEntries(
          payload.subjects.map((id) => [id, payload.loadLevel]),
        ) as Partial<Record<SubjectId, LoadLevel>>;
        const updated: StudentUser = {
          ...student,
          grade: payload.grade,
          selectedSubjects: payload.subjects,
          onboarded: true,
          hasSeenWelcome: false,
          subjectLoad,
          diagnostic: { subjects: payload.subjects, subjectIndex: 0, answers: {}, done: false },
          subjectProgress: SUBJECTS.map((s) => ({
            subjectId: s.id,
            completedLessons: 0,
            totalLessons: 12,
            percent: 0,
            accuracy: 0,
            lastActivity: null,
          })),
        };
        return {
          ...prev,
          students: { ...prev.students, [studentId]: updated },
          dailyPlans: { ...prev.dailyPlans, [studentId]: buildDailyPlan(updated) },
        };
      });
    },
    [],
  );

  const markWelcomeSeen = useCallback<StoreApi["markWelcomeSeen"]>((studentId) => {
    setState((prev) => {
      const student = prev.students[studentId];
      if (!student || student.hasSeenWelcome !== false) return prev;
      return {
        ...prev,
        students: { ...prev.students, [studentId]: { ...student, hasSeenWelcome: true } },
      };
    });
  }, []);

  const startDiagnostic = useCallback<StoreApi["startDiagnostic"]>((studentId) => {
    setState((prev) => {
      const student = prev.students[studentId];
      if (!student) return prev;
      // Already in progress (or done) — resume as-is, don't reset answers.
      if (student.diagnostic) return prev;
      return {
        ...prev,
        students: {
          ...prev.students,
          [studentId]: {
            ...student,
            diagnostic: { subjects: student.selectedSubjects, subjectIndex: 0, answers: {}, done: false },
          },
        },
      };
    });
  }, []);

  const answerDiagnosticQuestion = useCallback<StoreApi["answerDiagnosticQuestion"]>(
    (studentId, questionId, optionId) => {
      setState((prev) => {
        const student = prev.students[studentId];
        if (!student?.diagnostic) return prev;
        return {
          ...prev,
          students: {
            ...prev.students,
            [studentId]: {
              ...student,
              diagnostic: {
                ...student.diagnostic,
                answers: { ...student.diagnostic.answers, [questionId]: optionId },
              },
            },
          },
        };
      });
    },
    [],
  );

  const advanceDiagnosticSubject = useCallback<StoreApi["advanceDiagnosticSubject"]>(
    (studentId) => {
      setState((prev) => {
        const student = prev.students[studentId];
        if (!student?.diagnostic || student.diagnostic.done) return prev;
        const d = student.diagnostic;
        const nextIndex = d.subjectIndex + 1;
        if (nextIndex < d.subjects.length) {
          return {
            ...prev,
            students: {
              ...prev.students,
              [studentId]: { ...student, diagnostic: { ...d, subjectIndex: nextIndex } },
            },
          };
        }
        // Last subject just finished — score everything and finalize.
        const result = scoreDiagnostic(d.subjects, d.answers);
        const diagnosticLevel = Object.fromEntries(
          Object.entries(result.bySubject).map(([sid, r]) => [sid, r!.level]),
        ) as Partial<Record<SubjectId, StartLevel>>;
        return {
          ...prev,
          students: {
            ...prev.students,
            [studentId]: {
              ...student,
              diagnostic: { ...d, done: true },
              diagnosticLevel,
              level: overallDiagnosticLevel(result.bySubject),
            },
          },
        };
      });
    },
    [],
  );

  const markVideoWatched = useCallback<StoreApi["markVideoWatched"]>((studentId, lessonId) => {
    setState((prev) => {
      const student = prev.students[studentId];
      if (!student) return prev;
      const watched = new Set(student.watchedVideoIds ?? []);
      if (watched.has(lessonId)) return prev;
      watched.add(lessonId);
      return {
        ...prev,
        students: {
          ...prev.students,
          [studentId]: { ...student, watchedVideoIds: Array.from(watched) },
        },
      };
    });
  }, []);

  const updateSubjectLoad = useCallback<StoreApi["updateSubjectLoad"]>(
    (studentId, subjectId, level) => {
      setState((prev) => {
        const student = prev.students[studentId];
        if (!student) return prev;
        const updated: StudentUser = {
          ...student,
          subjectLoad: { ...student.subjectLoad, [subjectId]: level },
        };
        const regenerated = buildDailyPlan(updated);
        const existingPlan = prev.dailyPlans[studentId];
        // Keep today's progress for subjects already started; only subjects
        // still "not started" pick up the new task count immediately.
        const items = regenerated.items.map((item) => {
          const existing = existingPlan?.items.find((it) => it.subjectId === item.subjectId);
          return existing && existing.status !== "not_started" ? existing : item;
        });
        return {
          ...prev,
          students: { ...prev.students, [studentId]: updated },
          dailyPlans: { ...prev.dailyPlans, [studentId]: { ...regenerated, items } },
        };
      });
    },
    [],
  );

  const startPlanItem = useCallback<StoreApi["startPlanItem"]>((studentId, lessonId) => {
    setState((prev) => {
      const plan = prev.dailyPlans[studentId];
      if (!plan) return prev;
      const items = plan.items.map((it) =>
        it.lessonId === lessonId && it.status === "not_started"
          ? { ...it, status: "in_progress" as const }
          : it,
      );
      return { ...prev, dailyPlans: { ...prev.dailyPlans, [studentId]: { ...plan, items } } };
    });
  }, []);

  const recordTaskProgress = useCallback<StoreApi["recordTaskProgress"]>(
    (studentId, lessonId, completed, correct) => {
      setState((prev) => {
        const plan = prev.dailyPlans[studentId];
        if (!plan) return prev;
        const items = plan.items.map((it) =>
          it.lessonId === lessonId && it.status !== "completed"
            ? {
                ...it,
                status: "in_progress" as const,
                completedTasks: Math.min(it.totalTasks, completed),
                correctTasks: correct,
              }
            : it,
        );
        return { ...prev, dailyPlans: { ...prev.dailyPlans, [studentId]: { ...plan, items } } };
      });
    },
    [],
  );

  const toggleSubject = useCallback<StoreApi["toggleSubject"]>((studentId, subjectId) => {
    setState((prev) => {
      const student = prev.students[studentId];
      if (!student) return prev;
      const selected = student.selectedSubjects.includes(subjectId)
        ? student.selectedSubjects.filter((id) => id !== subjectId)
        : [...student.selectedSubjects, subjectId];
      const hasProgress = student.subjectProgress.some((p) => p.subjectId === subjectId);
      const updated: StudentUser = {
        ...student,
        selectedSubjects: selected,
        subjectProgress: hasProgress
          ? student.subjectProgress
          : [
              ...student.subjectProgress,
              { subjectId, completedLessons: 0, totalLessons: 12, percent: 0, accuracy: 0, lastActivity: null },
            ],
      };
      const regenerated = buildDailyPlan(updated);
      const existing = prev.dailyPlans[studentId];
      // Keep today's progress for subjects that stay in the plan.
      const items = regenerated.items.map(
        (item) => existing?.items.find((it) => it.subjectId === item.subjectId) ?? item,
      );
      return {
        ...prev,
        students: { ...prev.students, [studentId]: updated },
        dailyPlans: { ...prev.dailyPlans, [studentId]: { ...regenerated, items } },
      };
    });
  }, []);

  const finishLesson = useCallback<StoreApi["finishLesson"]>(
    (studentId, lessonId, score) => {
      // Compute the whole outcome synchronously from the current snapshot so
      // the caller (the result screen) gets real numbers back immediately,
      // then commit the identical next-state.
      const cur = stateRef.current;
      const s = cur.students[studentId];
      const plan = cur.dailyPlans[studentId];
      const lesson = getLesson(lessonId);
      const ratio = score.total > 0 ? score.correct / score.total : 0;
      const alreadyDone = (cur.completedLessonIds[studentId] ?? []).includes(lessonId);
      const xpEarned =
        alreadyDone || !s
          ? 0
          : lesson
            ? Math.round(lesson.xpReward * (0.4 + 0.6 * ratio))
            : Math.round(20 * ratio);

      if (!s || !plan) {
        return {
          ...score,
          xpEarned: 0,
          newStreak: s?.streak.current ?? 0,
          streakDelta: 0,
          goalJustMet: false,
          firstCompletionOfLesson: !alreadyDone,
        };
      }

      // 1. Mark the plan item completed.
      const items = plan.items.map((it) =>
        it.lessonId === lessonId
          ? { ...it, status: "completed" as const, completedTasks: it.totalTasks, correctTasks: score.correct }
          : it,
      );
      const nextPlan: DailyPlan = { ...plan, items };

      // 2. Streak + XP (only the first completion of a lesson counts).
      let streak = s.streak;
      let xp = { ...s.xp, byDay: windowValues(s.xp.byDay, 7) };
      let streakDelta = 0;
      let goalJustMet = false;

      if (!alreadyDone) {
        const upd = recordDailyOutcome(streak, {
          goalMet: isDailyGoalMet(nextPlan),
          xpEarned,
        });
        streak = upd.streak;
        streakDelta = upd.streakDelta;
        goalJustMet = upd.goalJustMet;
        xp = {
          ...xp,
          total: xp.total + xpEarned,
          weekly: xp.weekly + xpEarned,
          byDay: xp.byDay.map((d) =>
            d.date === todayKey() ? { ...d, value: d.value + xpEarned } : d,
          ),
        };
      }

      // 3. Rolling per-subject progress.
      const subjectProgress = s.subjectProgress.map((sp) => {
        if (!lesson || sp.subjectId !== lesson.subjectId) return sp;
        const completedLessons = alreadyDone
          ? sp.completedLessons
          : Math.min(sp.totalLessons, sp.completedLessons + 1);
        const blendedAccuracy =
          sp.accuracy === 0
            ? Math.round(ratio * 100)
            : Math.round(sp.accuracy * 0.6 + ratio * 100 * 0.4);
        return {
          ...sp,
          completedLessons,
          percent: clamp(Math.round((completedLessons / sp.totalLessons) * 100), 0, 100),
          accuracy: blendedAccuracy,
          lastActivity: todayKey(),
        };
      });

      // 4. Study time: the video plus roughly 1.5 min per task.
      const minutes = (lesson?.durationMin ?? 0) + Math.ceil(score.total * 1.5);
      const studyMinutes = windowValues(s.studyMinutes, 14).map((d) =>
        d.date === todayKey() ? { ...d, value: d.value + minutes } : d,
      );

      const nextStudent: StudentUser = { ...s, streak, xp, subjectProgress, studyMinutes };
      const entry: ActivityEntry = {
        id: `act-${Date.now()}`,
        studentId,
        date: new Date().toISOString(),
        kind: "practice_completed",
        subjectId: lesson?.subjectId ?? null,
        title: lesson?.title ?? "",
        score,
        xp: xpEarned,
      };

      setState((live) => ({
        ...live,
        students: { ...live.students, [studentId]: nextStudent },
        dailyPlans: { ...live.dailyPlans, [studentId]: nextPlan },
        completedLessonIds: {
          ...live.completedLessonIds,
          [studentId]: Array.from(
            new Set([...(live.completedLessonIds[studentId] ?? []), lessonId]),
          ),
        },
        activityLog: {
          ...live.activityLog,
          [studentId]: [entry, ...(live.activityLog[studentId] ?? [])],
        },
      }));

      return {
        ...score,
        xpEarned,
        newStreak: streak.current,
        streakDelta,
        goalJustMet,
        firstCompletionOfLesson: !alreadyDone,
      };
    },
    [],
  );

  const useStreakFreezeAction = useCallback<StoreApi["useStreakFreeze"]>((studentId) => {
    setState((prev) => {
      const s = prev.students[studentId];
      if (!s) return prev;
      return {
        ...prev,
        students: {
          ...prev.students,
          [studentId]: { ...s, streak: applyStreakFreeze(s.streak) },
        },
      };
    });
  }, []);

  const updateNotificationPrefs = useCallback<StoreApi["updateNotificationPrefs"]>(
    (parentId, patch) => {
      setState((prev) => {
        const p = prev.parents[parentId];
        if (!p) return prev;
        return {
          ...prev,
          parents: {
            ...prev.parents,
            [parentId]: { ...p, notificationPrefs: { ...p.notificationPrefs, ...patch } },
          },
        };
      });
    },
    [],
  );

  const resetDemo = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setState(freshState());
  }, []);

  const value = useMemo<StoreApi>(
    () => ({
      ...state,
      login,
      register,
      logout,
      completeOnboarding,
      startPlanItem,
      recordTaskProgress,
      toggleSubject,
      updateSubjectLoad,
      markWelcomeSeen,
      startDiagnostic,
      answerDiagnosticQuestion,
      advanceDiagnosticSubject,
      markVideoWatched,
      finishLesson,
      useStreakFreeze: useStreakFreezeAction,
      updateNotificationPrefs,
      resetDemo,
    }),
    [
      state,
      login,
      register,
      logout,
      completeOnboarding,
      startPlanItem,
      recordTaskProgress,
      toggleSubject,
      updateSubjectLoad,
      markWelcomeSeen,
      startDiagnostic,
      answerDiagnosticQuestion,
      advanceDiagnosticSubject,
      markVideoWatched,
      finishLesson,
      useStreakFreezeAction,
      updateNotificationPrefs,
      resetDemo,
    ],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

/* ------------------------------------------------------------------ */
/* Hooks                                                              */
/* ------------------------------------------------------------------ */

export function useAppStore(): StoreApi {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore must be used within <AppStoreProvider>");
  return ctx;
}

export function useSession(): Session {
  return useAppStore().session;
}

export function useStudent(studentId: string | undefined): StudentUser | undefined {
  const { students } = useAppStore();
  return studentId ? students[studentId] : undefined;
}

export function useCurrentStudent(): StudentUser | undefined {
  const { session, students } = useAppStore();
  return session?.role === "student" ? students[session.userId] : undefined;
}

export function useCurrentParent(): ParentUser | undefined {
  const { session, parents } = useAppStore();
  return session?.role === "parent" ? parents[session.userId] : undefined;
}

export function useDailyPlan(studentId: string | undefined): DailyPlan | undefined {
  const { dailyPlans } = useAppStore();
  return studentId ? dailyPlans[studentId] : undefined;
}

/** Activity feed for a student: real events from this browser + demo history, newest first. */
export function useActivity(studentId: string | undefined): ActivityEntry[] {
  const { activityLog } = useAppStore();
  return useMemo(() => {
    if (!studentId) return [];
    return [...(activityLog[studentId] ?? []), ...activityForStudent(studentId)].sort(
      (a, b) => +new Date(b.date) - +new Date(a.date),
    );
  }, [activityLog, studentId]);
}
