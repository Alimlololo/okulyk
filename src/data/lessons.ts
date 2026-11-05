import type { Lesson } from "@/types";

/**
 * Two lessons per subject. `topic` values line up with weak-topic tags so the
 * parent dashboard can deep-link "needs attention: Математика — дроби".
 */
export const LESSONS: Lesson[] = [
  // ---------------- Математика ----------------
  {
    id: "les-math-logic",
    subjectId: "math",
    title: "Логические задачи: рассуждаем по шагам",
    summary:
      "Учимся вытаскивать условие из текста, строить цепочку рассуждений и проверять ответ — как в квалификационном тесте НИШ.",
    topic: "Логические задачи",
    grade: 5,
    order: 1,
    durationMin: 9,
    videoPreviewLabel: "Разбор 3 задач на логику",
    taskIds: [
      "t-math-l1", "t-math-l2", "t-math-l3", "t-math-l4", "t-math-l5", "t-math-l6",
    ],
    xpReward: 40,
  },
  {
    id: "les-math-fractions",
    subjectId: "math",
    title: "Дроби: доли, сравнение и часть от числа",
    summary:
      "Что такое доля, как сравнивать дроби с разными знаменателями и находить часть от числа в текстовых задачах.",
    topic: "Дроби",
    grade: 5,
    order: 2,
    durationMin: 11,
    videoPreviewLabel: "Дроби на пицце и линейке",
    taskIds: ["t-math-f1", "t-math-f2", "t-math-f3", "t-math-f4", "t-math-f5"],
    xpReward: 40,
  },

  // ---------------- Английский ----------------
  {
    id: "les-eng-grammar",
    subjectId: "english",
    title: "Present Simple vs Present Continuous",
    summary:
      "Когда действие происходит вообще, а когда прямо сейчас. Маркеры времени и типичные ошибки на экзамене.",
    topic: "Present Continuous",
    grade: 6,
    order: 1,
    durationMin: 8,
    videoPreviewLabel: "Grammar: два настоящих времени",
    taskIds: ["t-eng-g1", "t-eng-g2", "t-eng-g3", "t-eng-g4", "t-eng-g5", "t-eng-g6"],
    xpReward: 40,
  },
  {
    id: "les-eng-reading",
    subjectId: "english",
    title: "Reading: понимаем текст и находим детали",
    summary:
      "Стратегия чтения короткого текста: главная мысль, поиск конкретного факта, значение слова по контексту.",
    topic: "Reading comprehension",
    grade: 6,
    order: 2,
    durationMin: 10,
    videoPreviewLabel: "Reading: текст про школьный день",
    taskIds: ["t-eng-r1", "t-eng-r2", "t-eng-r3", "t-eng-r4", "t-eng-r5"],
    xpReward: 40,
  },

  // ---------------- Қазақ тілі ----------------
  {
    id: "les-kaz-vocab",
    subjectId: "kazakh",
    title: "Сөз таптары: зат есім мен сын есім",
    summary:
      "Зат есім мен сын есімді ажырату, сұрақ қою және сөйлемде табу. НИШ тестіндегі жиі кездесетін тапсырма.",
    topic: "Сөз таптары",
    grade: 5,
    order: 1,
    durationMin: 9,
    videoPreviewLabel: "Сөз таптары: мысалдармен",
    taskIds: ["t-kaz-v1", "t-kaz-v2", "t-kaz-v3", "t-kaz-v4", "t-kaz-v5"],
    xpReward: 40,
  },
  {
    id: "les-kaz-reading",
    subjectId: "kazakh",
    title: "Мәтінді түсіну: негізгі ой",
    summary:
      "Шағын мәтінді оқып, негізгі ойды, кейіпкерлерді және деталь­дерді табу.",
    topic: "Мәтінмен жұмыс",
    grade: 5,
    order: 2,
    durationMin: 10,
    videoPreviewLabel: "Мәтін: Абайдың балалық шағы",
    taskIds: ["t-kaz-r1", "t-kaz-r2", "t-kaz-r3", "t-kaz-r4", "t-kaz-r5"],
    xpReward: 40,
  },

  // ---------------- Русский язык ----------------
  {
    id: "les-rus-spelling",
    subjectId: "russian",
    title: "Безударные гласные в корне слова",
    summary:
      "Как проверять безударную гласную подбором проверочного слова и что делать со словарными словами.",
    topic: "Безударные гласные",
    grade: 5,
    order: 1,
    durationMin: 8,
    videoPreviewLabel: "Орфография: проверяем корень",
    taskIds: ["t-rus-s1", "t-rus-s2", "t-rus-s3", "t-rus-s4", "t-rus-s5", "t-rus-s6"],
    xpReward: 40,
  },
  {
    id: "les-rus-reading",
    subjectId: "russian",
    title: "Работа с текстом: тема и главная мысль",
    summary:
      "Отличаем тему от главной мысли, находим ключевые слова и отвечаем на вопросы по содержанию.",
    topic: "Понимание текста",
    grade: 5,
    order: 2,
    durationMin: 10,
    videoPreviewLabel: "Текст: как муравьи строят дом",
    taskIds: ["t-rus-r1", "t-rus-r2", "t-rus-r3", "t-rus-r4", "t-rus-r5"],
    xpReward: 40,
  },

  // ---------------- Естествознание ----------------
  {
    id: "les-sci-nature",
    subjectId: "science",
    title: "Живая и неживая природа",
    summary:
      "Признаки живого, отличия растений и животных, простые пищевые цепочки и роль солнца.",
    topic: "Живая природа",
    grade: 4,
    order: 1,
    durationMin: 9,
    videoPreviewLabel: "Природа вокруг нас",
    taskIds: ["t-sci-n1", "t-sci-n2", "t-sci-n3", "t-sci-n4", "t-sci-n5"],
    xpReward: 40,
  },
  {
    id: "les-sci-body",
    subjectId: "science",
    title: "Организм человека: органы и их работа",
    summary:
      "Основные системы органов, зачем нужны лёгкие, сердце и скелет, простые правила здоровья.",
    topic: "Организм человека",
    grade: 4,
    order: 2,
    durationMin: 10,
    videoPreviewLabel: "Как работает наше тело",
    taskIds: ["t-sci-b1", "t-sci-b2", "t-sci-b3", "t-sci-b4", "t-sci-b5"],
    xpReward: 40,
  },
];

export const LESSON_MAP: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.id, l]),
);

export function getLesson(id: string): Lesson | undefined {
  return LESSON_MAP[id];
}

export function lessonsBySubject(subjectId: string): Lesson[] {
  return LESSONS.filter((l) => l.subjectId === subjectId).sort(
    (a, b) => a.order - b.order,
  );
}
