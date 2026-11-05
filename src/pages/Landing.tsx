import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Flame,
  Laptop,
  Play,
  PlayCircle,
  Plus,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { Avatar } from "@/components/shared/Avatar";
import { cn } from "@/lib/utils";
import { SUBJECTS, SUBJECT_GROUPS } from "@/data/subjects";
import { REVIEWS } from "@/data/reviews";
import { useLocale } from "@/i18n";
import { usePageTitle } from "@/lib/usePageTitle";
import type { Subject } from "@/types";

type IconType = React.ComponentType<{ className?: string }>;

const STEPS = [
  { key: "grade", icon: Target },
  { key: "plan", icon: CalendarDays },
  { key: "lesson", icon: PlayCircle },
  { key: "streak", icon: Flame },
] as const;

export function LandingPage() {
  const { t, list } = useLocale();
  usePageTitle();
  const faq = list<{ q: string; a: string }>("x.landing.faq");
  const reviewTexts = list<{ quote: string; role: string }>("x.landing.reviews");

  const WIDGETS = [
    { icon: Flame, tone: "butter", metric: t("hero.widgetStreakCount"), caption: t("hero.streakDays") },
    { icon: Star, tone: "blush", metric: "4.9", caption: t("hero.widgetRating") },
    { icon: TrendingUp, tone: "mint", metric: "+23%", caption: t("hero.widgetProgress") },
    { icon: Video, tone: "plain", metric: "500+", caption: t("hero.widgetVideos") },
    { icon: CheckCircle2, tone: "mint", metric: "1 200", caption: t("hero.widgetTasks") },
  ] as const;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-6rem] -z-10 h-[34rem] w-[52rem] max-w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-butter/45 via-blush/40 to-mint/45 blur-[120px]"
        />

        <div className="container-page relative py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            {/* Left — copy, left-aligned on desktop */}
            <div className="animate-fade-up text-center lg:text-left">
              <Badge tone="butter" className="mb-5 lg:mx-0">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                {t("hero.badge")}
              </Badge>
              <h1 className="mx-auto max-w-[16ch] text-[2.25rem] leading-[1.05] sm:text-5xl lg:mx-0 lg:max-w-none lg:text-[3.25rem] lg:leading-[1.02]">
                {t("hero.title")}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg lg:mx-0">
                {t("hero.subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Button asChild size="lg" className="group w-full sm:w-auto">
                  <Link to="/auth?role=student">
                    {t("hero.ctaStart")}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a href="#how">{t("hero.ctaHow")}</a>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/60">
                  <Laptop className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("hero.onDesktop")}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/60">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("hero.onPhone")}
                </span>
              </div>
            </div>

            {/* Right — bold accent card with phone mockup */}
            <div className="relative mx-auto w-full max-w-sm animate-fade-up [animation-delay:120ms] sm:max-w-md">
              <div className="relative overflow-hidden rounded-[2rem] bg-sky px-6 pb-8 pt-6 shadow-pop sm:px-8 sm:pt-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink/70">
                    {t("hero.myProgress")}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-black/10 text-ink">
                    <Flame className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-2 font-display text-5xl font-bold leading-none text-ink sm:text-6xl">
                  {t("hero.streakCountLabel")}
                </p>
                <p className="mt-1.5 text-sm font-medium text-ink/70">
                  {t("hero.streakDays")}
                </p>

                <div className="mt-6 flex justify-center">
                  <PhoneMockup />
                </div>
              </div>

              {/* Floating widgets, straddling the accent card's corners */}
              <WidgetCard
                widget={WIDGETS[1]}
                className="absolute -left-10 top-1/2 hidden w-max -rotate-6 animate-float-slow sm:flex"
              />
              <WidgetCard
                widget={WIDGETS[2]}
                className="absolute -bottom-6 -right-5 hidden w-max rotate-3 animate-float-slow [animation-delay:.6s] sm:flex"
              />
            </div>
          </div>

          {/* Mobile — compact metric row */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 sm:hidden">
            {WIDGETS.slice(1, 4).map((w) => (
              <WidgetCard key={w.caption} widget={w} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Scroll invite ---------------- */}
      <div className="relative z-10 hidden justify-center sm:flex">
        <a
          href="#how"
          aria-label={t("hero.scrollInvite")}
          className="-mt-9 mb-[-2.25rem] grid place-items-center rounded-full bg-white p-2 shadow-pop transition-transform hover:scale-105"
        >
          <RotatingScrollBadge label={t("hero.scrollInvite")} />
        </a>
      </div>

      {/* ---------------- Как это работает ---------------- */}
      <section id="how" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={t("steps.eyebrow")}
            title={t("steps.title")}
            subtitle={t("steps.subtitle")}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const isHighlight = i === STEPS.length - 1;
              return (
                <Card
                  key={step.key}
                  className={cn("p-6", isHighlight && "border-transparent bg-sky")}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl",
                      isHighlight ? "bg-black/10 text-ink" : "bg-ink/[0.04] text-ink",
                    )}
                  >
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p
                    className={cn(
                      "mt-5 text-xs font-medium uppercase tracking-[0.16em]",
                      isHighlight ? "text-ink/60" : "text-muted",
                    )}
                  >
                    {t("steps.stepLabel")} {i + 1}
                  </p>
                  <h3 className="mt-1.5 font-sans text-base font-semibold tracking-tight">
                    {t(`steps.${step.key}.title`)}
                  </h3>
                  <p className={cn("mt-2 text-sm", isHighlight ? "text-ink/70" : "text-muted")}>
                    {t(`steps.${step.key}.text`)}
                  </p>
                  {isHighlight && (
                    <a
                      href="#streak"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ink"
                    >
                      {t("steps.readMore")}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Предметы ---------------- */}
      <section id="subjects" className="scroll-mt-20 bg-ink/[0.02] py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={t("subjectsSection.eyebrow")}
            title={t("subjectsSection.title")}
            subtitle={t("subjectsSection.subtitle")}
          />

          <div className="mt-12 space-y-10">
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {t("subjectGroups.exam")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {SUBJECTS.filter((s) => SUBJECT_GROUPS.exam.includes(s.id)).map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} t={t} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-muted">
                {t("subjectGroups.language")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {SUBJECTS.filter((s) => SUBJECT_GROUPS.language.includes(s.id)).map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} t={t} />
                ))}
              </div>
              <Card className="mt-4 flex flex-col gap-4 border-transparent bg-mint-soft p-6 shadow-none sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-center gap-3 text-sm font-medium text-mint-ink">
                  <Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {t("subjectsSection.addRemove")}
                </p>
                <Button asChild variant="outline" size="sm" className="shrink-0 self-start sm:self-auto">
                  <Link to="/auth?role=student">{t("subjectsSection.pickSet")}</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Почему работает streak ---------------- */}
      <section id="streak" className="scroll-mt-20 py-20 sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge tone="butter" className="mb-4">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              {t("streakSection.badge")}
            </Badge>
            <h2 className="text-3xl sm:text-[2.5rem]">{t("streakSection.title")}</h2>
            <p className="mt-4 text-muted">{t("x.landing.streakText")}</p>
            <ul className="mt-6 space-y-3">
              {list<string>("x.landing.streakBullets").map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink/75">
                  <span
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink/[0.05] text-ink/60"
                    aria-hidden="true"
                  >
                    <Flame className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <StreakShowcase />
        </div>
      </section>

      {/* ---------------- Для родителей ---------------- */}
      <section id="parents" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center rounded-pill bg-white/10 px-2.5 py-1 text-xs font-medium text-white/80">
              {t("parentsSection.badge")}
            </span>
            <h2 className="mt-4 text-3xl text-white sm:text-[2.5rem]">{t("parentsSection.title")}</h2>
            <p className="mt-4 text-white/70">{t("x.landing.parentsText")}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: BarChart3, label: t("parentsSection.progress") },
                { icon: ShieldCheck, label: t("parentsSection.weakTopics") },
                { icon: BookOpenCheck, label: t("parentsSection.activityFeed") },
              ].map((f) => (
                <div key={f.label} className="rounded-widget bg-white/5 p-4">
                  <f.icon className="h-5 w-5 text-white/70" aria-hidden="true" />
                  <p className="mt-2 text-sm font-medium text-white">{f.label}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-6 bg-white text-ink hover:bg-white/90">
              <Link to="/auth?role=parent">{t("parentsSection.cta")}</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush-soft via-butter-soft to-mint-soft px-6 pb-16 pt-14 sm:px-10">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl"
              />
              <ParentMock />
            </div>

            {/* Floating metric card, straddling the photo's corner */}
            <div className="absolute -left-4 -top-4 z-10 flex items-center gap-3 rounded-widget border border-ink/[0.05] bg-white px-4 py-3 shadow-float sm:-left-6 sm:-top-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mint-soft text-mint-ink">
                <TrendingUp className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-none text-ink">
                  +23% {t("parentsSection.metricLabel")}
                </p>
                <MiniSparkline className="mt-1.5 text-mint-ink" />
              </div>
            </div>

            <Card className="relative z-10 -mt-8 mx-4 border-0 bg-white p-6 text-ink shadow-pop sm:mx-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {t("x.landing.notifLabel")}
              </p>
              <p className="mt-3 text-sm text-ink/75">{t("x.landing.notifText")}</p>
              <div className="mt-4 h-px bg-ink/[0.08]" />
              <p className="mt-4 text-sm text-ink/75">
                <span className="font-semibold text-ink">{t("x.landing.attentionLabel")}</span>{" "}
                {t("x.landing.attentionText")}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------- Отзывы ---------------- */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={t("reviewsSection.eyebrow")} title={t("reviewsSection.title")} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Card key={r.id} className="flex flex-col p-6 sm:p-7">
                <div className="flex gap-0.5 text-ink" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm text-ink/75">{reviewTexts[i]?.quote ?? r.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={r.author} color={r.avatarColor} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-ink">{r.author}</p>
                    <p className="text-xs text-muted">{reviewTexts[i]?.role ?? r.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Вопросы ---------------- */}
      <section id="faq" className="scroll-mt-20 bg-ink/[0.02] py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={t("faqSection.eyebrow")} title={t("faqSection.title")} />
          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {faq.map((item, i) => (
              <details
                key={item.q}
                open={i === 0}
                className="group rounded-2xl border border-ink/[0.06] bg-white shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 marker:content-none sm:p-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/[0.05] font-display text-sm font-bold text-muted transition-colors group-open:bg-sky group-open:text-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-sans text-sm font-semibold text-ink">
                    {item.q}
                  </span>
                  <span
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/15 text-ink"
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4 transition-transform duration-200 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-muted sm:px-6 sm:pb-6 sm:pl-[4.75rem]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Финальный CTA ---------------- */}
      <section className="pb-24">
        <div className="container-page">
          <Card className="overflow-hidden border-0 bg-ink p-10 text-center text-white sm:p-16">
            <h2 className="mx-auto max-w-2xl text-3xl text-white sm:text-[2.75rem]">
              {t("finalCta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">{t("finalCta.subtitle")}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group w-full bg-white text-ink hover:bg-white/90 sm:w-auto"
              >
                <Link to="/auth?role=student">
                  {t("finalCta.ctaStudent")}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-white/25 bg-transparent text-white hover:border-white/40 hover:bg-white/10 sm:w-auto"
              >
                <Link to="/auth?role=parent">{t("finalCta.ctaParent")}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */

function SubjectCard({
  subject,
  t,
}: {
  subject: Subject;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  return (
    <Card className="flex items-start gap-4 p-6">
      <SubjectIcon subjectId={subject.id} size="lg" />
      <div>
        <h3 className="font-sans text-base font-semibold tracking-tight">
          {t(`subjects.${subject.id}.name`)}
        </h3>
        <p className="mt-1 text-sm text-muted">{t(`subjects.${subject.id}.tagline`)}</p>
        <p className="mt-2.5 text-xs font-medium text-muted">
          {subject.topicsCount} {t("subjectsSection.topics")} · {subject.videoLessonsCount}+{" "}
          {t("subjectsSection.videos")}
        </p>
      </div>
    </Card>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl sm:text-[2.5rem]">{title}</h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </div>
  );
}

const WIDGET_BG: Record<string, string> = {
  butter: "bg-butter-soft",
  mint: "bg-mint-soft",
  blush: "bg-blush-soft",
  sky: "bg-sky-soft",
  plain: "bg-white",
};

const WIDGET_ICON: Record<string, string> = {
  butter: "text-butter-ink",
  mint: "text-mint-ink",
  blush: "text-blush-ink",
  sky: "text-sky-ink",
  plain: "text-ink/55",
};

function WidgetCard({
  widget,
  className,
}: {
  widget: { icon: IconType; tone: string; metric: string; caption: string };
  className?: string;
}) {
  const Icon = widget.icon;
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-widget border border-ink/[0.05] px-4 py-3 shadow-float",
        WIDGET_BG[widget.tone],
        className,
      )}
    >
      <span
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/70",
          WIDGET_ICON[widget.tone],
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 text-left">
        <p className="text-lg font-semibold leading-none text-ink">{widget.metric}</p>
        <p className="mt-1 text-xs leading-tight text-ink/55">{widget.caption}</p>
      </div>
    </div>
  );
}

function PhoneMockup() {
  const { t } = useLocale();
  return (
    <div className="relative mx-auto w-[240px] sm:w-[264px]">
      <div className="rounded-[2.4rem] border-[10px] border-ink bg-ink shadow-pop">
        <div className="overflow-hidden rounded-[1.7rem] bg-white pb-1">
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="flex items-center gap-2">
              <Avatar name={t("x.landing.phoneName")} size="sm" color="#0B0B0C" />
              <div className="text-left">
                <p className="text-[11px] font-medium text-ink">{t("x.landing.phoneName")}</p>
                <p className="text-[10px] text-ink/55">{t("x.landing.phoneGrade")}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-pill bg-fire-50 px-2 py-0.5 text-[10px] font-semibold text-fire-600">
              <Flame className="h-3 w-3" aria-hidden="true" />
              {t("x.landing.phoneLive")}
            </span>
          </div>

          <div className="mx-4 mt-3 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blush-soft via-butter-soft to-mint-soft">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-float">
              <Play className="h-5 w-5 translate-x-[1px]" aria-hidden="true" />
            </span>
          </div>
          <p className="mx-4 mt-2 text-left text-[11px] font-medium text-ink">
            {t("x.landing.phoneLesson")}
          </p>
          <div className="mx-4 mt-1.5 h-1 overflow-hidden rounded-pill bg-ink/10">
            <div className="h-full w-2/3 rounded-pill bg-ink" />
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-ink/[0.06] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-butter-soft">
                <Flame
                  className="h-4 w-4 animate-flame text-butter-ink"
                  aria-hidden="true"
                />
              </span>
              <div className="text-left">
                <p className="text-[10px] text-ink/55">{t("x.landing.phoneStreak")}</p>
                <p className="text-sm font-semibold text-ink">{t("x.landing.streakCount")}</p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-mint-ink">{t("x.landing.phoneXp")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RotatingScrollBadge({ label }: { label: string }) {
  const repeated = `${label} • ${label} • `;
  return (
    <span className="relative grid h-16 w-16 place-items-center sm:h-20 sm:w-20">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path
            id="scrollBadgePath"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            fill="none"
          />
        </defs>
        <text className="fill-ink/70 text-[7.2px] font-semibold uppercase tracking-[0.1em]">
          <textPath href="#scrollBadgePath">{repeated}</textPath>
        </text>
      </svg>
      <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white sm:h-10 sm:w-10">
        <ArrowDown className="h-4 w-4" aria-hidden="true" />
      </span>
    </span>
  );
}

function MiniSparkline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 20" className={cn("h-4 w-14", className)} aria-hidden="true">
      <polyline
        points="0,16 10,14 20,15 28,9 38,10 48,4 60,2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StreakShowcase() {
  const { t, list } = useLocale();
  const days = list<string>("x.landing.weekdays");
  // Mon–Sat history with a frozen Thursday; Sunday is "today", not done yet.
  const state: ("done" | "frozen" | "today")[] = ["done", "done", "done", "frozen", "done", "done", "today"];
  const label = { done: t("x.landing.dayDone"), frozen: t("x.landing.dayFrozen"), today: t("x.landing.dayToday") };
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{t("x.landing.showcaseCurrent")}</p>
          <p className="mt-1 font-display text-4xl font-semibold text-ink">{t("x.landing.streakCount")}</p>
        </div>
        <span className="grid h-14 w-14 place-items-center rounded-full bg-butter-soft">
          <Flame className="h-7 w-7 animate-flame text-butter-ink" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <div key={d} className="text-center">
            <div
              className={cn(
                "grid h-9 w-full place-items-center rounded-xl text-xs font-semibold",
                state[i] === "done" && "bg-ink text-white",
                state[i] === "frozen" && "bg-sky text-sky-ink",
                state[i] === "today" && "border-2 border-dashed border-ink/30 text-ink/50",
              )}
              aria-label={`${d}: ${label[state[i]]}`}
            >
              {state[i] === "done" ? "✓" : state[i] === "frozen" ? <Snowflake className="h-4 w-4" aria-hidden="true" /> : "·"}
            </div>
            <p className="mt-1 text-[11px] text-muted">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">{t("x.landing.showcaseNote")}</p>
    </Card>
  );
}

/** Mini parent-dashboard preview for the "For parents" section. */
function ParentMock() {
  const { t } = useLocale();
  const rows = [
    { id: "math" as const, pct: 50, bar: "bg-violet-600" },
    { id: "english" as const, pct: 67, bar: "bg-blue-600" },
    { id: "science" as const, pct: 75, bar: "bg-teal-600" },
  ];
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-ink shadow-float" aria-hidden="true">
      <div className="flex items-center gap-3">
        <Avatar name={t("x.landing.phoneName")} size="sm" color="#6C4CF1" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{t("x.landing.mockChild")}</p>
          <p className="text-xs text-muted">{t("x.landing.mockToday")}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-pill bg-butter-soft px-2 py-1 text-xs font-bold text-butter-ink">
          <Flame className="h-3.5 w-3.5" aria-hidden="true" />
          15
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {rows.map((r) => (
          <li key={r.id}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{t(`subjects.${r.id}.name`)}</span>
              <span className="font-semibold text-ink/70">{r.pct}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-pill bg-ink/[0.06]">
              <div className={cn("h-full rounded-pill", r.bar)} style={{ width: `${r.pct}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}
