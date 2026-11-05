import type { SubjectId, Task } from "@/types";
import { lessonsBySubject } from "@/data/lessons";

const XP = 8;

/**
 * Practice items, grouped by lesson. Content is written in the style of NIS
 * (НИШ) entrance testing: logical reasoning in math, grammar + reading in
 * languages, general-knowledge in science.
 */
export const TASKS: Task[] = [
  /* ============================================================= */
  /* Математика — Логические задачи                                */
  /* ============================================================= */
  {
    id: "t-math-l1",
    lessonId: "les-math-logic",
    subjectId: "math",
    type: "single_choice",
    prompt:
      "На столе 5 яблок. Ты забрал 2. Сколько яблок у тебя?",
    options: [
      { id: "a", label: "3" },
      { id: "b", label: "2" },
      { id: "c", label: "5" },
      { id: "d", label: "7" },
    ],
    correctOptionId: "b",
    explanation:
      "Вопрос про то, сколько у тебя, а не сколько осталось на столе. Ты забрал 2 — значит, у тебя 2.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-math-l2",
    lessonId: "les-math-logic",
    subjectId: "math",
    type: "single_choice",
    prompt:
      "Айгуль старше Данияра, а Данияр старше Мади. Кто самый младший?",
    options: [
      { id: "a", label: "Айгуль" },
      { id: "b", label: "Данияр" },
      { id: "c", label: "Мади" },
      { id: "d", label: "Нельзя определить" },
    ],
    correctOptionId: "c",
    explanation:
      "Выстраиваем по возрасту: Айгуль > Данияр > Мади. Самый младший в цепочке — Мади.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-math-l3",
    lessonId: "les-math-logic",
    subjectId: "math",
    type: "text_input",
    prompt:
      "Продолжи закономерность: 2, 4, 8, 16, … Какое число следующее?",
    acceptedAnswers: ["32"],
    placeholder: "Введи число",
    explanation: "Каждое число удваивается: 16 × 2 = 32.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-math-l4",
    lessonId: "les-math-logic",
    subjectId: "math",
    type: "single_choice",
    prompt:
      "Сейчас 14:00. Какое время будет через 2 часа 30 минут?",
    options: [
      { id: "a", label: "16:00" },
      { id: "b", label: "16:30" },
      { id: "c", label: "17:00" },
      { id: "d", label: "15:30" },
    ],
    correctOptionId: "b",
    explanation: "14:00 + 2 часа = 16:00, плюс 30 минут = 16:30.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-math-l5",
    lessonId: "les-math-logic",
    subjectId: "math",
    type: "multi_choice",
    prompt:
      "Отметь все числа, которые делятся на 3 без остатка.",
    options: [
      { id: "a", label: "9" },
      { id: "b", label: "14" },
      { id: "c", label: "21" },
      { id: "d", label: "25" },
      { id: "e", label: "30" },
    ],
    correctOptionIds: ["a", "c", "e"],
    explanation:
      "Число делится на 3, если сумма его цифр делится на 3. 9, 21 (2+1=3) и 30 (3+0=3) подходят.",
    xp: XP,
    difficulty: "advanced",
  },
  {
    id: "t-math-l6",
    lessonId: "les-math-logic",
    subjectId: "math",
    type: "single_choice",
    prompt:
      "У Тимура в 2 раза больше машинок, чем у Алихана. Вместе у них 18 машинок. Сколько машинок у Тимура?",
    options: [
      { id: "a", label: "6" },
      { id: "b", label: "9" },
      { id: "c", label: "12" },
      { id: "d", label: "14" },
    ],
    correctOptionId: "c",
    explanation:
      "Пусть у Алихана x, у Тимура 2x. Тогда x + 2x = 18, 3x = 18, x = 6. У Тимура 2 × 6 = 12.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Математика — Дроби                                            */
  /* ============================================================= */
  {
    id: "t-math-f1",
    lessonId: "les-math-fractions",
    subjectId: "math",
    type: "single_choice",
    prompt: "Пиццу разрезали на 8 равных кусков. Съели 3. Какая часть пиццы съедена?",
    options: [
      { id: "a", label: "3/8" },
      { id: "b", label: "8/3" },
      { id: "c", label: "3/5" },
      { id: "d", label: "5/8" },
    ],
    correctOptionId: "a",
    explanation: "Всего частей 8, съели 3 из них — это 3/8.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-math-f2",
    lessonId: "les-math-fractions",
    subjectId: "math",
    type: "single_choice",
    prompt: "Что больше: 1/2 или 2/5?",
    options: [
      { id: "a", label: "1/2" },
      { id: "b", label: "2/5" },
      { id: "c", label: "Они равны" },
    ],
    correctOptionId: "a",
    explanation:
      "Приведём к общему знаменателю 10: 1/2 = 5/10, а 2/5 = 4/10. Значит 1/2 больше.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-math-f3",
    lessonId: "les-math-fractions",
    subjectId: "math",
    type: "text_input",
    prompt: "В классе 24 ученика. Треть из них уехали на олимпиаду. Сколько человек уехало?",
    acceptedAnswers: ["8", "8 человек", "восемь"],
    placeholder: "Число",
    explanation: "Треть — это разделить на 3: 24 ÷ 3 = 8.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-math-f4",
    lessonId: "les-math-fractions",
    subjectId: "math",
    type: "multi_choice",
    prompt: "Отметь все дроби, равные 1/2.",
    options: [
      { id: "a", label: "2/4" },
      { id: "b", label: "3/6" },
      { id: "c", label: "4/6" },
      { id: "d", label: "5/10" },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation: "2/4, 3/6 и 5/10 сокращаются до 1/2. А 4/6 = 2/3.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-math-f5",
    lessonId: "les-math-fractions",
    subjectId: "math",
    type: "matching",
    prompt: "Соедини дробь с её описанием.",
    pairs: [
      { left: "1/4", right: "одна четверть" },
      { left: "3/4", right: "три четверти" },
      { left: "1/1", right: "целое" },
    ],
    explanation:
      "Числитель показывает, сколько частей взяли, знаменатель — на сколько частей разделили целое.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Английский — Present Simple vs Continuous                      */
  /* ============================================================= */
  {
    id: "t-eng-g1",
    lessonId: "les-eng-grammar",
    subjectId: "english",
    type: "single_choice",
    prompt: "Choose the correct form: “Look! The baby ___ .”",
    options: [
      { id: "a", label: "sleeps" },
      { id: "b", label: "is sleeping" },
      { id: "c", label: "sleep" },
      { id: "d", label: "sleeping" },
    ],
    correctOptionId: "b",
    explanation:
      "«Look!» signals something happening right now, so we use Present Continuous: is sleeping.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-eng-g2",
    lessonId: "les-eng-grammar",
    subjectId: "english",
    type: "single_choice",
    prompt: "Choose the correct form: “She ___ to school every day.”",
    options: [
      { id: "a", label: "is going" },
      { id: "b", label: "go" },
      { id: "c", label: "goes" },
      { id: "d", label: "going" },
    ],
    correctOptionId: "c",
    explanation:
      "«every day» = a routine, so Present Simple. Third person singular adds -s: goes.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-eng-g3",
    lessonId: "les-eng-grammar",
    subjectId: "english",
    type: "text_input",
    prompt:
      "Complete with the correct form of “to write”: “Right now I ___ a letter to my grandma.” (two words)",
    acceptedAnswers: ["am writing", "i am writing", "am writing a letter"],
    placeholder: "Type two words",
    explanation: "«Right now» -> Present Continuous: I am writing.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-eng-g4",
    lessonId: "les-eng-grammar",
    subjectId: "english",
    type: "multi_choice",
    prompt: "Which time markers usually go with Present Continuous? Select all.",
    options: [
      { id: "a", label: "now" },
      { id: "b", label: "at the moment" },
      { id: "c", label: "every morning" },
      { id: "d", label: "Look!" },
      { id: "e", label: "usually" },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation:
      "now / at the moment / Look! point to this exact moment. «every morning» and «usually» are Present Simple.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-eng-g5",
    lessonId: "les-eng-grammar",
    subjectId: "english",
    type: "single_choice",
    prompt: "Find the sentence with a mistake.",
    options: [
      { id: "a", label: "They are playing football now." },
      { id: "b", label: "He watches TV every evening." },
      { id: "c", label: "I am liking this song." },
      { id: "d", label: "We are studying for the exam this week." },
    ],
    correctOptionId: "c",
    explanation:
      "«like» is a state verb — it isn’t used in the continuous. Correct: “I like this song.”",
    xp: XP,
    difficulty: "advanced",
  },
  {
    id: "t-eng-g6",
    lessonId: "les-eng-grammar",
    subjectId: "english",
    type: "matching",
    prompt: "Match the sentence to the tense.",
    pairs: [
      { left: "Water boils at 100°C.", right: "Present Simple" },
      { left: "The kettle is boiling now.", right: "Present Continuous" },
      { left: "I brush my teeth twice a day.", right: "Present Simple" },
    ],
    explanation:
      "Facts and routines -> Present Simple. Actions happening at the moment of speaking -> Present Continuous.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Английский — Reading                                          */
  /* ============================================================= */
  {
    id: "t-eng-r1",
    lessonId: "les-eng-reading",
    subjectId: "english",
    type: "single_choice",
    prompt:
      "Read: “Amir wakes up at 7 a.m. He has breakfast with his sister, then they walk to school together. Their favourite lesson is science.” — What is the text mainly about?",
    options: [
      { id: "a", label: "Amir’s morning routine" },
      { id: "b", label: "A science experiment" },
      { id: "c", label: "Amir’s summer holiday" },
      { id: "d", label: "How to cook breakfast" },
    ],
    correctOptionId: "a",
    explanation:
      "Every sentence describes what Amir does in the morning — that’s the main idea.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-eng-r2",
    lessonId: "les-eng-reading",
    subjectId: "english",
    type: "single_choice",
    prompt: "From the same text: Who does Amir walk to school with?",
    options: [
      { id: "a", label: "His friend" },
      { id: "b", label: "His sister" },
      { id: "c", label: "His teacher" },
      { id: "d", label: "Alone" },
    ],
    correctOptionId: "b",
    explanation: "“they walk to school together” refers to Amir and his sister.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-eng-r3",
    lessonId: "les-eng-reading",
    subjectId: "english",
    type: "text_input",
    prompt: "From the text: What time does Amir wake up? Write the time.",
    acceptedAnswers: ["7 a.m.", "7am", "7 am", "seven", "7", "at 7 a.m."],
    placeholder: "e.g. 8 a.m.",
    explanation: "The first sentence states: “Amir wakes up at 7 a.m.”",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-eng-r4",
    lessonId: "les-eng-reading",
    subjectId: "english",
    type: "single_choice",
    prompt: "In the text, the word “favourite” is closest in meaning to…",
    options: [
      { id: "a", label: "most difficult" },
      { id: "b", label: "least liked" },
      { id: "c", label: "most liked" },
      { id: "d", label: "longest" },
    ],
    correctOptionId: "c",
    explanation: "“favourite” means the one you like the most.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-eng-r5",
    lessonId: "les-eng-reading",
    subjectId: "english",
    type: "single_choice",
    prompt: "Which statement is TRUE according to the text?",
    options: [
      { id: "a", label: "Amir has breakfast alone." },
      { id: "b", label: "Amir likes science lessons." },
      { id: "c", label: "Amir goes to school by bus." },
      { id: "d", label: "Amir wakes up at 8 a.m." },
    ],
    correctOptionId: "b",
    explanation: "“Their favourite lesson is science” — so Amir likes science.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Қазақ тілі — Сөз таптары                                      */
  /* ============================================================= */
  {
    id: "t-kaz-v1",
    lessonId: "les-kaz-vocab",
    subjectId: "kazakh",
    type: "single_choice",
    prompt: "Қай сөз — зат есім?",
    options: [
      { id: "a", label: "жүгіру" },
      { id: "b", label: "кітап" },
      { id: "c", label: "әдемі" },
      { id: "d", label: "жылдам" },
    ],
    correctOptionId: "b",
    explanation:
      "Зат есім «кім? не?» деген сұраққа жауап береді. «Кітап» — не? — зат есім.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-kaz-v2",
    lessonId: "les-kaz-vocab",
    subjectId: "kazakh",
    type: "single_choice",
    prompt: "«Қызыл алма» тіркесіндегі сын есімді тап.",
    options: [
      { id: "a", label: "қызыл" },
      { id: "b", label: "алма" },
      { id: "c", label: "екеуі де" },
      { id: "d", label: "ешқайсысы" },
    ],
    correctOptionId: "a",
    explanation: "Сын есім заттың сынын білдіреді: «қандай? — қызыл».",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-kaz-v3",
    lessonId: "les-kaz-vocab",
    subjectId: "kazakh",
    type: "text_input",
    prompt: "«Дәптер» сөзіне сұрақ қой (бір сөз).",
    acceptedAnswers: ["не", "не?"],
    placeholder: "Сұрақ",
    explanation: "«Дәптер» — жансыз зат, сондықтан «не?» деген сұрақ қойылады.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-kaz-v4",
    lessonId: "les-kaz-vocab",
    subjectId: "kazakh",
    type: "multi_choice",
    prompt: "Сын есімдерді белгіле.",
    options: [
      { id: "a", label: "биік" },
      { id: "b", label: "терезе" },
      { id: "c", label: "жасыл" },
      { id: "d", label: "оқушы" },
      { id: "e", label: "тәтті" },
    ],
    correctOptionIds: ["a", "c", "e"],
    explanation: "«биік», «жасыл», «тәтті» — заттың сынын білдіреді.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-kaz-v5",
    lessonId: "les-kaz-vocab",
    subjectId: "kazakh",
    type: "matching",
    prompt: "Сөзді сөз табымен сәйкестендір.",
    pairs: [
      { left: "мектеп", right: "зат есім" },
      { left: "әдемі", right: "сын есім" },
      { left: "оқиды", right: "етістік" },
    ],
    explanation:
      "Зат есім — не/кім, сын есім — қандай, етістік — не істейді деген сұраққа жауап береді.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Қазақ тілі — Мәтінмен жұмыс                                   */
  /* ============================================================= */
  {
    id: "t-kaz-r1",
    lessonId: "les-kaz-reading",
    subjectId: "kazakh",
    type: "single_choice",
    prompt:
      "Мәтін: «Күз келді. Ағаштардың жапырақтары сарғайып, жерге түсе бастады. Құстар жылы жаққа ұшып кетті.» — Мәтіннің негізгі ойы қандай?",
    options: [
      { id: "a", label: "Жаз туралы" },
      { id: "b", label: "Күздің белгілері туралы" },
      { id: "c", label: "Құстардың ұясы туралы" },
      { id: "d", label: "Қыстың суығы туралы" },
    ],
    correctOptionId: "b",
    explanation: "Барлық сөйлем күздің белгілерін сипаттайды.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-kaz-r2",
    lessonId: "les-kaz-reading",
    subjectId: "kazakh",
    type: "single_choice",
    prompt: "Сол мәтін бойынша: жапырақтар не болды?",
    options: [
      { id: "a", label: "Жасарды" },
      { id: "b", label: "Сарғайып түсті" },
      { id: "c", label: "Өспей қалды" },
      { id: "d", label: "Қызарды" },
    ],
    correctOptionId: "b",
    explanation: "«жапырақтары сарғайып, жерге түсе бастады» деп жазылған.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-kaz-r3",
    lessonId: "les-kaz-reading",
    subjectId: "kazakh",
    type: "text_input",
    prompt: "Құстар қайда ұшып кетті? (екі сөз)",
    acceptedAnswers: ["жылы жаққа", "жылы жакка"],
    placeholder: "Жауап",
    explanation: "«Құстар жылы жаққа ұшып кетті.»",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-kaz-r4",
    lessonId: "les-kaz-reading",
    subjectId: "kazakh",
    type: "single_choice",
    prompt: "Мәтінге қандай тақырып қоюға болады?",
    options: [
      { id: "a", label: "Көктем" },
      { id: "b", label: "Күз" },
      { id: "c", label: "Демалыс" },
      { id: "d", label: "Мектеп" },
    ],
    correctOptionId: "b",
    explanation: "Мәтін толығымен күз мезгілі туралы.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-kaz-r5",
    lessonId: "les-kaz-reading",
    subjectId: "kazakh",
    type: "single_choice",
    prompt: "«Сарғайып» сөзінің мағынасына жақыны:",
    options: [
      { id: "a", label: "жасыл болып" },
      { id: "b", label: "сары түске еніп" },
      { id: "c", label: "үлкейіп" },
      { id: "d", label: "қатып" },
    ],
    correctOptionId: "b",
    explanation: "«Сарғаю» — сары түске ену деген мағынаны білдіреді.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Русский язык — Безударные гласные                             */
  /* ============================================================= */
  {
    id: "t-rus-s1",
    lessonId: "les-rus-spelling",
    subjectId: "russian",
    type: "single_choice",
    prompt: "Вставь букву: тр__ва",
    options: [
      { id: "a", label: "а" },
      { id: "b", label: "о" },
      { id: "c", label: "ы" },
      { id: "d", label: "и" },
    ],
    correctOptionId: "a",
    explanation: "Проверочное слово — «травы»: под ударением слышится «а».",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-rus-s2",
    lessonId: "les-rus-spelling",
    subjectId: "russian",
    type: "text_input",
    prompt: "Подбери проверочное слово к слову «в__да» (вода). Запиши проверочное слово.",
    acceptedAnswers: ["воды", "водный", "вОды"],
    placeholder: "Проверочное слово",
    explanation: "«Воды» — ударение падает на «о», значит пишем «вода».",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-rus-s3",
    lessonId: "les-rus-spelling",
    subjectId: "russian",
    type: "multi_choice",
    prompt: "Отметь слова, где пропущена буква «о».",
    options: [
      { id: "a", label: "г__ра (горы)" },
      { id: "b", label: "р__ка (реки)" },
      { id: "c", label: "н__га (ноги)" },
      { id: "d", label: "з__ма (зимы)" },
    ],
    correctOptionIds: ["a", "c"],
    explanation:
      "«Горы» и «ноги» — под ударением «о». А в «река» и «зима» — «е» и «и».",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-rus-s4",
    lessonId: "les-rus-spelling",
    subjectId: "russian",
    type: "single_choice",
    prompt: "В каком слове нельзя проверить безударную гласную (словарное слово)?",
    options: [
      { id: "a", label: "лесной" },
      { id: "b", label: "собака" },
      { id: "c", label: "грибной" },
      { id: "d", label: "морской" },
    ],
    correctOptionId: "b",
    explanation:
      "«Собака» — словарное слово, проверочного не подобрать, написание надо запомнить.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-rus-s5",
    lessonId: "les-rus-spelling",
    subjectId: "russian",
    type: "single_choice",
    prompt: "Найди слово с ошибкой.",
    options: [
      { id: "a", label: "стена" },
      { id: "b", label: "сасна" },
      { id: "c", label: "зерно" },
      { id: "d", label: "гнездо" },
    ],
    correctOptionId: "b",
    explanation: "Правильно «сосна» (проверочное — «сосны»).",
    xp: XP,
    difficulty: "advanced",
  },
  {
    id: "t-rus-s6",
    lessonId: "les-rus-spelling",
    subjectId: "russian",
    type: "matching",
    prompt: "Соедини слово с проверочным.",
    pairs: [
      { left: "гроза", right: "грозы" },
      { left: "стрела", right: "стрелы" },
      { left: "число", right: "числа" },
    ],
    explanation:
      "Проверочное слово — то, где безударная гласная становится ударной.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Русский язык — Понимание текста                               */
  /* ============================================================= */
  {
    id: "t-rus-r1",
    lessonId: "les-rus-reading",
    subjectId: "russian",
    type: "single_choice",
    prompt:
      "Текст: «Муравьи — трудолюбивые насекомые. Они вместе строят муравейник, носят еду и защищают своё жилище. Один муравей может поднять груз тяжелее себя в 20 раз.» — Какова главная мысль текста?",
    options: [
      { id: "a", label: "Муравьи живут в лесу" },
      { id: "b", label: "Муравьи — сильные и трудолюбивые" },
      { id: "c", label: "Муравьи боятся людей" },
      { id: "d", label: "Муравейник строится за один день" },
    ],
    correctOptionId: "b",
    explanation:
      "Текст подчёркивает трудолюбие и силу муравьёв — это и есть главная мысль.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-rus-r2",
    lessonId: "les-rus-reading",
    subjectId: "russian",
    type: "text_input",
    prompt: "Во сколько раз тяжелее себя муравей может поднять груз? Запиши число.",
    acceptedAnswers: ["20", "в 20 раз", "20 раз"],
    placeholder: "Число",
    explanation: "В тексте сказано: «тяжелее себя в 20 раз».",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-rus-r3",
    lessonId: "les-rus-reading",
    subjectId: "russian",
    type: "single_choice",
    prompt: "Что НЕ делают муравьи по тексту?",
    options: [
      { id: "a", label: "Строят муравейник" },
      { id: "b", label: "Носят еду" },
      { id: "c", label: "Защищают жилище" },
      { id: "d", label: "Спят всю зиму по одному" },
    ],
    correctOptionId: "d",
    explanation: "О зимней спячке по одному в тексте ничего не сказано.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-rus-r4",
    lessonId: "les-rus-reading",
    subjectId: "russian",
    type: "single_choice",
    prompt: "Тема текста — это…",
    options: [
      { id: "a", label: "О чём говорится в тексте (муравьи)" },
      { id: "b", label: "Чему учит текст" },
      { id: "c", label: "Сколько предложений в тексте" },
      { id: "d", label: "Кто написал текст" },
    ],
    correctOptionId: "a",
    explanation:
      "Тема — это то, о чём текст. Главная мысль — то, что автор хотел сказать.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-rus-r5",
    lessonId: "les-rus-reading",
    subjectId: "russian",
    type: "single_choice",
    prompt: "Какое слово в тексте помогает понять главную мысль?",
    options: [
      { id: "a", label: "насекомые" },
      { id: "b", label: "трудолюбивые" },
      { id: "c", label: "жилище" },
      { id: "d", label: "груз" },
    ],
    correctOptionId: "b",
    explanation: "«Трудолюбивые» прямо указывает на главную характеристику муравьёв.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Естествознание — Живая природа                                */
  /* ============================================================= */
  {
    id: "t-sci-n1",
    lessonId: "les-sci-nature",
    subjectId: "science",
    type: "single_choice",
    prompt: "Что из перечисленного относится к живой природе?",
    options: [
      { id: "a", label: "Камень" },
      { id: "b", label: "Облако" },
      { id: "c", label: "Берёза" },
      { id: "d", label: "Река" },
    ],
    correctOptionId: "c",
    explanation:
      "Живое дышит, питается, растёт и размножается. Берёза — растение, значит живая природа.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-sci-n2",
    lessonId: "les-sci-nature",
    subjectId: "science",
    type: "multi_choice",
    prompt: "Выбери все признаки живого организма.",
    options: [
      { id: "a", label: "Питается" },
      { id: "b", label: "Растёт" },
      { id: "c", label: "Никогда не меняется" },
      { id: "d", label: "Дышит" },
      { id: "e", label: "Размножается" },
    ],
    correctOptionIds: ["a", "b", "d", "e"],
    explanation: "Живое питается, дышит, растёт и размножается.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-sci-n3",
    lessonId: "les-sci-nature",
    subjectId: "science",
    type: "single_choice",
    prompt:
      "Пищевая цепочка: трава → заяц → ? Кто может быть последним?",
    options: [
      { id: "a", label: "Волк" },
      { id: "b", label: "Ромашка" },
      { id: "c", label: "Гриб" },
      { id: "d", label: "Камень" },
    ],
    correctOptionId: "a",
    explanation: "Заяц — травоядный, им питается хищник. Волк подходит.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-sci-n4",
    lessonId: "les-sci-nature",
    subjectId: "science",
    type: "text_input",
    prompt:
      "Без какого небесного тела на Земле не было бы света и тепла для растений? (одно слово)",
    acceptedAnswers: ["солнце", "солнца"],
    placeholder: "Слово",
    explanation:
      "Солнце даёт свет и тепло, без него растения не смогли бы питаться.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-sci-n5",
    lessonId: "les-sci-nature",
    subjectId: "science",
    type: "matching",
    prompt: "Соедини живой организм с группой.",
    pairs: [
      { left: "Дуб", right: "Растения" },
      { left: "Орёл", right: "Птицы" },
      { left: "Щука", right: "Рыбы" },
    ],
    explanation: "Организмы объединяют в группы по общим признакам.",
    xp: XP,
    difficulty: "advanced",
  },

  /* ============================================================= */
  /* Естествознание — Организм человека                            */
  /* ============================================================= */
  {
    id: "t-sci-b1",
    lessonId: "les-sci-body",
    subjectId: "science",
    type: "single_choice",
    prompt: "Какой орган перекачивает кровь по телу?",
    options: [
      { id: "a", label: "Лёгкие" },
      { id: "b", label: "Сердце" },
      { id: "c", label: "Желудок" },
      { id: "d", label: "Печень" },
    ],
    correctOptionId: "b",
    explanation: "Сердце работает как насос и гонит кровь по сосудам.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-sci-b2",
    lessonId: "les-sci-body",
    subjectId: "science",
    type: "single_choice",
    prompt: "Для чего нужны лёгкие?",
    options: [
      { id: "a", label: "Переваривать пищу" },
      { id: "b", label: "Думать" },
      { id: "c", label: "Дышать — получать кислород" },
      { id: "d", label: "Двигать руками" },
    ],
    correctOptionId: "c",
    explanation:
      "В лёгких кровь получает кислород из воздуха и отдаёт углекислый газ.",
    xp: XP,
    difficulty: "beginner",
  },
  {
    id: "t-sci-b3",
    lessonId: "les-sci-body",
    subjectId: "science",
    type: "multi_choice",
    prompt: "Что помогает сохранить здоровье? Выбери всё верное.",
    options: [
      { id: "a", label: "Зарядка по утрам" },
      { id: "b", label: "Есть много сладкого весь день" },
      { id: "c", label: "Сон 9–10 часов" },
      { id: "d", label: "Мыть руки перед едой" },
    ],
    correctOptionIds: ["a", "c", "d"],
    explanation: "Движение, сон и гигиена укрепляют здоровье, избыток сахара — нет.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-sci-b4",
    lessonId: "les-sci-body",
    subjectId: "science",
    type: "text_input",
    prompt: "Как называется опора тела, состоящая из костей? (одно слово)",
    acceptedAnswers: ["скелет"],
    placeholder: "Слово",
    explanation: "Скелет — каркас тела, он защищает органы и держит форму.",
    xp: XP,
    difficulty: "core",
  },
  {
    id: "t-sci-b5",
    lessonId: "les-sci-body",
    subjectId: "science",
    type: "matching",
    prompt: "Соедини орган с его работой.",
    pairs: [
      { left: "Желудок", right: "Переваривает пищу" },
      { left: "Мозг", right: "Управляет телом" },
      { left: "Кожа", right: "Защищает тело" },
    ],
    explanation: "Каждый орган выполняет свою задачу, а вместе они — системы органов.",
    xp: XP,
    difficulty: "advanced",
  },
];

export const TASK_MAP: Record<string, Task> = Object.fromEntries(
  TASKS.map((t) => [t.id, t]),
);

export function getTask(id: string): Task | undefined {
  return TASK_MAP[id];
}

export function tasksForLesson(lessonId: string): Task[] {
  return TASKS.filter((t) => t.lessonId === lessonId);
}

/** All practice tasks across every lesson of a subject, lesson order preserved. */
export function tasksForSubject(subjectId: SubjectId): Task[] {
  return lessonsBySubject(subjectId).flatMap((l) => tasksForLesson(l.id));
}

/**
 * Exactly `count` tasks for a subject, used to honour the parent/onboarding
 * daily-load setting. Cycles back through the subject's task bank when the
 * requested count exceeds what's available — this is a mock-data limitation
 * (TODO: back by a larger real content bank instead of repeating tasks).
 */
export function tasksForSubjectCount(
  subjectId: SubjectId,
  count: number,
  level?: import("@/types").StartLevel,
): Task[] {
  const pool = tasksForSubject(subjectId);
  if (pool.length === 0 || count <= 0) return [];
  // When the diagnostic has placed the student on a level, lead with tasks
  // tagged at that difficulty so the practice set actually feels harder/
  // easier — then fill the rest from the remaining pool if more are needed.
  const ordered = level
    ? [
        ...pool.filter((t) => (t.difficulty ?? "core") === level),
        ...pool.filter((t) => (t.difficulty ?? "core") !== level),
      ]
    : pool;
  return Array.from({ length: count }, (_, i) => ordered[i % ordered.length]);
}
