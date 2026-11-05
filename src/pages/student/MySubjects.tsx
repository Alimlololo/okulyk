import { useNavigate } from "react-router-dom";
import { ArrowRight, Minus, Plus, Target } from "lucide-react";
import { useCurrentStudent, useAppStore, useDailyPlan } from "@/store/AppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { SUBJECTS, SUBJECT_GROUPS } from "@/data/subjects";
import { lessonsBySubject } from "@/data/lessons";
import { usePageTitle } from "@/lib/usePageTitle";
import { useLocale } from "@/i18n";
import type { Subject, SubjectId } from "@/types";

export function MySubjectsPage() {
  const student = useCurrentStudent();
  const plan = useDailyPlan(student?.id);
  const { startPlanItem, toggleSubject, logout } = useAppStore();
  const navigate = useNavigate();
  const { t } = useLocale();

  usePageTitle(t("subjectsPage.title"));

  if (!student) return null;

  const progressById = new Map(student.subjectProgress.map((p) => [p.subjectId, p]));
  const selected = new Set(student.selectedSubjects);

  /** Today's planned lesson for the subject, else the next lesson after those completed. */
  function continueSubject(subjectId: SubjectId) {
    const lessons = lessonsBySubject(subjectId);
    if (lessons.length === 0) return;
    const planned = plan?.items.find((it) => it.subjectId === subjectId && it.status !== "completed");
    const done = progressById.get(subjectId)?.completedLessons ?? 0;
    const lessonId = planned?.lessonId ?? lessons[done % lessons.length].id;
    startPlanItem(student!.id, lessonId);
    navigate(`/student/lesson/${lessonId}`);
  }

  function renderCard(subject: Subject) {
    const p = progressById.get(subject.id);
    const percent = p?.percent ?? 0;
    const isSelected = selected.has(subject.id);
    const weak = student!.weakTopics.find((w) => w.subjectId === subject.id);
    const name = t(`subjects.${subject.id}.name`);

    return (
      <Card key={subject.id} className="flex flex-col">
        <CardContent className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <SubjectIcon subjectId={subject.id} size="lg" />
              <div className="min-w-0">
                <h2 className="text-base">{name}</h2>
                <p className="text-xs text-muted">
                  {p && p.completedLessons > 0
                    ? `${p.completedLessons} ${t("subjectsPage.lessonsOf", { total: p.totalLessons })}`
                    : t("subjectsPage.notStarted")}
                </p>
              </div>
            </div>
            {isSelected ? (
              <Badge tone="mint">{t("subjectsPage.inPrep")}</Badge>
            ) : (
              <Badge tone="neutral">{t("subjectsPage.notSelected")}</Badge>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-ink">{percent}%</span>
              {p && p.accuracy > 0 && (
                <span className="text-xs text-muted">{t("subjectsPage.accuracy", { value: p.accuracy })}</span>
              )}
            </div>
            <Progress value={percent} className="mt-1.5" indicatorClassName={subject.theme.solid} label={`${name}: ${percent}%`} />
          </div>

          {p?.lastTopic && (
            <p className="mt-3 text-xs text-muted">
              {t("subjectsPage.lastTopic")} <span className="font-semibold text-ink">{p.lastTopic}</span>
            </p>
          )}

          {weak && (
            <p className="mt-3 inline-flex items-center gap-1.5 self-start rounded-lg bg-butter-soft px-2.5 py-1.5 text-xs font-semibold text-butter-ink">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
              {t("subjectsPage.weakTopic")} {weak.topic}
            </p>
          )}

          <div className="mt-4 flex-1" />
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            {isSelected && (
              <Button className="flex-1" onClick={() => continueSubject(subject.id)}>
                {percent > 0 ? t("x.subjects.continue") : t("subjectsPage.start")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
            <Button
              variant={isSelected ? "ghost" : "outline"}
              className={isSelected ? "sm:flex-none" : "flex-1"}
              onClick={() => toggleSubject(student!.id, subject.id)}
            >
              {isSelected ? (
                <Minus className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Plus className="h-4 w-4" aria-hidden="true" />
              )}
              {isSelected ? t("x.subjects.remove") : t("x.subjects.add")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const examSubjects = SUBJECTS.filter((s) => SUBJECT_GROUPS.exam.includes(s.id));
  const languageSubjects = SUBJECTS.filter((s) => SUBJECT_GROUPS.language.includes(s.id));

  return (
    <div className="space-y-6">
      <DashboardTopBar
        title={t("subjectsPage.title")}
        subtitle={t("subjectsPage.subtitle")}
        avatarName={student.name}
        avatarColor={student.avatarColor}
        onLogout={logout}
      />

      {student.selectedSubjects.length === 0 && (
        <EmptyState icon="📚" title={t("subjectsPage.emptyTitle")} description={t("x.subjects.emptyDesc")} />
      )}

      <div className="space-y-8">
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">{t("subjectGroups.exam")}</h3>
          <div className="grid gap-4 sm:grid-cols-2">{examSubjects.map(renderCard)}</div>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-muted">{t("subjectGroups.language")}</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{languageSubjects.map(renderCard)}</div>
        </div>
      </div>
    </div>
  );
}
