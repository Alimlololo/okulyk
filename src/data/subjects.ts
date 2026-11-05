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
    color: "#8B5CF6",
    theme: {
      soft: "bg-grape-soft",
      text: "text-grape-ink",
      ring: "ring-grape/40",
      solid: "bg-grape",
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
    color: "#3D5AFE",
    theme: {
      soft: "bg-berry-soft",
      text: "text-berry-ink",
      ring: "ring-berry/40",
      solid: "bg-berry",
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
    color: "#22A565",
    theme: {
      soft: "bg-leaf-soft",
      text: "text-leaf-ink",
      ring: "ring-leaf/40",
      solid: "bg-leaf",
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
    color: "#F0508E",
    theme: {
      soft: "bg-bubble-soft",
      text: "text-bubble-ink",
      ring: "ring-bubble/40",
      solid: "bg-bubble",
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
    color: "#F2A20C",
    theme: {
      soft: "bg-butter-soft",
      text: "text-butter-ink",
      ring: "ring-butter/40",
      solid: "bg-butter",
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
