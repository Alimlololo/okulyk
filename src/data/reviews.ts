export interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarColor: string;
}

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    quote:
      "Дочка сама садится за задания, чтобы не потерять streak. За два месяца подтянули математику — стало видно по школьным оценкам.",
    author: "Динара",
    role: "мама ученицы 5 класса",
    avatarColor: "#6C4CF1",
  },
  {
    id: "rev-2",
    quote:
      "Раньше не понимал, где сын проседает. Теперь в кабинете родителя вижу слабые темы и занимаюсь с ним именно по ним.",
    author: "Ерлан",
    role: "папа ученика 3 класса",
    avatarColor: "#0D9488",
  },
  {
    id: "rev-3",
    quote:
      "Короткие видео и сразу практика — удобно делать по дороге в школу. Готовимся к поступлению в НИШ без репетитора.",
    author: "Аружан",
    role: "ученица 6 класса",
    avatarColor: "#E11D48",
  },
];
