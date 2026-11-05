import type { DiagnosticQuestion, DiagnosticResult, SubjectId } from "@/types";

/**
 * Full diagnostic question bank — replaces the old 2-question-per-subject
 * placement test. ~10 questions per subject spanning beginner/core/advanced
 * difficulty, tagged with topic + grade so a real scheduler could later pull
 * grade-appropriate subsets. This is a genuine (5x) expansion over the old
 * bank but short of the "15-20 per subject" target — see the project-wide
 * summary for why that was scoped down.
 */
export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  /* ================================ Математика ================================ */
  {
    id: "dg-math-1", subjectId: "math", grade: 3, topic: "Счёт", difficulty: "beginner",
    prompt: "Продолжи ряд: 3, 6, 9, 12, …",
    options: [{ id: "a", label: "13" }, { id: "b", label: "15" }, { id: "c", label: "16" }, { id: "d", label: "18" }],
    correctOptionId: "b",
    explanation: "Каждое следующее число больше предыдущего на 3: 12 + 3 = 15.",
  },
  {
    id: "dg-math-2", subjectId: "math", grade: 3, topic: "Арифметика", difficulty: "beginner",
    prompt: "У Алии 12 конфет. Она отдала половину брату. Сколько осталось у Алии?",
    options: [{ id: "a", label: "4" }, { id: "b", label: "6" }, { id: "c", label: "8" }, { id: "d", label: "12" }],
    correctOptionId: "b",
    explanation: "Половина от 12 — это 6, значит у Алии осталось 6 конфет.",
  },
  {
    id: "dg-math-3", subjectId: "math", grade: 4, topic: "Геометрия", difficulty: "beginner",
    prompt: "Сколько сторон у прямоугольника?",
    options: [{ id: "a", label: "3" }, { id: "b", label: "4" }, { id: "c", label: "5" }, { id: "d", label: "6" }],
    correctOptionId: "b",
    explanation: "У прямоугольника, как и у любого четырёхугольника, 4 стороны.",
  },
  {
    id: "dg-math-4", subjectId: "math", grade: 4, topic: "Логика", difficulty: "core",
    prompt: "Если сегодня среда, какой день будет через 9 дней?",
    options: [{ id: "a", label: "Четверг" }, { id: "b", label: "Пятница" }, { id: "c", label: "Суббота" }, { id: "d", label: "Воскресенье" }],
    correctOptionId: "b",
    explanation: "9 дней — это неделя (7) плюс ещё 2 дня: среда → пятница.",
  },
  {
    id: "dg-math-5", subjectId: "math", grade: 5, topic: "Дроби", difficulty: "core",
    prompt: "Какая дробь больше: 2/3 или 3/5?",
    options: [{ id: "a", label: "2/3" }, { id: "b", label: "3/5" }, { id: "c", label: "Равны" }],
    correctOptionId: "a",
    explanation: "Приведём к знаменателю 15: 2/3 = 10/15, 3/5 = 9/15. 10/15 больше.",
  },
  {
    id: "dg-math-6", subjectId: "math", grade: 5, topic: "Проценты", difficulty: "core",
    prompt: "Сколько будет 20% от 150?",
    options: [{ id: "a", label: "20" }, { id: "b", label: "25" }, { id: "c", label: "30" }, { id: "d", label: "35" }],
    correctOptionId: "c",
    explanation: "20% = 0,2. 150 × 0,2 = 30.",
  },
  {
    id: "dg-math-7", subjectId: "math", grade: 6, topic: "Уравнения", difficulty: "advanced",
    prompt: "Реши уравнение: 3x + 7 = 22. Чему равен x?",
    options: [{ id: "a", label: "3" }, { id: "b", label: "5" }, { id: "c", label: "7" }, { id: "d", label: "15" }],
    correctOptionId: "b",
    explanation: "3x = 22 − 7 = 15, значит x = 15 ÷ 3 = 5.",
  },
  {
    id: "dg-math-8", subjectId: "math", grade: 6, topic: "Логика", difficulty: "advanced",
    prompt: "Поезд едет со скоростью 60 км/ч. Сколько километров он проедет за 2,5 часа?",
    options: [{ id: "a", label: "120" }, { id: "b", label: "130" }, { id: "c", label: "150" }, { id: "d", label: "160" }],
    correctOptionId: "c",
    explanation: "Расстояние = скорость × время = 60 × 2,5 = 150 км.",
  },
  {
    id: "dg-math-9", subjectId: "math", grade: 7, topic: "Геометрия", difficulty: "advanced",
    prompt: "Периметр квадрата равен 36 см. Чему равна его площадь?",
    options: [{ id: "a", label: "36 см²" }, { id: "b", label: "64 см²" }, { id: "c", label: "81 см²" }, { id: "d", label: "100 см²" }],
    correctOptionId: "c",
    explanation: "Сторона = 36 ÷ 4 = 9 см. Площадь = 9 × 9 = 81 см².",
  },
  {
    id: "dg-math-10", subjectId: "math", grade: 7, topic: "Логика", difficulty: "advanced",
    prompt: "Возраст отца в 3 раза больше возраста сына. Через 5 лет отец будет старше сына на 30 лет. Сколько лет сейчас сыну?",
    options: [{ id: "a", label: "10" }, { id: "b", label: "15" }, { id: "c", label: "20" }, { id: "d", label: "25" }],
    correctOptionId: "b",
    explanation: "Разница в возрасте не меняется со временем — 30 лет. Если сын = x, отец = 3x, то 3x − x = 30, x = 15.",
  },

  /* ================================ Английский ================================ */
  {
    id: "dg-eng-1", subjectId: "english", grade: 3, topic: "Grammar", difficulty: "beginner",
    prompt: "Choose the correct word: “There ___ two cats on the sofa.”",
    options: [{ id: "a", label: "is" }, { id: "b", label: "are" }, { id: "c", label: "am" }, { id: "d", label: "be" }],
    correctOptionId: "b",
    explanation: "“Two cats” is plural, so we use “are”.",
  },
  {
    id: "dg-eng-2", subjectId: "english", grade: 3, topic: "Vocabulary", difficulty: "beginner",
    prompt: "What is the opposite of “big”?",
    options: [{ id: "a", label: "tall" }, { id: "b", label: "small" }, { id: "c", label: "long" }, { id: "d", label: "fast" }],
    correctOptionId: "b",
    explanation: "“Small” is the opposite of “big”.",
  },
  {
    id: "dg-eng-3", subjectId: "english", grade: 4, topic: "Grammar", difficulty: "beginner",
    prompt: "Choose the correct form: “My sister ___ her homework every evening.”",
    options: [{ id: "a", label: "do" }, { id: "b", label: "does" }, { id: "c", label: "doing" }, { id: "d", label: "did" }],
    correctOptionId: "b",
    explanation: "Third person singular (“she”) + Present Simple takes -s/-es: does.",
  },
  {
    id: "dg-eng-4", subjectId: "english", grade: 4, topic: "Reading", difficulty: "core",
    prompt: "Read: “Tom has a red bike. He rides it to school every day.” What colour is Tom's bike?",
    options: [{ id: "a", label: "Blue" }, { id: "b", label: "Red" }, { id: "c", label: "Green" }, { id: "d", label: "The text doesn't say" }],
    correctOptionId: "b",
    explanation: "The text says “a red bike”.",
  },
  {
    id: "dg-eng-5", subjectId: "english", grade: 5, topic: "Grammar", difficulty: "core",
    prompt: "Choose the correct form: “They ___ to the cinema tomorrow.”",
    options: [{ id: "a", label: "go" }, { id: "b", label: "goes" }, { id: "c", label: "are going" }, { id: "d", label: "went" }],
    correctOptionId: "c",
    explanation: "“Tomorrow” points to the future — “are going” (planned action).",
  },
  {
    id: "dg-eng-6", subjectId: "english", grade: 5, topic: "Vocabulary", difficulty: "core",
    prompt: "Which word means the same as “difficult”?",
    options: [{ id: "a", label: "easy" }, { id: "b", label: "hard" }, { id: "c", label: "simple" }, { id: "d", label: "quick" }],
    correctOptionId: "b",
    explanation: "“Hard” is a synonym of “difficult”.",
  },
  {
    id: "dg-eng-7", subjectId: "english", grade: 6, topic: "Grammar", difficulty: "advanced",
    prompt: "Choose the correct sentence.",
    options: [
      { id: "a", label: "She have lived here for five years." },
      { id: "b", label: "She has lived here for five years." },
      { id: "c", label: "She is living here for five years." },
      { id: "d", label: "She lives here since five years." },
    ],
    correctOptionId: "b",
    explanation: "Present Perfect (“has lived”) is correct with “for + a period of time”.",
  },
  {
    id: "dg-eng-8", subjectId: "english", grade: 6, topic: "Reading", difficulty: "advanced",
    prompt: "Read: “Although it was raining, the children continued playing outside.” Why did the children keep playing?",
    options: [
      { id: "a", label: "Because it stopped raining" },
      { id: "b", label: "Despite the rain" },
      { id: "c", label: "Because their parents told them to" },
      { id: "d", label: "The text doesn't say" },
    ],
    correctOptionId: "b",
    explanation: "“Although” signals a contrast: it was raining, but they played anyway.",
  },
  {
    id: "dg-eng-9", subjectId: "english", grade: 7, topic: "Grammar", difficulty: "advanced",
    prompt: "Choose the correct passive form: “The letter ___ yesterday.”",
    options: [{ id: "a", label: "is sent" }, { id: "b", label: "was sent" }, { id: "c", label: "sent" }, { id: "d", label: "has sent" }],
    correctOptionId: "b",
    explanation: "Past simple passive: was/were + past participle. “Yesterday” requires past tense.",
  },
  {
    id: "dg-eng-10", subjectId: "english", grade: 7, topic: "Vocabulary", difficulty: "advanced",
    prompt: "Which word best completes: “The scientist made an important ___ about the disease.”",
    options: [{ id: "a", label: "discovery" }, { id: "b", label: "discover" }, { id: "c", label: "discovering" }, { id: "d", label: "discovered" }],
    correctOptionId: "a",
    explanation: "After “an important”, a noun is needed — “discovery”.",
  },

  /* ================================ Қазақ тілі ================================ */
  {
    id: "dg-kaz-1", subjectId: "kazakh", grade: 3, topic: "Етістік", difficulty: "beginner",
    prompt: "«Мен кітап ___.» Дұрыс сөзді таңда.",
    options: [{ id: "a", label: "оқимын" }, { id: "b", label: "оқиды" }, { id: "c", label: "оқисың" }, { id: "d", label: "оқыдық" }],
    correctOptionId: "a",
    explanation: "«Мен» есімдігіне «-мын/-мін» жұрнағы сәйкес келеді: оқимын.",
  },
  {
    id: "dg-kaz-2", subjectId: "kazakh", grade: 3, topic: "Зат есім", difficulty: "beginner",
    prompt: "Қай сөз көптік жалғауда тұр?",
    options: [{ id: "a", label: "бала" }, { id: "b", label: "балалар" }, { id: "c", label: "балаға" }, { id: "d", label: "баланы" }],
    correctOptionId: "b",
    explanation: "«-лар» жұрнағы көптік мағына береді: балалар.",
  },
  {
    id: "dg-kaz-3", subjectId: "kazakh", grade: 4, topic: "Сын есім", difficulty: "beginner",
    prompt: "«Биік тау» тіркесіндегі сын есімді тап.",
    options: [{ id: "a", label: "биік" }, { id: "b", label: "тау" }, { id: "c", label: "екеуі де" }, { id: "d", label: "ешқайсысы" }],
    correctOptionId: "a",
    explanation: "«Биік» сөзі заттың сынын білдіреді — бұл сын есім.",
  },
  {
    id: "dg-kaz-4", subjectId: "kazakh", grade: 4, topic: "Мәтінмен жұмыс", difficulty: "core",
    prompt: "Мәтін: «Айгүл ерте тұрды. Ол тісін тазалап, таңғы ас ішті.» Айгүл ең алдымен не істеді?",
    options: [{ id: "a", label: "Таңғы ас ішті" }, { id: "b", label: "Тісін тазалады" }, { id: "c", label: "Ерте тұрды" }, { id: "d", label: "Мектепке барды" }],
    correctOptionId: "c",
    explanation: "Мәтінде алдымен «ерте тұрды» деп жазылған.",
  },
  {
    id: "dg-kaz-5", subjectId: "kazakh", grade: 5, topic: "Сан есім", difficulty: "core",
    prompt: "«Бесінші» сөзі қандай сан есім түріне жатады?",
    options: [{ id: "a", label: "Есептік" }, { id: "b", label: "Реттік" }, { id: "c", label: "Жинақтық" }, { id: "d", label: "Болжалды" }],
    correctOptionId: "b",
    explanation: "«Бесінші» — реттік сан есім, ретін көрсетеді («нешінші?»).",
  },
  {
    id: "dg-kaz-6", subjectId: "kazakh", grade: 5, topic: "Сөйлем мүшелері", difficulty: "core",
    prompt: "«Оқушылар мектепте сабақ оқиды» сөйлеміндегі баяндауышты тап.",
    options: [{ id: "a", label: "Оқушылар" }, { id: "b", label: "мектепте" }, { id: "c", label: "сабақ" }, { id: "d", label: "оқиды" }],
    correctOptionId: "d",
    explanation: "Баяндауыш іс-әрекетті білдіреді және «не істейді?» сұрағына жауап береді: оқиды.",
  },
  {
    id: "dg-kaz-7", subjectId: "kazakh", grade: 6, topic: "Етістік", difficulty: "advanced",
    prompt: "«Бару» етістігінің өткен шақтағы III жақ көпше түрі қайсы?",
    options: [{ id: "a", label: "барды" }, { id: "b", label: "бардым" }, { id: "c", label: "барды" }, { id: "d", label: "барысты" }],
    correctOptionId: "a",
    explanation: "III жақ көпше түрде де етістік «-ды» жалғауымен беріледі: (олар) барды.",
  },
  {
    id: "dg-kaz-8", subjectId: "kazakh", grade: 6, topic: "Мәтінмен жұмыс", difficulty: "advanced",
    prompt: "Мәтін: «Ел болам десең, бесігіңді түзе» — бұл нақыл сөз нені меңзейді?",
    options: [
      { id: "a", label: "Үй тазалығын" },
      { id: "b", label: "Жас ұрпақ тәрбиесінің маңызын" },
      { id: "c", label: "Бесік жасау өнерін" },
      { id: "d", label: "Ұйқының пайдасын" },
    ],
    correctOptionId: "b",
    explanation: "Нақыл сөз болашақ ұрпақты дұрыс тәрбиелеудің маңыздылығын айтады.",
  },
  {
    id: "dg-kaz-9", subjectId: "kazakh", grade: 7, topic: "Сөз құрамы", difficulty: "advanced",
    prompt: "«Кітапхана» сөзінің құрамын анықта.",
    options: [{ id: "a", label: "Түбір + жұрнақ" }, { id: "b", label: "Екі түбірдің бірігуі" }, { id: "c", label: "Түбір + жалғау" }, { id: "d", label: "Қосымшасыз түбір" }],
    correctOptionId: "b",
    explanation: "«Кітап» және «хана» (орын мағынасы) түбірлерінің бірігуінен жасалған.",
  },
  {
    id: "dg-kaz-10", subjectId: "kazakh", grade: 7, topic: "Сөйлем мүшелері", difficulty: "advanced",
    prompt: "Құрмалас сөйлемнің қарапайым сөйлемнен айырмашылығы неде?",
    options: [
      { id: "a", label: "Онда бірнеше жай сөйлем бір ойға біріккен" },
      { id: "b", label: "Онда етістік болмайды" },
      { id: "c", label: "Ол әрқашан сұраулы болады" },
      { id: "d", label: "Онда бас әріп қолданылмайды" },
    ],
    correctOptionId: "a",
    explanation: "Құрмалас сөйлем — мағынасы жағынан байланысқан екі/бірнеше жай сөйлемнен тұрады.",
  },

  /* ================================ Русский язык ================================ */
  {
    id: "dg-rus-1", subjectId: "russian", grade: 3, topic: "Орфография", difficulty: "beginner",
    prompt: "В каком слове пропущена буква «о»? «м__роз»",
    options: [{ id: "a", label: "о" }, { id: "b", label: "а" }, { id: "c", label: "ы" }, { id: "d", label: "и" }],
    correctOptionId: "a",
    explanation: "Проверочное слово «морозы» — под ударением слышится «о».",
  },
  {
    id: "dg-rus-2", subjectId: "russian", grade: 3, topic: "Части речи", difficulty: "beginner",
    prompt: "Найди слово, которое отвечает на вопрос «какой?»",
    options: [{ id: "a", label: "бежит" }, { id: "b", label: "дом" }, { id: "c", label: "красивый" }, { id: "d", label: "быстро" }],
    correctOptionId: "c",
    explanation: "«Красивый» отвечает на вопрос «какой?» — это имя прилагательное.",
  },
  {
    id: "dg-rus-3", subjectId: "russian", grade: 4, topic: "Орфография", difficulty: "beginner",
    prompt: "В каком слове пишется «ь» (мягкий знак)?",
    options: [{ id: "a", label: "мыш" }, { id: "b", label: "мышь" }, { id: "c", label: "мыша" }, { id: "d", label: "мышы" }],
    correctOptionId: "b",
    explanation: "После шипящих на конце существительных женского рода пишется мягкий знак: мышь.",
  },
  {
    id: "dg-rus-4", subjectId: "russian", grade: 4, topic: "Понимание текста", difficulty: "core",
    prompt: "Текст: «Белка живёт в дупле. Она питается орехами и грибами, которые сушит на зиму.» Чем питается белка?",
    options: [{ id: "a", label: "Только орехами" }, { id: "b", label: "Орехами и грибами" }, { id: "c", label: "Только грибами" }, { id: "d", label: "Ягодами" }],
    correctOptionId: "b",
    explanation: "В тексте сказано: «питается орехами и грибами».",
  },
  {
    id: "dg-rus-5", subjectId: "russian", grade: 5, topic: "Морфология", difficulty: "core",
    prompt: "Укажи существительное 3-го склонения.",
    options: [{ id: "a", label: "стол" }, { id: "b", label: "мама" }, { id: "c", label: "ночь" }, { id: "d", label: "окно" }],
    correctOptionId: "c",
    explanation: "К 3-му склонению относятся существительные женского рода с мягким знаком на конце: ночь.",
  },
  {
    id: "dg-rus-6", subjectId: "russian", grade: 5, topic: "Синтаксис", difficulty: "core",
    prompt: "Найди грамматическую основу предложения: «Яркое солнце осветило поляну.»",
    options: [{ id: "a", label: "Яркое солнце" }, { id: "b", label: "Солнце осветило" }, { id: "c", label: "Осветило поляну" }, { id: "d", label: "Яркое осветило" }],
    correctOptionId: "b",
    explanation: "Грамматическая основа — подлежащее «солнце» и сказуемое «осветило».",
  },
  {
    id: "dg-rus-7", subjectId: "russian", grade: 6, topic: "Орфография", difficulty: "advanced",
    prompt: "В каком ряду во всех словах пропущена одна и та же буква? «пр__града, пр__рвать, пр__красный»",
    options: [{ id: "a", label: "и" }, { id: "b", label: "е" }, { id: "c", label: "а" }, { id: "d", label: "о" }],
    correctOptionId: "b",
    explanation: "Приставка «пре-» в значении «очень»/неполнота действия: преграда, прервать, прекрасный.",
  },
  {
    id: "dg-rus-8", subjectId: "russian", grade: 6, topic: "Понимание текста", difficulty: "advanced",
    prompt: "Текст: «Несмотря на усталость, альпинисты продолжили подъём.» Какое слово показывает противопоставление?",
    options: [{ id: "a", label: "усталость" }, { id: "b", label: "несмотря на" }, { id: "c", label: "альпинисты" }, { id: "d", label: "подъём" }],
    correctOptionId: "b",
    explanation: "«Несмотря на» вводит противопоставление: усталость была, но подъём продолжили.",
  },
  {
    id: "dg-rus-9", subjectId: "russian", grade: 7, topic: "Синтаксис", difficulty: "advanced",
    prompt: "Укажи сложноподчинённое предложение.",
    options: [
      { id: "a", label: "Светило солнце, и пели птицы." },
      { id: "b", label: "Когда взошло солнце, запели птицы." },
      { id: "c", label: "Солнце светило ярко." },
      { id: "d", label: "Птицы пели, а солнце светило." },
    ],
    correctOptionId: "b",
    explanation: "В сложноподчинённом предложении одна часть зависит от другой через союз «когда».",
  },
  {
    id: "dg-rus-10", subjectId: "russian", grade: 7, topic: "Морфология", difficulty: "advanced",
    prompt: "Укажи деепричастие.",
    options: [{ id: "a", label: "читающий" }, { id: "b", label: "читая" }, { id: "c", label: "прочитанный" }, { id: "d", label: "читал" }],
    correctOptionId: "b",
    explanation: "Деепричастие отвечает на вопрос «что делая?» и имеет суффикс -а/-я: читая.",
  },

  /* ================================ Естествознание ================================ */
  {
    id: "dg-sci-1", subjectId: "science", grade: 3, topic: "Живая природа", difficulty: "beginner",
    prompt: "Что нужно растению, чтобы расти?",
    options: [{ id: "a", label: "Свет, вода и воздух" }, { id: "b", label: "Только темнота" }, { id: "c", label: "Только камни" }, { id: "d", label: "Ничего не нужно" }],
    correctOptionId: "a",
    explanation: "Растениям для роста нужны свет, вода, воздух и питательные вещества из почвы.",
  },
  {
    id: "dg-sci-2", subjectId: "science", grade: 3, topic: "Животные", difficulty: "beginner",
    prompt: "Какое из этих животных — насекомое?",
    options: [{ id: "a", label: "Воробей" }, { id: "b", label: "Муравей" }, { id: "c", label: "Щука" }, { id: "d", label: "Кошка" }],
    correctOptionId: "b",
    explanation: "Муравей — насекомое: у него 6 ног и тело из трёх частей.",
  },
  {
    id: "dg-sci-3", subjectId: "science", grade: 4, topic: "Организм человека", difficulty: "beginner",
    prompt: "Какой орган отвечает за перекачку крови?",
    options: [{ id: "a", label: "Лёгкие" }, { id: "b", label: "Сердце" }, { id: "c", label: "Желудок" }, { id: "d", label: "Печень" }],
    correctOptionId: "b",
    explanation: "Сердце работает как насос и гонит кровь по сосудам.",
  },
  {
    id: "dg-sci-4", subjectId: "science", grade: 4, topic: "Природные явления", difficulty: "core",
    prompt: "Как называется переход воды из жидкого состояния в газообразное?",
    options: [{ id: "a", label: "Таяние" }, { id: "b", label: "Испарение" }, { id: "c", label: "Замерзание" }, { id: "d", label: "Конденсация" }],
    correctOptionId: "b",
    explanation: "Испарение — переход жидкости в пар при нагревании.",
  },
  {
    id: "dg-sci-5", subjectId: "science", grade: 5, topic: "Солнечная система", difficulty: "core",
    prompt: "Какая планета ближе всего к Солнцу?",
    options: [{ id: "a", label: "Венера" }, { id: "b", label: "Земля" }, { id: "c", label: "Меркурий" }, { id: "d", label: "Марс" }],
    correctOptionId: "c",
    explanation: "Меркурий — первая планета от Солнца.",
  },
  {
    id: "dg-sci-6", subjectId: "science", grade: 5, topic: "Экосистемы", difficulty: "core",
    prompt: "Что произойдёт с пищевой цепью «трава → заяц → волк», если исчезнут все зайцы?",
    options: [
      { id: "a", label: "Волкам станет легче искать еду" },
      { id: "b", label: "Волкам не хватит пищи, травы станет больше" },
      { id: "c", label: "Ничего не изменится" },
      { id: "d", label: "Трава исчезнет первой" },
    ],
    correctOptionId: "b",
    explanation: "Без зайцев волкам нечем питаться, а трава, которую ели зайцы, будет расти свободнее.",
  },
  {
    id: "dg-sci-7", subjectId: "science", grade: 6, topic: "Организм человека", difficulty: "advanced",
    prompt: "Какая система органов отвечает за выведение углекислого газа из организма?",
    options: [{ id: "a", label: "Пищеварительная" }, { id: "b", label: "Дыхательная" }, { id: "c", label: "Кровеносная" }, { id: "d", label: "Нервная" }],
    correctOptionId: "b",
    explanation: "Дыхательная система обеспечивает газообмен: кислород поступает, углекислый газ выводится.",
  },
  {
    id: "dg-sci-8", subjectId: "science", grade: 6, topic: "Природные явления", difficulty: "advanced",
    prompt: "Почему летом день длиннее ночи в Северном полушарии?",
    options: [
      { id: "a", label: "Земля ближе к Солнцу летом" },
      { id: "b", label: "Северное полушарие наклонено к Солнцу" },
      { id: "c", label: "Луна закрывает ночью меньше света" },
      { id: "d", label: "Солнце движется быстрее летом" },
    ],
    correctOptionId: "b",
    explanation: "Наклон оси Земли приводит к тому, что летом Северное полушарие получает больше света.",
  },
  {
    id: "dg-sci-9", subjectId: "science", grade: 7, topic: "Экосистемы", difficulty: "advanced",
    prompt: "Как называются организмы, которые сами производят органические вещества из неорганических (например, растения)?",
    options: [{ id: "a", label: "Консументы" }, { id: "b", label: "Редуценты" }, { id: "c", label: "Продуценты" }, { id: "d", label: "Паразиты" }],
    correctOptionId: "c",
    explanation: "Продуценты (растения, водоросли) производят органику с помощью фотосинтеза.",
  },
  {
    id: "dg-sci-10", subjectId: "science", grade: 7, topic: "Организм человека", difficulty: "advanced",
    prompt: "Какую роль выполняют ферменты в пищеварении?",
    options: [
      { id: "a", label: "Ускоряют расщепление пищи" },
      { id: "b", label: "Окрашивают пищу" },
      { id: "c", label: "Замедляют пищеварение" },
      { id: "d", label: "Не участвуют в пищеварении" },
    ],
    correctOptionId: "a",
    explanation: "Ферменты — биологические катализаторы, ускоряющие расщепление пищи на простые вещества.",
  },
];

