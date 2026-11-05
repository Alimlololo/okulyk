import { Link } from "react-router-dom";
import { Flame, ListChecks, Target, TriangleAlert } from "lucide-react";
import { useParentContext } from "@/pages/parent/ParentShell";
import { useActivity, useAppStore, useCurrentParent } from "@/store/AppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { pluralDays } from "@/components/shared/StreakFlame";
import { MonthCalendar } from "@/components/parent/MonthCalendar";
import { StudyTimeChart } from "@/components/parent/StudyTimeChart";
import { ChildSwitcherCompact } from "@/components/parent/ChildSwitcherCompact";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { InsightList, type InsightRow } from "@/components/dashboard/InsightList";
import { ActivityPreviewList } from "@/components/dashboard/ActivityPreviewList";
import { getSubject } from "@/data/subjects";
import { DEFAULT_LOAD_LEVEL, LOAD_TASK_COUNTS } from "@/data/load";
import { streakWeek, weeklyScores, weeklyTasks, windowValues } from "@/lib/stats";
import { greetingKey, usePageTitle } from "@/lib/usePageTitle";
import { useActivityRows } from "@/lib/useActivityRows";
import { useLocale } from "@/i18n";

export function ParentOverview() {
  const { child, childId, setChildId, children } = useParentContext();
  const parent = useCurrentParent()!;
  const { logout } = useAppStore();
  const activity = useActivity(child.id);
  const activityRows = useActivityRows(activity.slice(0, 5));
  const { t, locale } = useLocale();

  usePageTitle(t("parentShell.navOverview"));

  const totalMinutesWeek = windowValues(child.studyMinutes, 7).reduce((sum, d) => sum + d.value, 0);
  const selectedProgress = child.subjectProgress.filter((p) => child.selectedSubjects.includes(p.subjectId));
  const activeSubjects = selectedProgress.filter((p) => p.percent > 0);

  // ---- Metric cards (real data) ----
  const tasksWeek = weeklyTasks(activity);
  const scores = weeklyScores(activity);
  const avgScore = activeSubjects.length
    ? Math.round(activeSubjects.reduce((s, p) => s + p.accuracy, 0) / activeSubjects.length)
    : 0;

  const insightRows: InsightRow[] = selectedProgress
    .slice()
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

  return (
    <div className="space-y-6">
      <DashboardTopBar
        title={t(greetingKey(), { name: parent.name })}
        subtitle={t("parentOverview.subtitleChild", { name: child.name })}
        avatarName={parent.name}
        avatarColor={parent.avatarColor}
        onLogout={logout}
        notificationsHref="/parent/notifications"
        identityExtra={<ChildSwitcherCompact items={children} value={childId} onChange={setChildId} />}
      />

      {/* ---- Metric cards ---- */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          tone="sun"
          calm
          label={t("parentOverview.metricStreak")}
          icon={<Flame className="h-4 w-4" aria-hidden="true" />}
          value={`${child.streak.current} ${pluralDays(child.streak.current, locale)}`}
          caption={t("x.dash.record", { count: child.streak.longest, word: pluralDays(child.streak.longest, locale) })}
          chart={streakWeek(child.streak.history).map((v) => v + 0.15)}
          chartLabel={t("x.dash.perDay")}
        />
        <MetricCard
          tone="berry"
          calm
          label={t("parentOverview.metricTasksWeek")}
          icon={<ListChecks className="h-4 w-4" aria-hidden="true" />}
          value={String(tasksWeek.total)}
          trend={tasksWeek.trend && { ...tasksWeek.trend, caption: t("common.vsLastWeek") }}
          caption={t("x.dash.perDay")}
          chart={tasksWeek.perDay}
          chartLabel={t("x.dash.perDay")}
        />
        <MetricCard
          tone="leaf"
          calm
          label={t("parentOverview.metricAvgScore")}
          icon={<Target className="h-4 w-4" aria-hidden="true" />}
          value={`${avgScore}%`}
          caption={t("x.dash.perDay")}
          chart={scores}
          chartLabel={t("x.dash.perDay")}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="min-w-0 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">{t("parentOverview.calendar")}</CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            <MonthCalendar history={child.streak.history} />
          </CardContent>
        </Card>

        <Card className="min-w-0 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TriangleAlert className="h-4 w-4 text-butter-ink" aria-hidden="true" />
              {t("parentOverview.needsAttention")}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3">
            {child.weakTopics.length === 0 ? (
              <p className="text-sm text-muted">{t("parentOverview.noWeakTopics")}</p>
            ) : (
              <ul className="space-y-2.5">
                {[...child.weakTopics]
                  .sort((a, b) => a.accuracy - b.accuracy)
                  .map((w) => (
                    <li key={`${w.subjectId}-${w.topic}`} className="flex items-start gap-3 rounded-xl bg-butter-soft p-3">
                      <SubjectIcon subjectId={w.subjectId} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">
                          {t(`subjects.${w.subjectId}.name`)} — {w.topic}
                        </p>
                        <p className="text-xs text-butter-ink">{t("x.parent.accuracy", { value: w.accuracy })}</p>
                        <p className="mt-0.5 text-xs text-ink/70">
                          {t("parentOverview.studyTogether")} {w.recommendedMinutes} {t("parentOverview.minutes")}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          {activeSubjects.length === 0 ? (
            <div className="rounded-card border border-ink/[0.06] p-5">
              <EmptyState
                icon="📊"
                title={t("parentOverview.noData")}
                description={t("parentOverview.noDataDesc", { name: child.name })}
              />
            </div>
          ) : (
            <InsightList title={t("parentOverview.insightTitle")} rows={insightRows} />
          )}
        </div>

        <Card className="min-w-0 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-base">{t("parentOverview.loadCard")}</CardTitle>
            <Link to="/parent/settings" className="shrink-0 text-xs font-semibold text-ink underline-offset-2 hover:underline">
              {t("parentOverview.loadChange")}
            </Link>
          </CardHeader>
          <CardContent className="space-y-2 pt-3">
            {child.selectedSubjects.length === 0 ? (
              <p className="text-sm text-muted">{t("x.parent.noSubjects", { name: child.name })}</p>
            ) : (
              child.selectedSubjects.map((id) => {
                const level = child.subjectLoad?.[id] ?? DEFAULT_LOAD_LEVEL;
                return (
                  <div key={id} className="flex items-center justify-between gap-2 rounded-xl bg-ink/[0.03] px-3 py-2">
                    <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-ink">
                      <SubjectIcon subjectId={id} size="sm" />
                      <span className="truncate">{t(`subjects.${id}.name`)}</span>
                    </span>
                    <span className="shrink-0 text-xs text-muted">
                      {t(`parentSettings.level${level.charAt(0).toUpperCase()}${level.slice(1)}`)} ·{" "}
                      {t("parentSettings.tasksPerDay", { count: LOAD_TASK_COUNTS[level] })}
                    </span>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="min-w-0 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">{t("parentOverview.studyTime")}</CardTitle>
            <p className="mt-1 text-sm text-muted">
              {t("parentOverview.totalWeek")}{" "}
              <span className="font-semibold text-ink">
                {totalMinutesWeek} {t("parentOverview.minutes")}
              </span>
            </p>
          </CardHeader>
          <CardContent className="pt-3">
            <StudyTimeChart data={child.studyMinutes} />
          </CardContent>
        </Card>

        <div className="min-w-0 lg:col-span-2">
          <ActivityPreviewList
            title={t("parentOverview.recentActivity")}
            rows={activityRows}
            empty={t("parentActivity.emptyDesc", { name: child.name })}
          />
        </div>
      </div>
    </div>
  );
}
