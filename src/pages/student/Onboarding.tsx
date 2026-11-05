import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useAppStore, useCurrentStudent } from "@/store/AppStore";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/shared/Logo";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { SUBJECTS } from "@/data/subjects";
import { LOAD_LEVELS, LOAD_TASK_COUNTS } from "@/data/load";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n";
import { usePageTitle } from "@/lib/usePageTitle";
import type { LoadLevel, SubjectId } from "@/types";

type Step = "grade" | "subjects" | "load" | "done";
/** Steps counted in the "Step N of M" header — the final screen is a summary, not a step. */
const STEP_ORDER: Step[] = ["grade", "subjects", "load"];

const LOAD_LABEL_KEY: Record<LoadLevel, string> = {
  light: "onboarding.loadLight",
  standard: "onboarding.loadStandard",
  intense: "onboarding.loadIntense",
};

export function OnboardingPage() {
  const student = useCurrentStudent();
  const { completeOnboarding } = useAppStore();
  const navigate = useNavigate();
  const { t } = useLocale();

  const [step, setStep] = useState<Step>("grade");
  const [grade, setGrade] = useState<number>(student?.grade ?? 5);
  const [subjects, setSubjects] = useState<SubjectId[]>([]);
  const [loadLevel, setLoadLevel] = useState<LoadLevel>("standard");

  usePageTitle(t("onboarding.gradeTitle"));

  if (!student) return null;

  const stepIdx = step === "done" ? STEP_ORDER.length : STEP_ORDER.indexOf(step) + 1;
  const totalSteps = STEP_ORDER.length;

  function toggleSubject(id: SubjectId) {
    setSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  function finish() {
    completeOnboarding(student!.id, { grade, subjects, loadLevel });
    navigate("/student/diagnostic", { replace: true });
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 h-[28rem] w-[42rem] max-w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-br from-butter/35 via-blush/30 to-mint/35 blur-[110px]"
      />
      <div className="container-page flex min-h-dvh max-w-2xl flex-col py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="text-xs font-bold text-muted">
            {step === "done"
              ? t("x.onboarding.ready")
              : t("onboarding.stepOf", { current: stepIdx, total: totalSteps })}
          </span>
        </div>
        <Progress
          value={(stepIdx / totalSteps) * 100}
          className="mt-3"
          label="Onboarding progress"
        />

        <div className="flex flex-1 flex-col justify-center py-8">
          {/* ---------- Step 1: grade ---------- */}
          {step === "grade" && (
            <div className="animate-fade-up">
              <h1 className="text-2xl sm:text-3xl">{t("onboarding.gradeTitle")}</h1>
              <p className="mt-1 text-sm text-muted">{t("onboarding.gradeSubtitle")}</p>
              <div className="mt-6 grid grid-cols-7 gap-1.5 sm:gap-3">
                {Array.from({ length: 7 }, (_, i) => i + 1).map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={grade === g}
                    onClick={() => setGrade(g)}
                    className={cn(
                      "aspect-square rounded-xl border-2 text-lg font-bold transition-colors sm:rounded-2xl sm:text-xl",
                      grade === g
                        ? "border-ink bg-ink text-white"
                        : "border-ink/10 bg-white text-ink hover:border-ink/25",
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setStep("subjects")}>
                  {t("common.next")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          {/* ---------- Step 2: subjects ---------- */}
          {step === "subjects" && (
            <div className="animate-fade-up">
              <h1 className="text-2xl sm:text-3xl">{t("onboarding.subjectsTitle")}</h1>
              <p className="mt-1 text-sm text-muted">{t("onboarding.subjectsSubtitle")}</p>
              <div className="mt-6 space-y-2">
                {SUBJECTS.map((s) => {
                  const active = subjects.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleSubject(s.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors",
                        active
                          ? "border-ink bg-ink/[0.04]"
                          : "border-ink/10 bg-white hover:border-ink/25",
                      )}
                    >
                      <SubjectIcon subjectId={s.id} />
                      <span className="flex-1">
                        <span className="block text-sm font-bold text-ink">
                          {t(`subjects.${s.id}.name`)}
                        </span>
                        <span className="block text-xs text-muted">
                          {t(`subjects.${s.id}.tagline`)}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "grid h-6 w-6 place-items-center rounded-full border-2",
                          active ? "border-ink bg-ink text-white" : "border-ink/20",
                        )}
                        aria-hidden="true"
                      >
                        {active && <Check className="h-4 w-4" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep("grade")}>
                  {t("common.back")}
                </Button>
                <Button disabled={subjects.length === 0} onClick={() => setStep("load")}>
                  {t("common.next")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          {/* ---------- Step 3: daily load ---------- */}
          {step === "load" && (
            <div className="animate-fade-up">
              <h1 className="text-2xl sm:text-3xl">{t("onboarding.loadTitle")}</h1>
              <p className="mt-1 text-sm text-muted">{t("onboarding.loadSubtitle")}</p>
              <div className="mt-6 space-y-2">
                {LOAD_LEVELS.map((level) => {
                  const active = loadLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setLoadLevel(level)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left transition-colors",
                        active
                          ? "border-ink bg-ink/[0.04]"
                          : "border-ink/10 bg-white hover:border-ink/25",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-bold text-ink">
                          {t(LOAD_LABEL_KEY[level])}
                        </span>
                        <span className="block text-xs text-muted">
                          {t("onboarding.loadTasksPerDay", { count: LOAD_TASK_COUNTS[level] })}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2",
                          active ? "border-ink bg-ink text-white" : "border-ink/20",
                        )}
                        aria-hidden="true"
                      >
                        {active && <Check className="h-4 w-4" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep("subjects")}>
                  {t("common.back")}
                </Button>
                <Button onClick={() => setStep("done")}>
                  {t("common.next")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          {/* ---------- Step 4: ready for the diagnostic ---------- */}
          {step === "done" && (
            <div className="animate-fade-up text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-ink text-3xl">
                🎯
              </div>
              <h1 className="mt-4 text-2xl sm:text-3xl">
                {t("onboarding.doneGreeting", { name: student.name })}
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                {t("onboarding.diagnosticIntro")}
              </p>

              <div className="mx-auto mt-6 max-w-sm space-y-2 text-left">
                {subjects.map((sid) => (
                  <div
                    key={sid}
                    className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-card"
                  >
                    <SubjectIcon subjectId={sid} size="sm" />
                    <span className="flex-1 text-sm font-semibold text-ink">
                      {t(`subjects.${sid}.name`)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-4 max-w-md text-xs text-muted">
                {t("onboarding.diagnosticNote")}
              </p>

              <Button size="lg" className="mt-6" onClick={finish}>
                {t("onboarding.startDiagnostic")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