export function diagnosticQuestionsFor(subjectId: SubjectId): DiagnosticQuestion[] {
  return DIAGNOSTIC_QUESTIONS.filter((q) => q.subjectId === subjectId);
}

/** Scores one subject's answers into beginner/core/advanced. */
export function scoreDiagnosticSubject(
  subjectId: SubjectId,
  answers: Record<string, string>,
): { correct: number; total: number; level: "beginner" | "core" | "advanced" } {
  const qs = diagnosticQuestionsFor(subjectId);
  const correct = qs.filter((q) => answers[q.id] === q.correctOptionId).length;
  const ratio = qs.length ? correct / qs.length : 0;
  const level = ratio >= 0.75 ? "advanced" : ratio >= 0.4 ? "core" : "beginner";
  return { correct, total: qs.length, level };
}

export function scoreDiagnostic(
  subjects: SubjectId[],
  answers: Record<string, string>,
): DiagnosticResult {
  const bySubject: DiagnosticResult["bySubject"] = {};
  for (const id of subjects) {
    bySubject[id] = scoreDiagnosticSubject(id, answers);
  }
  return { bySubject };
}

/** A single overall level across subjects — used where the UI needs one headline figure. */
export function overallDiagnosticLevel(
  bySubject: DiagnosticResult["bySubject"],
): "beginner" | "core" | "advanced" {
  const entries = Object.values(bySubject).filter(Boolean) as { correct: number; total: number }[];
  if (entries.length === 0) return "core";
  const correct = entries.reduce((s, e) => s + e.correct, 0);
  const total = entries.reduce((s, e) => s + e.total, 0);
  const ratio = total ? correct / total : 0;
  return ratio >= 0.75 ? "advanced" : ratio >= 0.4 ? "core" : "beginner";
}
