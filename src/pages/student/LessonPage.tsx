import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Play, Sparkles, Video } from "lucide-react";
import { useAppStore, useCurrentStudent, useDailyPlan } from "@/store/AppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { StreakFlame } from "@/components/shared/StreakFlame";
import { TaskView } from "@/components/student/TaskView";
import { getLesson } from "@/data/lessons";
import { tasksForLesson, tasksForSubjectCount } from "@/data/tasks";
import { getSubject } from "@/data/subjects";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/lib/usePageTitle";
import { useLocale } from "@/i18n";
import type { LessonResult } from "@/store/AppStore";

type Phase = "video" | "practice" | "result";

export function LessonPage() {
  const { lessonId = "" } = useParams();
  const navigate = useNavigate();
  const student = useCurrentStudent();
  const plan = useDailyPlan(student?.id);
  const { finishLesson, startPlanItem, recordTaskProgress, markVideoWatched } = useAppStore();
  const { t } = useLocale();

  const lesson = getLesson(lessonId);
  const subject = lesson ? getSubject(lesson.subjectId) : null;
  // Today's plan sets how many tasks this subject gets (the load setting) —
  // fall back to the lesson's own task set when opened outside the plan.
  const planItem = plan?.items.find((it) => it.lessonId === lessonId);
  const totalFromPlan = planItem?.totalTasks;
  const level = subject ? student?.diagnosticLevel?.[subject.id] : undefined;
  const tasks = useMemo(() => {
    if (totalFromPlan && subject) return tasksForSubjectCount(subject.id, totalFromPlan, level);
    return tasksForLesson(lessonId);
  }, [lessonId, totalFromPlan, subject, level]);

  // Resume an interrupted practice from the saved question.
  const resumeAt =
    planItem && planItem.status === "in_progress" && planItem.completedTasks > 0 && planItem.completedTasks < planItem.totalTasks
      ? planItem.completedTasks
      : 0;

  const [phase, setPhase] = useState<Phase>("video");
  const [current, setCurrent] = useState(resumeAt);
  const [correctCount, setCorrectCount] = useState(resumeAt ? planItem?.correctTasks ?? 0 : 0);
  const [answeredCurrent, setAnsweredCurrent] = useState(false);
  const [videoOpened, setVideoOpened] = useState(false);
  const [result, setResult] = useState<LessonResult | null>(null);

  usePageTitle(lesson?.title);

  useEffect(() => {
    if (lesson && student) startPlanItem(student.id, lesson.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  if (!student) return null;

  if (!lesson || !subject || tasks.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <BackLink />
        <EmptyState
          className="mt-4"
          icon="🔍"
          title={t("lesson.notFoundTitle")}
          description={t("lesson.notFoundDesc")}
          action={
            <Button size="sm" onClick={() => navigate("/student")}>
              {t("lesson.toDashboard")}
            </Button>
          }
        />
      </div>
    );
  }

  const answeredTotal = current + (answeredCurrent ? 1 : 0);

  function handleChecked(isCorrect: boolean) {
    setAnsweredCurrent(true);
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function handleNext() {
    if (current < tasks.length - 1) {
      recordTaskProgress(student!.id, lesson!.id, current + 1, correctCount);
      setCurrent((c) => c + 1);
      setAnsweredCurrent(false);
      return;
    }
    // Practice finished — commit result to the store.
    const res = finishLesson(student!.id, lesson!.id, { correct: correctCount, total: tasks.length });
    setResult(res);
    setPhase("result");
  }

  function openVideo() {
    setVideoOpened(true);
    markVideoWatched(student!.id, lesson!.id);
  }

  const nextPlanItem = plan?.items.find((it) => it.lessonId !== lesson.id && it.status !== "completed");
  const leaveGuard = phase === "practice" && answeredTotal > 0 ? t("x.lesson.leaveConfirm") : undefined;

  return (
    <div className="mx-auto max-w-2xl">
      <BackLink confirmText={leaveGuard} />

      <div className="mt-4 flex items-center gap-3">
        <SubjectIcon subjectId={subject.id} />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t(`subjects.${subject.id}.name`)}
          </p>
          <h1 className="text-xl sm:text-2xl">{lesson.title}</h1>
        </div>
      </div>

      {/* ---------------- Video phase ---------------- */}
      {phase === "video" && (
        <Card className="mt-5 overflow-hidden">
          <div
            className="relative flex aspect-video items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${subject.color}22, ${subject.color}0a)` }}
          >
            <div className="absolute left-3 top-3">
              <Badge tone="neutral" className="bg-white/85">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {lesson.durationMin} {t("lesson.duration")}
              </Badge>
            </div>
            {videoOpened ? (
              <div className="max-w-xs px-6 text-center" role="status">
                <Video className="mx-auto h-8 w-8 text-ink/50" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold text-ink">{t("x.lesson.videoSoonTitle")}</p>
                <p className="mt-1 text-xs text-ink/70">{t("x.lesson.videoSoonDesc")}</p>
              </div>
            ) : (
              <button type="button" onClick={openVideo} className="group flex flex-col items-center gap-2">
                <span
                  className="grid h-16 w-16 place-items-center rounded-full text-white shadow-pop transition-transform group-hover:scale-105"
                  style={{ backgroundColor: subject.color }}
                >
                  <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" aria-hidden="true" />
                </span>
                <span className="text-sm font-bold text-ink">{t("x.lesson.watchVideo")}</span>
              </button>
            )}
          </div>
          <CardContent>
            <p className="text-sm text-ink/75">{lesson.summary}</p>
            {resumeAt > 0 && (
              <p className="mt-3 text-xs font-semibold text-sky-ink">
                {t("x.lesson.resumed", { current: resumeAt + 1 })}
              </p>
            )}
            <Button className="mt-4 w-full" onClick={() => setPhase("practice")}>
              {t("lesson.toPractice")}
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ---------------- Practice phase ---------------- */}
      {phase === "practice" && (
        <div className="mt-5">
          <Progress
            value={(answeredTotal / tasks.length) * 100}
            indicatorClassName={subject.theme.solid}
            className="mb-4"
            label={t("x.lesson.answered", { answered: answeredTotal, total: tasks.length, correct: correctCount })}
          />
          <Card>
            <CardContent>
              <TaskView
                key={`${tasks[current].id}-${current}`}
                task={tasks[current]}
                index={current}
                total={tasks.length}
                onChecked={handleChecked}
                onNext={handleNext}
                isLast={current === tasks.length - 1}
              />
            </CardContent>
          </Card>
          <p className="mt-3 text-center text-xs text-muted">
            {t("x.lesson.answered", { answered: answeredTotal, total: tasks.length, correct: correctCount })}
          </p>
        </div>
      )}

      {/* ---------------- Result phase ---------------- */}
      {phase === "result" && result && (
        <Card className="mt-5 overflow-hidden">
          <div
            className="px-6 py-8 text-center text-white"
            style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}cc)` }}
          >
            <p className="text-sm font-semibold opacity-90">{t("lesson.practiceDone")}</p>
            <p className="mt-1 font-display text-5xl font-semibold">
              {result.correct}/{result.total}
            </p>
            <p className="mt-1 text-sm opacity-90">{praise(result.correct / result.total, t)}</p>
          </div>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Stat
                label={t("lesson.xpEarned")}
                value={`+${result.xpEarned}`}
                hint={result.firstCompletionOfLesson ? undefined : t("lesson.repeatNoXp")}
              />
              <div className="rounded-xl bg-butter-soft p-4 text-center">
                <p className="text-xs text-ink/60">{t("lesson.yourStreak")}</p>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <StreakFlame days={result.newStreak} size="md" />
                  {result.streakDelta > 0 && (
                    <span className="rounded-pill bg-white/70 px-2 py-0.5 text-xs font-semibold text-butter-ink">
                      +{result.streakDelta}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {result.goalJustMet && (
              <div className="rounded-xl bg-mint-soft p-3 text-center text-sm font-bold text-mint-ink">
                {t("lesson.goalDoneBanner")}
              </div>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/student")}>
                {t("lesson.backToDashboard")}
              </Button>
              {nextPlanItem && (
                <Button
                  className="flex-1"
                  onClick={() => {
                    startPlanItem(student.id, nextPlanItem.lessonId);
                    navigate(`/student/lesson/${nextPlanItem.lessonId}`);
                  }}
                >
                  {t("lesson.nextTask")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BackLink({ confirmText }: { confirmText?: string }) {
  const { t } = useLocale();
  return (
    <Link
      to="/student"
      onClick={(e) => {
        if (confirmText && !window.confirm(confirmText)) e.preventDefault();
      }}
      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-muted hover:text-ink"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {t("lesson.back")}
    </Link>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className={cn("rounded-xl bg-mint-soft p-4 text-center")}>
      <p className="text-xs text-ink/60">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-ink">{value}</p>
      {hint && <p className="text-[11px] text-ink/60">{hint}</p>}
    </div>
  );
}

function praise(ratio: number, t: (key: string) => string): string {
  if (ratio >= 1) return t("lesson.praisePerfect");
  if (ratio >= 0.8) return t("lesson.praiseGood");
  if (ratio >= 0.5) return t("lesson.praiseOk");
  return t("lesson.praiseRetry");
}
