import type { ActivityEntry } from "@/types";
import { addDays, todayKey } from "@/lib/date";

function at(daysAgo: number, hh: number, mm: number): string {
  const d = new Date(`${addDays(todayKey(), -daysAgo)}T00:00:00`);
  d.setHours(hh, mm, 0, 0);
  return d.toISOString();
}

/** Recent activity feed for the parent dashboard, newest first. */
export const ACTIVITY: ActivityEntry[] = [
  // --- Амина ---
  {
    id: "act-a1",
    studentId: "stu-amina",
    date: at(1, 19, 20),
    kind: "practice_completed",
    subjectId: "science",
    title: "Практика: Живая и неживая природа",
    score: { correct: 5, total: 5 },
    xp: 40,
  },
  {
    id: "act-a2",
    studentId: "stu-amina",
    date: at(1, 18, 55),
    kind: "lesson_completed",
    subjectId: "english",
    title: "Урок: Present Simple vs Present Continuous",
    score: { correct: 5, total: 6 },
    xp: 40,
  },
  {
    id: "act-a3",
    studentId: "stu-amina",
    date: at(1, 18, 30),
    kind: "practice_completed",
    subjectId: "math",
    title: "Практика: Дроби",
    score: { correct: 2, total: 5 },
    xp: 24,
  },
  {
    id: "act-a4",
    studentId: "stu-amina",
    date: at(2, 20, 10),
    kind: "practice_completed",
    subjectId: "russian",
    title: "Практика: Безударные гласные в корне",
    score: { correct: 4, total: 6 },
    xp: 32,
  },
  {
    id: "act-a5",
    studentId: "stu-amina",
    date: at(3, 17, 40),
    kind: "streak_milestone",
    subjectId: null,
    title: "Неделя без пропусков 🔥",
    xp: 50,
  },
  {
    id: "act-a6",
    studentId: "stu-amina",
    date: at(4, 19, 5),
    kind: "lesson_completed",
    subjectId: "math",
    title: "Урок: Логические задачи",
    score: { correct: 4, total: 6 },
    xp: 40,
  },

  // --- Нұрислам ---
  {
    id: "act-n1",
    studentId: "stu-nurislam",
    date: at(1, 16, 10),
    kind: "practice_completed",
    subjectId: "kazakh",
    title: "Практика: Сөз таптары",
    score: { correct: 3, total: 5 },
    xp: 24,
  },
  {
    id: "act-n2",
    studentId: "stu-nurislam",
    date: at(2, 16, 30),
    kind: "lesson_completed",
    subjectId: "math",
    title: "Урок: Логические задачи",
    score: { correct: 5, total: 6 },
    xp: 40,
  },
  {
    id: "act-n3",
    studentId: "stu-nurislam",
    date: at(4, 17, 0),
    kind: "practice_completed",
    subjectId: "english",
    title: "Практика: Present Continuous",
    score: { correct: 2, total: 6 },
    xp: 16,
  },
  {
    id: "act-n4",
    studentId: "stu-nurislam",
    date: at(5, 15, 45),
    kind: "practice_completed",
    subjectId: "kazakh",
    title: "Практика: Мәтінмен жұмыс",
    score: { correct: 4, total: 5 },
    xp: 32,
  },
];

export function activityForStudent(studentId: string): ActivityEntry[] {
  return ACTIVITY.filter((a) => a.studentId === studentId).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
}
