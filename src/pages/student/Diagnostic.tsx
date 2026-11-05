import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useAppStore, useCurrentStudent } from "@/store/AppStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/shared/Logo";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { diagnosticQuestionsFor } from "@/data/diagnostic";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/lib/usePageTitle";
import { useLocale } from "@/i18n";
import type { StartLevel, SubjectId } from "@/types";

export function DiagnosticPage() {
  const student = useCurrentStudent();
  const { startDiagnostic } = useAppStore();
  const { t } = useLocale();

  usePageTitle(t("onboarding.startDiagnostic"));

  useEffect(() => {
    if (student && !student.diagnostic) startDiagnostic(student.id);
  }, [student, startDiagnostic]);

  const diagnostic = student?.diagnostic;
  if (!student || !diagnostic) return null;
  if (diagnostic.done) return <DiagnosticResultScreen />;

  const subjectId = diagnostic.subjects[diagnostic.subjectIndex];
  if (!subjectId) return null;
  // Keyed by subject so the question cursor resets for each new subject.
  return <SubjectQuiz key={subjectId} subjectId={subjectId} />;
}

function SubjectQuiz({ subjectId }: { subjectId: SubjectId }) {
  const student = useCurrentStudent()!;
  const diagnostic = student.diagnostic!;
  const { answerDiagnosticQuestion, advanceDiagnosticSubject } = useAppStore();
  const navigate = useNavigate();
  const { t } = useLocale();

  const questions = useMemo(() => diagnosticQuestionsFor(subjectId), [subjectId]);
  // Resume at the first unanswered question.
  const [qIndex, setQIndex] = useState(() => {
    const idx = questions.findIndex((q) => !(q.id in diagnostic.answers));
    return idx === -1 ? Math.max(0, questions.length - 1) : idx;
  });

  const question = questions[qIndex];
  const answeredCount = questions.filter((q) => q.id in diagnostic.answers).length;
  const subjectDone = answeredCount === questions.length;
  const totalSubjects = diagnostic.subjects.length;
  const picked = question ? diagnostic.answers[question.id] : undefined;
  const isLastQuestion = qIndex === questions.length - 1;

  function next() {
    if (!isLastQuestion) {
      setQIndex((i) => i + 1);
      return;
    }
    if (subjectDone) advanceDiagnosticSubject(student.id);
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 h-[28rem] w-[42rem] max-w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky/35 via-blush/30 to-mint/35 blur-[110px]"
      />
      <div className="container-page flex min-h-dvh max-w-2xl flex-col py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Button variant="ghost" size="sm" onClick={() => navigate("/student")}>
            {t("diagnostic.saveAndExit")}
          </Button>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t("diagnostic.subjectOf", { current: diagnostic.subjectIndex + 1, total: totalSubjects })}
          </p>
          <Progress
            value={((diagnostic.subjectIndex + answeredCount / Math.max(1, questions.length)) / totalSubjects) * 100}
            className="mt-2"
            label={t("diagnostic.subjectOf", { current: diagnostic.subjectIndex + 1, total: totalSubjects })}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center py-8">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3">
              <SubjectIcon subjectId={subjectId} />
              <div>
                <h1 className="text-xl sm:text-2xl">{t(`subjects.${subjectId}.name`)}</h1>
                <p className="text-xs text-muted">
                  {t("diagnostic.questionOf", { current: qIndex + 1, total: questions.length })}
                </p>
              </div>
            </div>

            <Progress
              value={(answeredCount / Math.max(1, questions.length)) * 100}
              size="sm"
              className="mt-4"
              indicatorClassName="bg-sky-ink"
              label={t("diagnostic.questionOf", { current: qIndex + 1, total: questions.length })}
            />

            {question && (
              <Card className="mt-4">
                <CardContent>
                  <p className="text-lg font-bold text-ink">{question.prompt}</p>
                  <div className="mt-4 space-y-2" role="radiogroup" aria-label={question.prompt}>
                    {question.options.map((opt) => {
                      const isPicked = picked === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          role="radio"
                          aria-checked={isPicked}
                          onClick={() => answerDiagnosticQuestion(student.id, question.id, opt.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors",
                            isPicked
                              ? "border-ink bg-ink/[0.04] text-ink"
                              : "border-ink/10 bg-white hover:border-ink/25",
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
                              isPicked ? "border-ink bg-ink text-white" : "border-ink/20",
                            )}
                            aria-hidden="true"
                          >
                            {isPicked && <Check className="h-3 w-3" />}
                          </span>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => setQIndex((i) => Math.max(0, i - 1))}
                disabled={qIndex === 0}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t("x.diagnostic.prevQuestion")}
              </Button>
              <Button disabled={!picked || (isLastQuestion && !subjectDone)} onClick={next}>
                {!isLastQuestion
                  ? t("x.diagnostic.nextQuestion")
                  : diagnostic.subjectIndex + 1 < totalSubjects
                    ? t("diagnostic.nextSubject")
                    : t("diagnostic.finish")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagnosticResultScreen() {
  const student = useCurrentStudent()!;
  const navigate = useNavigate();
  const { t } = useLocale();
  const diagnostic = student.diagnostic!;

  const LEVEL_LABEL: Record<StartLevel, string> = {
    beginner: t("x.diagnostic.levelBeginner"),
    core: t("x.diagnostic.levelCore"),
    advanced: t("x.diagnostic.levelAdvanced"),
  };

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 h-[28rem] w-[42rem] max-w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-mint/35 via-sky/30 to-blush/35 blur-[110px]"
      />
      <div className="container-page flex min-h-dvh max-w-2xl flex-col items-center justify-center py-10 text-center">
        <div className="animate-fade-up">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-mint-soft text-3xl" aria-hidden="true">
            🎉
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl">{t("diagnostic.doneTitle")}</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            {t("diagnostic.doneSubtitle", { name: student.name })}
          </p>

          <div className="mx-auto mt-6 max-w-sm space-y-2 text-left">
            {diagnostic.subjects.map((sid) => {
              const level = student.diagnosticLevel?.[sid] ?? "core";
              return (
                <div key={sid} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-card">
                  <SubjectIcon subjectId={sid} size="sm" />
                  <span className="flex-1 text-sm font-semibold text-ink">{t(`subjects.${sid}.name`)}</span>
                  <span className="rounded-pill bg-mint-soft px-2.5 py-1 text-xs font-bold text-mint-ink">
                    {LEVEL_LABEL[level]}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mx-auto mt-4 max-w-md text-xs text-muted">{t("diagnostic.levelNote")}</p>

          <Button size="lg" className="mt-6" onClick={() => navigate("/student")}>
            {t("onboarding.toDashboard")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
