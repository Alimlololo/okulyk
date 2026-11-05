import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Flame,
  ListChecks,
  PartyPopper,
  Snowflake,
  Sparkles,
} from "lucide-react";
import { useActivity, useAppStore, useCurrentStudent, useDailyPlan } from "@/store/AppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { pluralDays } from "@/components/shared/StreakFlame";
import { StreakCalendar } from "@/components/student/StreakCalendar";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { InsightList, type InsightRow } from "@/components/dashboard/InsightList";
import { ActivityPreviewList } from "@/components/dashboard/ActivityPreviewList";
import { getSubject, SUBJECT_GROUPS } from "@/data/subjects";
import { getLesson } from "@/data/lessons";
import { completedItemCount, isDailyGoalMet } from "@/lib/streak";
import { todayKey } from "@/lib/date";
import { streakWeek, weeklyTasks, windowValues } from "@/lib/stats";
import { usePageTitle } from "@/lib/usePageTitle";
import { useActivityRows } from "@/lib/useActivityRows";
import { useLocale } from "@/i18n";
import type { Locale } from "@/i18n";
import type { DailyPlanItem, LessonStatus, SubjectGroupId } from "@/types";

const STREAK_MILESTONES = [7, 14, 30, 60, 100];

export function StudentDashboard() {
  const student = useCurrentStudent();
  const plan = useDailyPlan(student?.id);
  const { startPlanItem, useStreakFreeze, markWelcomeSeen, logout } = useAppStore();
  const activity = useActivity(student?.id);
  const activityRows = useActivityRows(activity.slice(0, 5));
  const navigate = useNavigate();
  const { t, pick, locale } = useLocale();
  const [group, setGroup] = useState<SubjectGroupId>("exam");
  const [isNewcomer] = useState(() => student?.hasSeenWelcome === false);

  usePageTitle(t("studentShell.navDashboard"));

  useEffect(() => {
    if (isNewcomer && student) markWelcomeSeen(student.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewcomer, student?.id]);

  // Open the tab that still has unfinished work.
  useEffect(() => {
    if (!plan) return;
    const pending = (g: SubjectGroupId) =>
      plan.items.some((it) => SUBJECT_GROUPS[g].includes(it.subjectId) && it.status !== "completed");
    if (!pending("exam") && pending("language")) setGroup("language");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan?.id]);

  if (!student || !plan) return null;

  const goalMet = isDailyGoalMet(plan);
  const doneCount = completedItemCount(plan);
  const allDone = plan.items.length > 0 && doneCount === plan.items.length;
  const today = todayKey();
  const todayEntry = student.streak.history.find((d) => d.date === today);
  const frozenToday = Boolean(todayEntry?.frozen);
  const remaining = Math.max(0, plan.minItemsToKeepStreak - doneCount);

  const statusMeta: Record<LessonStatus, { label: string; tone: "neutral" | "warning" | "success" }> = {
    not_started: { label: t("studentDashboard.statusNotStarted"), tone: "neutral" },
    in_progress: { label: t("studentDashboard.statusInProgress"), tone: "warning" },
    completed: { label: t("studentDashboard.statusCompleted"), tone: "success" },
  };

  const greeting = isNewcomer
    ? pick("messages.welcomeNew", `new-${student.id}`, { name: student.name })
    : pick("messages.welcomeBack", `back-${student.id}-${today}`, { name: student.name });

  const milestone = STREAK_MILESTONES.includes(student.streak.current) ? student.streak.current : null;
  const completionMessage = milestone
    ? pick("messages.streakMilestone", `milestone-${student.id}-${student.streak.current}`, { count: milestone })
    : pick("messages.dailyComplete", `done-${student.id}-${today}`);

  const itemsOf = (g: SubjectGroupId) => plan.items.filter((it) => SUBJECT_GROUPS[g].includes(it.subjectId));
  const doneOf = (g: SubjectGroupId) => itemsOf(g).filter((it) => it.status === "completed").length;
  const groupItems = itemsOf(group);

  // ---- Metric cards (real data) ----
  const tasksWeek = weeklyTasks(activity);
  const xpWeek = windowValues(student.xp.byDay, 7).map((d) => d.value);
  const xpTotal = xpWeek.reduce((a, b) => a + b, 0);

  // ---- Subject insight: only the subjects the student prepares for ----
  const insightRows: InsightRow[] = student.subjectProgress
    .filter((p) => student.selectedSubjects.includes(p.subjectId))
    .sort((a, b) => b.percent - a.percent)
    .map((p) => {
      const subject = getSubject(p.subjectId);
      return {
        key: p.subjectId,
        icon: <span aria-hidden="true">{subject.icon}</span>,
        label: t(`subjects.${p.subjectId}.name`),
        percent: p.percent,
        barClassName: subject.theme.solid,
      };
    });

  function openLesson(item: DailyPlanItem) {
    startPlanItem(student!.id, item.lessonId);
    navigate(`/student/lesson/${item.lessonId}`);
  }

  function freeze() {
    if (window.confirm(t("x.dash.freezeConfirm"))) useStreakFreeze(student!.id);
  }

  const diagnosticPending = student.diagnostic && !student.diagnostic.done;

  return (
    <div className="space-y-6">
      <DashboardTopBar
        title={t("studentDashboard.hello", { name: student.name })}
        subtitle={greeting}
        avatarName={student.name}
        avatarColor={student.avatarColor}
        onLogout={logout}
      />

      {diagnosticPending && (
        <Card className="border-transparent bg-sky-soft shadow-none">
          <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-sky-ink">{t("studentDashboard.diagnosticBanner")}</p>
            <Button size="sm" className="shrink-0" onClick={() => navigate("/student/diagnostic")}>
              {t("studentDashboard.diagnosticContinue")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CardContent>
        </Card>
      )}

      {plan.items.length > 0 &&
        (allDone ? (
          <Card className="border-transparent bg-mint-soft shadow-none">
            <CardContent className="flex items-center gap-3 py-4">
              <PartyPopper className="h-6 w-6 shrink-0 text-mint-ink" aria-hidden="true" />
              <p className="text-sm font-semibold text-mint-ink">{completionMessage}</p>
            </CardContent>
          </Card>
        ) : goalMet || frozenToday ? (
          <Card className="border-transparent bg-mint-soft shadow-none">
            <CardContent className="flex items-center gap-3 py-4">
              {frozenToday && !goalMet ? (
                <Snowflake className="h-6 w-6 shrink-0 text-sky-ink" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-6 w-6 shrink-0 text-mint-ink" aria-hidden="true" />
              )}
              <p className="text-sm font-semibold text-mint-ink">
                {frozenToday && !goalMet
                  ? t("x.dash.frozenToday")
                  : t("studentDashboard.goalMetBanner", { count: student.streak.current })}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-fire-200 bg-fire-50 shadow-none">
            <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 shrink-0 text-fire-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-fire-900">{t("studentDashboard.riskTitle")}</p>
                  <p className="text-sm text-fire-800">
                    {t("studentDashboard.riskBody", { count: remaining, word: taskWord(remaining, locale) })}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 border-fire-200 bg-white text-fire-700 hover:bg-fire-100"
                onClick={freeze}
                disabled={student.streak.freezesAvailable <= 0}
                title={student.streak.freezesAvailable > 0 ? t("studentDashboard.freezeOn") : t("studentDashboard.freezeOff")}
              >
                <Snowflake className="h-4 w-4" aria-hidden="true" />
                {t("studentDashboard.freeze")} ({student.streak.freezesAvailable})
              </Button>
            </CardContent>
          </Card>
        ))}

      {/* ---- Metric cards ---- */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          tone="sun"
          label={t("studentDashboard.streakLabel")}
          icon={<Flame className="h-4 w-4" aria-hidden="true" />}
          value={`${student.streak.current} ${pluralDays(student.streak.current, locale)}`}
          caption={t("x.dash.record", {
            count: student.streak.longest,
            word: pluralDays(student.streak.longest, locale),
          })}
          chart={streakWeek(student.streak.history).map((v) => v + 0.15)}
          chartLabel={t("x.dash.perDay")}
        />
        <MetricCard
          tone="berry"
          label={t("studentDashboard.metricTasksWeek")}
          icon={<ListChecks className="h-4 w-4" aria-hidden="true" />}
          value={String(tasksWeek.total)}
          trend={tasksWeek.trend && { ...tasksWeek.trend, caption: t("common.vsLastWeek") }}
          caption={t("x.dash.perDay")}
          chart={tasksWeek.perDay}
          chartLabel={t("x.dash.perDay")}
        />
        <MetricCard
          tone="leaf"
          label={t("studentDashboard.xpWeek")}
          icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
          value={String(xpTotal)}
          caption={t("x.dash.xpGoal", { count: student.xp.weeklyGoal })}
          chart={xpWeek}
          chartLabel={t("x.dash.perDay")}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* -------- Daily plan -------- */}
        <section className="min-w-0 lg:col-span-2">
          <Tabs
            items={[
              { value: "exam", label: `${t("studentDashboard.tabExam")} · ${doneOf("exam")}/${itemsOf("exam").length}` },
              {
                value: "language",
                label: `${t("studentDashboard.tabLanguage")} · ${doneOf("language")}/${itemsOf("language").length}`,
              },
            ]}
            value={group}
            onValueChange={(v) => setGroup(v as SubjectGroupId)}
            className="mb-4"
          />

          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold">{t("studentDashboard.todayTasks")}</h2>
            <Badge tone="mint">
              {doneCount}/{plan.items.length} {t("studentDashboard.doneOf")}
            </Badge>
          </div>

          {groupItems.length === 0 ? (
            <EmptyState
              icon="🎯"
              title={t("studentDashboard.emptyTitle")}
              description={t("studentDashboard.emptyDesc")}
              action={
                <Button size="sm" onClick={() => navigate("/student/subjects")}>
                  {t("studentDashboard.pickSubjects")}
                </Button>
              }
            />
          ) : (
            <ul className="space-y-3">
              {groupItems.map((item) => {
                const subject = getSubject(item.subjectId);
                const lesson = getLesson(item.lessonId);
                const meta = statusMeta[item.status];
                const pct =
                  item.status === "completed"
                    ? 100
                    : Math.round((item.completedTasks / Math.max(1, item.totalTasks)) * 100);
                return (
                  <li key={item.lessonId}>
                    <Card className="border-ink/[0.06] p-4 shadow-none">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                          <SubjectIcon subjectId={item.subjectId} />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-bold text-ink">{t(`subjects.${subject.id}.name`)}</p>
                              <Badge tone={meta.tone}>{meta.label}</Badge>
                            </div>
                            <p className="mt-0.5 line-clamp-2 text-sm text-muted">
                              {lesson?.title ?? t("studentDashboard.lesson")}
                            </p>
                            <div className="mt-2.5 flex items-center gap-3">
                              <Progress
                                value={pct}
                                size="sm"
                                indicatorClassName={subject.theme.solid}
                                label={`${t(`subjects.${subject.id}.name`)}: ${item.completedTasks}/${item.totalTasks}`}
                              />
                              <span className="shrink-0 text-xs font-semibold text-muted">
                                {item.completedTasks}/{item.totalTasks}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="shrink-0 self-end sm:self-center"
                          variant={item.status === "completed" ? "outline" : "primary"}
                          onClick={() => openLesson(item)}
                        >
                          {item.status === "completed"
                            ? t("studentDashboard.repeatBtn")
                            : item.status === "in_progress"
                              ? t("studentDashboard.continueBtn")
                              : t("studentDashboard.startBtn")}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* -------- Streak calendar -------- */}
        <section className="min-w-0">
          <div className="rounded-card border border-ink/[0.06] p-5">
            <h3 className="text-base font-bold text-ink">{t("studentDashboard.streakCalendar")}</h3>
            <div className="mt-3">
              <StreakCalendar history={student.streak.history} days={14} />
            </div>
            <p className="mt-4 flex items-center gap-1.5 rounded-xl bg-ink/[0.03] px-3 py-2 text-xs text-muted">
              <Snowflake className="h-3.5 w-3.5" aria-hidden="true" />
              {t("x.dash.freezesLeft", { count: student.streak.freezesAvailable })}
            </p>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {insightRows.length > 0 && (
          <InsightList title={t("studentDashboard.insightTitle")} rows={insightRows} />
        )}
        <ActivityPreviewList
          title={t("studentDashboard.recentActivity")}
          rows={activityRows}
          empty={t("x.dash.noActivityYet")}
        />
      </div>
    </div>
  );
}

/** Pluralizes the "task(s)" word inside studentDashboard.riskBody per language. */
function taskWord(n: number, locale: Locale): string {
  if (locale === "kz") return "тапсырма"; // Kazakh nouns don't inflect after a numeral
  if (locale === "en") return Math.abs(n) === 1 ? "task" : "tasks";
  const abs = Math.abs(n);
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) return "задание";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "задания";
  return "заданий";
}
