import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  Flame,
  Plus,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Video,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { Avatar } from "@/components/shared/Avatar";
import { Blob, DashedRoute, Dot, Knob, PillToggle, Sparkle, type DecorColor } from "@/components/shared/Decor";
import { cn } from "@/lib/utils";
import { SUBJECTS, SUBJECT_GROUPS } from "@/data/subjects";
import { REVIEWS } from "@/data/reviews";
import { useLocale } from "@/i18n";
import { usePageTitle } from "@/lib/usePageTitle";
import type { Subject } from "@/types";

type IconType = React.ComponentType<{ className?: string }>;

const STEPS: { key: string; icon: IconType; color: DecorColor }[] = [
  { key: "grade", icon: Target, color: "leaf" },
  { key: "plan", icon: CalendarDays, color: "sun" },
  { key: "lesson", icon: PlayCircle, color: "sky" },
  { key: "streak", icon: Flame, color: "bubble" },
];

const FAQ_COLORS = ["bg-berry text-white", "bg-leaf", "bg-sun", "bg-grape text-white", "bg-bubble", "bg-sky"];

export function LandingPage() {
  const { t, list } = useLocale();
  usePageTitle();
  const faq = list<{ q: string; a: string }>("x.landing.faq");
  const reviewTexts = list<{ quote: string; role: string }>("x.landing.reviews");

  const WIDGETS: { icon: IconType; tone: string; metric: string; caption: string; rotate: string }[] = [
    { icon: Flame, tone: "bg-butter-soft text-butter-ink", metric: t("hero.widgetStreakCount"), caption: t("hero.streakDays"), rotate: "sm:-rotate-3" },
    { icon: Star, tone: "bg-bubble-soft text-bubble-ink", metric: "4.9", caption: t("hero.widgetRating"), rotate: "sm:rotate-2" },
    { icon: TrendingUp, tone: "bg-leaf-soft text-leaf-ink", metric: "+23%", caption: t("hero.widgetProgress"), rotate: "sm:-rotate-2" },
    { icon: Video, tone: "bg-berry-soft text-berry-ink", metric: "500+", caption: t("hero.widgetVideos"), rotate: "sm:rotate-3" },
  ];

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-paper">
        <Sparkle color="leaf" size={44} className="absolute left-[9%] top-[58%] hidden sm:block" />
        <Sparkle color="sun" size={52} className="absolute right-[10%] top-[60%] hidden sm:block" style={{ animationDelay: "1.2s" }} />
        <Sparkle color="berry" size={30} className="absolute left-[18%] top-[74%]" style={{ animationDelay: "0.6s" }} />
        <Sparkle color="sky" size={34} className="absolute right-[22%] top-[76%]" style={{ animationDelay: "2s" }} />
        <Sparkle color="bubble" size={22} className="absolute right-[6%] top-[12%]" style={{ animationDelay: "1.6s" }} />

        <div className="container-page relative pb-16 pt-10 sm:pb-24 sm:pt-16">
          <Badge tone="butter" className="mx-auto mb-8 flex w-max animate-fade-up">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {t("hero.badge")}
          </Badge>

          <h1
            className="relative mx-auto max-w-5xl text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-[4.6rem] lg:text-[6.2rem]"
            aria-label={`${t("x.landing.heroLine1")} ${t("x.landing.heroLine2")} ${t("x.landing.heroLine3")}`}
          >
            {/* Line 1: word · green arrow circle · gradient toggle with emoji knob */}
            <span aria-hidden="true" className="flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-2">
              <span>{t("x.landing.heroLine1")}</span>
              <Blob color="leaf" className="h-[0.9em] w-[0.9em] text-ink">
                <ArrowRight className="h-[0.42em] w-[0.42em]" strokeWidth={3} />
              </Blob>
              <PillToggle
                className="h-[0.9em] w-[1.9em]"
                knob={
                  <Knob className="h-[0.72em] w-[0.72em]">
                    <span className="inline-block animate-wiggle text-[0.42em] leading-none">🔥</span>
                  </Knob>
                }
              />
            </span>

            {/* Line 2: yellow circle with glass pill · word · outline toggle */}
            <span aria-hidden="true" className="mt-2 flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-2">
              <span className="relative inline-flex h-[0.95em] w-[1.45em] items-center">
                <Blob color="sun" className="absolute left-0 h-[0.95em] w-[0.95em]" />
                <PillToggle
                  variant="glass"
                  className="absolute left-[0.45em] h-[0.48em] w-[1em]"
                  knob={<span className="mr-[0.12em] block h-[0.07em] w-[0.34em] rounded-full bg-ink" />}
                />
              </span>
              <span>{t("x.landing.heroLine2")}</span>
              <span className="relative inline-flex h-[0.62em] w-[1.6em] items-center rounded-full border-[0.07em] border-ink bg-white">
                <span className="absolute left-[0.22em] right-[0.22em] top-1/2 h-[0.06em] -translate-y-1/2 bg-ink" />
                <span className="absolute left-1/2 top-1/2 h-[0.32em] w-[0.32em] -translate-x-1/2 -translate-y-1/2 rounded-full bg-leaf" />
                <Dot color="berry" className="absolute -right-[0.2em] top-1/2 -translate-y-1/2" />
              </span>
            </span>

            {/* Line 3: overlapping purple + sky circles with a glass key · word */}
            <span aria-hidden="true" className="mt-2 flex flex-wrap items-center justify-center gap-x-[0.18em] gap-y-2">
              <span className="relative inline-flex h-[1em] w-[1.75em] items-center">
                <Blob gradient="linear-gradient(135deg,#8B5CF6,#FF6FA8 60%,#FF7A1A)" className="absolute left-0 h-[1em] w-[1em]" />
                <Blob color="sky" className="absolute left-[0.72em] h-[1em] w-[1em] opacity-90" />
                <PillToggle
                  variant="glass"
                  className="absolute left-[0.3em] h-[0.5em] w-[1.15em]"
                  knob={
                    <Knob className="h-[0.38em] w-[0.5em] !rounded-[0.14em]">
                      <BookOpen className="h-[0.2em] w-[0.2em]" />
                    </Knob>
                  }
                />
              </span>
              <span>{t("x.landing.heroLine3")}</span>
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-xl text-center text-base text-ink/75 sm:text-lg">
            {t("hero.subtitle")} <span aria-hidden="true">🙌</span>
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <Button asChild size="lg">
              <Link to="/auth?role=student">{t("hero.ctaStart")}</Link>
            </Button>
            <a href="#how" className="text-sm font-bold text-ink underline decoration-2 underline-offset-4 hover:text-berry">
              {t("x.landing.seeHow")}
            </a>
          </div>

          {/* Metric widgets */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {WIDGETS.map((w, i) => (
              <WidgetCard key={w.caption} widget={w} className={cn("animate-fade-up", w.rotate)} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section id="how" className="scroll-mt-20 bg-snow py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={t("steps.eyebrow")} title={t("steps.title")} subtitle={t("steps.subtitle")} />
          <div className="relative mt-16">
            <DashedRoute d="M 6 50 C 20 0, 32 100, 50 50 S 80 0, 94 50" className="inset-x-0 -top-10 hidden h-12 w-full lg:block" />
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <Card key={step.key} className="lift relative p-6 pt-7">
                  <div className="flex items-center justify-between">
                    <Blob color={step.color} className="h-14 w-14 text-ink shadow-knob">
                      <step.icon className="h-6 w-6" />
                    </Blob>
                    <span className="font-display text-5xl font-extrabold text-ink/[0.08]">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg">{t(`steps.${step.key}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted">{t(`steps.${step.key}.text`)}</p>
                  {step.key === "streak" && (
                    <a href="#streak" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-berry hover:underline">
                      {t("steps.readMore")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Subjects ---------------- */}
      <section id="subjects" className="relative isolate scroll-mt-20 overflow-hidden py-20 sm:py-28">
        <Sparkle color="grape" size={30} className="absolute left-[6%] top-24 hidden md:block" />
        <Sparkle color="leaf" size={24} className="absolute right-[8%] top-40 hidden md:block" style={{ animationDelay: "1s" }} />
        <div className="container-page">
          <SectionHeading eyebrow={t("subjectsSection.eyebrow")} title={t("subjectsSection.title")} subtitle={t("subjectsSection.subtitle")} />

          <div className="mt-12 space-y-10">
            <div>
              <GroupLabel>{t("subjectGroups.exam")}</GroupLabel>
              <div className="grid gap-4 sm:grid-cols-2">
                {SUBJECTS.filter((s) => SUBJECT_GROUPS.exam.includes(s.id)).map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} t={t} />
                ))}
              </div>
            </div>
            <div>
              <GroupLabel>{t("subjectGroups.language")}</GroupLabel>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SUBJECTS.filter((s) => SUBJECT_GROUPS.language.includes(s.id)).map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} t={t} />
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-4 rounded-card bg-leaf p-6 text-ink sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-3 text-base font-bold">
                  <Sparkles className="h-6 w-6 shrink-0" aria-hidden="true" />
                  {t("subjectsSection.addRemove")}
                </p>
                <Button asChild size="md" className="shrink-0 self-start sm:self-auto">
                  <Link to="/auth?role=student">{t("subjectsSection.pickSet")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Why streak works ---------------- */}
      <section id="streak" className="scroll-mt-20 px-3 sm:px-5">
        <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[40px] bg-butter-soft py-20 sm:py-24">
          <Blob color="sun" className="absolute -right-16 -top-16 -z-10 h-56 w-56" />
          <Blob color="bubble" className="absolute -bottom-20 -left-10 -z-10 h-48 w-48 opacity-80" />
          <Sparkle color="berry" size={28} className="absolute left-[46%] top-10" />
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge tone="neutral" className="mb-4 bg-white">
                <Flame className="h-3.5 w-3.5 text-fire-500" aria-hidden="true" />
                {t("streakSection.badge")}
              </Badge>
              <h2 className="text-4xl sm:text-5xl">{t("streakSection.title")}</h2>
              <p className="mt-4 text-ink/75">{t("x.landing.streakText")}</p>
              <ul className="mt-6 space-y-3">
                {list<string>("x.landing.streakBullets").map((item, i) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                    <Blob color={(["sun", "leaf", "sky"] as const)[i % 3]} className="h-8 w-8 text-ink shadow-knob">
                      {i === 2 ? <Snowflake className="h-4 w-4" /> : <Flame className="h-4 w-4" />}
                    </Blob>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <StreakShowcase />
          </div>
        </div>
      </section>

      {/* ---------------- For parents ---------------- */}
      <section id="parents" className="relative isolate scroll-mt-20 overflow-hidden bg-paper py-20 sm:py-28">
        <Sparkle color="sun" size={30} className="absolute left-[6%] top-16" />
        <Sparkle color="sky" size={22} className="absolute bottom-16 left-[40%]" style={{ animationDelay: "1.4s" }} />
        <Blob gradient="linear-gradient(135deg,#3D5AFE,#8B5CF6)" className="absolute -right-24 top-10 -z-10 h-72 w-72 opacity-25 blur-3xl" />
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-pill bg-berry-soft px-3 py-1 text-xs font-bold text-berry-ink">
              {t("parentsSection.badge")}
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl">{t("parentsSection.title")}</h2>
            <p className="mt-4 text-ink/75">{t("x.landing.parentsText")}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: BarChart3, label: t("parentsSection.progress"), color: "leaf" as const },
                { icon: ShieldCheck, label: t("parentsSection.weakTopics"), color: "sun" as const },
                { icon: BookOpenCheck, label: t("parentsSection.activityFeed"), color: "sky" as const },
              ].map((f) => (
                <div key={f.label} className="lift rounded-widget bg-white p-4 shadow-card ring-1 ring-ink/[0.05]">
                  <Blob color={f.color} className="h-9 w-9 text-ink">
                    <f.icon className="h-4 w-4" />
                  </Blob>
                  <p className="mt-3 text-sm font-bold text-ink">{f.label}</p>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8">
              <Link to="/auth?role=parent">{t("parentsSection.cta")}</Link>
            </Button>
          </div>

          <div className="relative">
            <div className="relative flex items-center justify-center overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#E6EAFF,#FFE3EF_55%,#FFF3CC)] px-6 pb-16 pt-14 sm:px-10">
              <ParentMock />
            </div>
            <div className="absolute -left-3 -top-5 z-10 flex -rotate-3 items-center gap-3 rounded-widget bg-white px-4 py-3 text-ink shadow-float sm:-left-6">
              <Blob color="leaf" className="h-9 w-9 text-ink">
                <TrendingUp className="h-4 w-4" />
              </Blob>
              <p className="text-sm font-bold leading-tight">
                +23%
                <span className="block text-xs font-semibold text-muted">{t("parentsSection.metricLabel")}</span>
              </p>
            </div>
            <Card className="relative z-10 mx-4 -mt-10 border-0 p-6 text-ink shadow-pop sm:mx-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{t("x.landing.notifLabel")}</p>
              <p className="mt-3 text-sm text-ink/80">{t("x.landing.notifText")}</p>
              <div className="mt-4 h-px bg-ink/[0.08]" />
              <p className="mt-4 text-sm text-ink/80">
                <span className="font-bold text-ink">{t("x.landing.attentionLabel")}</span> {t("x.landing.attentionText")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------- Reviews ---------------- */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={t("reviewsSection.eyebrow")} title={t("reviewsSection.title")} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Card key={r.id} className={cn("lift flex flex-col p-6 sm:p-7", i === 1 && "md:-rotate-1", i === 2 && "md:rotate-1")}>
                <div className="flex gap-0.5 text-sun" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[15px] text-ink/80">{reviewTexts[i]?.quote ?? r.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={r.author} color={r.avatarColor} size="md" />
                  <div>
                    <p className="text-sm font-bold text-ink">{r.author}</p>
                    <p className="text-xs text-muted">{reviewTexts[i]?.role ?? r.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="scroll-mt-20 bg-snow py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={t("faqSection.eyebrow")} title={t("faqSection.title")} />
          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {faq.map((item, i) => (
              <details key={item.q} open={i === 0} className="group rounded-[24px] bg-white shadow-card">
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:content-none sm:p-6">
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold text-ink",
                      FAQ_COLORS[i % FAQ_COLORS.length],
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[15px] font-bold text-ink">{item.q}</span>
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink text-ink transition-colors group-open:bg-ink group-open:text-white"
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4 transition-transform duration-200 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] text-muted sm:px-6 sm:pb-6 sm:pl-[5rem]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="relative isolate overflow-hidden rounded-[40px] bg-[linear-gradient(120deg,#3D5AFE,#8B5CF6_60%,#FF6FA8)] px-6 py-14 text-center text-white sm:px-16 sm:py-20">
            <Sparkle color="sun" size={40} className="absolute left-[8%] top-10" />
            <Sparkle color="white" size={26} className="absolute right-[12%] top-14" style={{ animationDelay: "1s" }} />
            <Sparkle color="leaf" size={30} className="absolute bottom-10 right-[22%]" style={{ animationDelay: "2s" }} />
            <Blob color="sun" className="absolute -bottom-16 -left-12 -z-10 h-44 w-44 opacity-90" />
            <h2 className="mx-auto max-w-2xl text-4xl text-white sm:text-[3.4rem] sm:leading-[1.05]">{t("finalCta.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">{t("finalCta.subtitle")}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-ink hover:bg-white/90">
                <Link to="/auth?role=student">{t("finalCta.ctaStudent")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:border-white hover:bg-white/10">
                <Link to="/auth?role=parent">{t("finalCta.ctaParent")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-xs font-extrabold uppercase tracking-[0.16em] text-muted">{children}</h3>;
}

function SubjectCard({
  subject,
  t,
}: {
  subject: Subject;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  return (
    <Card className="lift flex items-start gap-4 p-6">
      <SubjectIcon subjectId={subject.id} size="lg" />
      <div>
        <h3 className="text-lg">{t(`subjects.${subject.id}.name`)}</h3>
        <p className="mt-1 text-sm text-muted">{t(`subjects.${subject.id}.tagline`)}</p>
        <p className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
          <span className={cn("rounded-pill px-2.5 py-1", subject.theme.soft, subject.theme.text)}>
            {subject.topicsCount} {t("subjectsSection.topics")}
          </span>
          <span className="rounded-pill bg-ink/[0.06] px-2.5 py-1 text-ink/75">
            {subject.videoLessonsCount}+ {t("subjectsSection.videos")}
          </span>
        </p>
      </div>
    </Card>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="inline-flex items-center gap-2 rounded-pill bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-berry shadow-card">
        <Sparkle color="berry" size={12} twinkle={false} />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-ink/70 sm:text-lg">{subtitle}</p>}
    </div>
  );
}

function WidgetCard({
  widget,
  className,
  delay = 0,
}: {
  widget: { icon: IconType; tone: string; metric: string; caption: string };
  className?: string;
  delay?: number;
}) {
  const Icon = widget.icon;
  return (
    <div
      className={cn("lift flex items-center gap-3 rounded-widget bg-white px-4 py-3.5 shadow-card ring-1 ring-ink/[0.05]", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full", widget.tone)}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 text-left">
        <p className="font-display text-xl font-extrabold leading-none text-ink">{widget.metric}</p>
        <p className="mt-1 text-xs font-semibold leading-tight text-muted">{widget.caption}</p>
      </div>
    </div>
  );
}

function StreakShowcase() {
  const { t, list } = useLocale();
  const days = list<string>("x.landing.weekdays");
  // Mon–Sat history with a frozen Thursday; Sunday is "today", not done yet.
  const state: ("done" | "frozen" | "today")[] = ["done", "done", "done", "frozen", "done", "done", "today"];
  const label = { done: t("x.landing.dayDone"), frozen: t("x.landing.dayFrozen"), today: t("x.landing.dayToday") };
  return (
    <Card className="relative border-0 p-6 shadow-pop sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-muted">{t("x.landing.showcaseCurrent")}</p>
          <p className="mt-1 font-display text-5xl font-extrabold text-ink">{t("x.landing.streakCount")}</p>
        </div>
        <Blob gradient="linear-gradient(135deg,#FFC530,#FF7A1A)" className="h-16 w-16 shadow-knob">
          <Flame className="h-8 w-8 animate-flame text-white" fill="currentColor" />
        </Blob>
      </div>
      <div className="mt-7 grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <div key={d} className="text-center">
            <div
              className={cn(
                "grid aspect-square w-full place-items-center rounded-full text-xs font-bold",
                state[i] === "done" && "bg-fire-500 text-white",
                state[i] === "frozen" && "bg-sky text-sky-ink",
                state[i] === "today" && "border-[3px] border-dashed border-ink/25 text-ink/50",
              )}
              aria-label={`${d}: ${label[state[i]]}`}
            >
              {state[i] === "done" ? (
                <Flame className="h-4 w-4" fill="currentColor" aria-hidden="true" />
              ) : state[i] === "frozen" ? (
                <Snowflake className="h-4 w-4" aria-hidden="true" />
              ) : (
                "?"
              )}
            </div>
            <p className="mt-1.5 text-[11px] font-bold text-muted">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-2xl bg-snow px-4 py-3 text-xs font-semibold text-ink/70">{t("x.landing.showcaseNote")}</p>
    </Card>
  );
}

/** Mini parent-dashboard preview for the "For parents" section. */
function ParentMock() {
  const { t } = useLocale();
  const rows = [
    { id: "math" as const, pct: 50, bar: "bg-grape" },
    { id: "english" as const, pct: 67, bar: "bg-berry" },
    { id: "science" as const, pct: 75, bar: "bg-butter" },
  ];
  return (
    <div className="w-full max-w-sm rounded-[24px] bg-white p-5 text-ink shadow-float" aria-hidden="true">
      <div className="flex items-center gap-3">
        <Avatar name={t("x.landing.phoneName")} size="md" color="#3D5AFE" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">{t("x.landing.mockChild")}</p>
          <p className="text-xs text-muted">{t("x.landing.mockToday")}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-pill bg-fire-500 px-2.5 py-1 text-xs font-extrabold text-white">
          <Flame className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
          15
        </span>
      </div>
      <ul className="mt-5 space-y-3.5">
        {rows.map((r) => (
          <li key={r.id}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">{t(`subjects.${r.id}.name`)}</span>
              <span className="font-bold text-ink/70">{r.pct}%</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-pill bg-ink/[0.06]">
              <div className={cn("h-full rounded-pill", r.bar)} style={{ width: `${r.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
