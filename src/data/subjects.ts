import type { Subject, SubjectId, SubjectGroupId } from "@/types";

export const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "Математика",
    shortName: "Матем.",
    icon: "➗",
    tagline: "Логика, задачи на смекалку и счёт под формат НИШ",
    topicsCount: 26,
    videoLessonsCount: 180,
    color: "#6C4CF1",
    theme: {
      soft: "bg-violet-50",
      text: "text-violet-700",
      ring: "ring-violet-200",
      solid: "bg-violet-600",
    },
  },
  {
    id: "english",
    name: "Английский язык",
    shortName: "English",
    icon: "🔤",
    tagline: "Грамматика, чтение и словарный запас",
    topicsCount: 22,
    videoLessonsCount: 150,
    color: "#2563EB",
    theme: {
      soft: "bg-blue-50",
      text: "text-blue-700",
      ring: "ring-blue-200",
      solid: "bg-blue-600",
    },
  },
  {
    id: "kazakh",
    name: "Қазақ тілі",
    shortName: "Қазақша",
    icon: "🏔️",
    tagline: "Сөздік қор, грамматика және мәтінмен жұмыс",
    topicsCount: 20,
    videoLessonsCount: 140,
    color: "#059669",
    theme: {
      soft: "bg-emerald-50",
      text: "text-emerald-700",
      ring: "ring-emerald-200",
      solid: "bg-emerald-600",
    },
  },
  {
    id: "russian",
    name: "Русский язык",
    shortName: "Русский",
    icon: "📖",
    tagline: "Грамотность, орфография и понимание текста",
    topicsCount: 24,
    videoLessonsCount: 160,
    color: "#E11D48",
    theme: {
      soft: "bg-rose-50",
      text: "text-rose-700",
      ring: "ring-rose-200",
      solid: "bg-rose-600",
    },
  },
  {
    id: "science",
    name: "Естествознание",
    shortName: "Естеств.",
    icon: "🔬",
    tagline: "Природа, человек и окружающий мир",
    topicsCount: 18,
    videoLessonsCount: 120,
    color: "#0D9488",
    theme: {
      soft: "bg-teal-50",
      text: "text-teal-700",
      ring: "ring-teal-200",
      solid: "bg-teal-600",
    },
  },
];

export const SUBJECT_MAP: Record<SubjectId, Subject> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s]),
) as Record<SubjectId, Subject>;

export function getSubject(id: SubjectId): Subject {
  return SUBJECT_MAP[id];
}

/**
 * Splits subjects into the two groups shown as tabs on /student and as two
 * labelled rows on the landing page's subjects section:
 * - "exam"     — subject knowledge actually tested on the NIS entrance exam.
 * - "language" — language practice (grammar, reading, vocabulary).
 */
export const SUBJECT_GROUPS: Record<SubjectGroupId, SubjectId[]> = {
  exam: ["math", "science"],
  language: ["english", "kazakh", "russian"],
};

export function subjectGroupOf(id: SubjectId): SubjectGroupId {
  return SUBJECT_GROUPS.exam.includes(id) ? "exam" : "language";
}
