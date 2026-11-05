import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import type { MatchingTask, Task } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n";

interface TaskViewProps {
  task: Task;
  index: number;
  total: number;
  onChecked: (correct: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?]+$/, "");
}

export function TaskView({ task, index, total, onChecked, onNext, isLast }: TaskViewProps) {
  const { t } = useLocale();
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  // Per-type answer state
  const [single, setSingle] = useState<string | null>(null);
  const [multi, setMulti] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<Record<number, string>>({});

  const TYPE_LABEL: Record<Task["type"], string> = {
    single_choice: t("task.typeSingle"),
    multi_choice: t("task.typeMulti"),
    text_input: t("task.typeText"),
    matching: t("task.typeMatching"),
  };

  const canCheck = useMemo(() => {
    if (checked) return false;
    switch (task.type) {
      case "single_choice":
        return single !== null;
      case "multi_choice":
        return multi.length > 0;
      case "text_input":
        return text.trim().length > 0;
      case "matching":
        return Object.keys(matches).length === task.pairs.length;
    }
  }, [checked, task, single, multi, text, matches]);

  function evaluate(): boolean {
    switch (task.type) {
      case "single_choice":
        return single === task.correctOptionId;
      case "multi_choice": {
        const want = [...task.correctOptionIds].sort().join(",");
        const got = [...multi].sort().join(",");
        return want === got;
      }
      case "text_input":
        return task.acceptedAnswers.some((a) => normalize(a) === normalize(text));
      case "matching":
        return task.pairs.every((p, i) => matches[i] === p.right);
    }
  }

  function handleCheck() {
    const isCorrect = evaluate();
    setCorrect(isCorrect);
    setChecked(true);
    onChecked(isCorrect);
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-muted">
        <span>{t("task.questionOf", { current: index + 1, total })}</span>
        <span className="uppercase tracking-wide">{TYPE_LABEL[task.type]}</span>
      </div>

      <p className="mt-2 text-lg font-bold text-ink">{task.prompt}</p>

      <div className="mt-4">
        {task.type === "single_choice" && (
          <div className="space-y-2" role="radiogroup" aria-label={t("task.answerOptions")}>
            {task.options.map((opt) => (
              <ChoiceRow
                key={opt.id}
                label={opt.label}
                selected={single === opt.id}
                state={
                  checked
                    ? opt.id === task.correctOptionId
                      ? "correct"
                      : single === opt.id
                        ? "wrong"
                        : "idle"
                    : "idle"
                }
                disabled={checked}
                onClick={() => setSingle(opt.id)}
                role="radio"
              />
            ))}
          </div>
        )}

        {task.type === "multi_choice" && (
          <div className="space-y-2">
            <p className="mb-1 text-xs text-muted">{t("task.multiSelectHint")}</p>
            {task.options.map((opt) => {
              const isSel = multi.includes(opt.id);
              return (
                <ChoiceRow
                  key={opt.id}
                  label={opt.label}
                  selected={isSel}
                  state={
                    checked
                      ? task.correctOptionIds.includes(opt.id)
                        ? isSel
                          ? "correct"
                          : "missed"
                        : isSel
                          ? "wrong"
                          : "idle"
                      : "idle"
                  }
                  missedLabel={t("x.task.missed")}
                  disabled={checked}
                  onClick={() =>
                    setMulti((prev) =>
                      prev.includes(opt.id)
                        ? prev.filter((x) => x !== opt.id)
                        : [...prev, opt.id],
                    )
                  }
                  role="checkbox"
                />
              );
            })}
          </div>
        )}

        {task.type === "text_input" && (
          <input
            type="text"
            value={text}
            disabled={checked}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              if (canCheck) handleCheck();
            }}
            placeholder={task.placeholder ?? t("task.enterAnswer")}
            aria-label={t("task.yourAnswer")}
            className={cn(
              "h-12 w-full rounded-xl border-2 px-4 text-sm outline-none transition-colors",
              checked
                ? correct
                  ? "border-mint bg-mint-soft"
                  : "border-rose-300 bg-rose-50"
                : "border-ink/10 focus:border-ink",
            )}
          />
        )}

        {task.type === "matching" && (
          <MatchingView
            task={task}
            value={matches}
            disabled={checked}
            onChange={setMatches}
            checked={checked}
          />
        )}
      </div>

      {checked && (
        <div
          className={cn(
            "mt-4 rounded-xl border p-3 text-sm",
            correct
              ? "border-mint bg-mint-soft text-mint-ink"
              : "border-rose-200 bg-rose-50 text-rose-900",
          )}
          role="status"
        >
          <p className="flex items-center gap-1.5 font-bold">
            {correct ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" /> {t("task.correct")}
              </>
            ) : (
              <>
                <X className="h-4 w-4" aria-hidden="true" /> {t("task.notQuite")}
              </>
            )}
          </p>
          <p className="mt-1">{task.explanation}</p>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        {!checked ? (
          <Button onClick={handleCheck} disabled={!canCheck}>
            {t("task.check")}
          </Button>
        ) : (
          <Button onClick={onNext} variant="primary" autoFocus>
            {isLast ? t("task.finish") : t("task.next")}
          </Button>
        )}
      </div>
    </div>
  );
}

type RowState = "idle" | "correct" | "wrong" | "missed";

function ChoiceRow({
  label,
  selected,
  state,
  disabled,
  onClick,
  role,
  missedLabel,
}: {
  missedLabel?: string;
  label: string;
  selected: boolean;
  state: RowState;
  disabled: boolean;
  onClick: () => void;
  role: "radio" | "checkbox";
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition-colors",
        state === "correct" && "border-mint bg-mint-soft text-mint-ink",
        state === "wrong" && "border-rose-300 bg-rose-50 text-rose-900",
        state === "missed" && "border-dashed border-mint bg-white text-mint-ink",
        state === "idle" &&
          (selected
            ? "border-ink bg-ink/[0.04] text-ink"
            : "border-ink/10 bg-white hover:border-ink/20"),
      )}
    >
      <span
        className={cn(
          "grid h-5 w-5 shrink-0 place-items-center border-2",
          role === "radio" ? "rounded-full" : "rounded-md",
          selected || state !== "idle"
            ? "border-current"
            : "border-ink/20",
        )}
        aria-hidden="true"
      >
        {(selected || state === "correct" || state === "missed") && <Check className="h-3 w-3" />}
      </span>
      <span className="flex-1">{label}</span>
      {state === "missed" && missedLabel && (
        <span className="shrink-0 text-xs font-medium">{missedLabel}</span>
      )}
    </button>
  );
}

function MatchingView({
  task,
  value,
  onChange,
  disabled,
  checked,
}: {
  task: MatchingTask;
  value: Record<number, string>;
  onChange: (v: Record<number, string>) => void;
  disabled: boolean;
  checked: boolean;
}) {
  const { t } = useLocale();
  // Dedupe: several left items can legitimately map to the same right value.
  const rightOptions = useMemo(
    () => [...new Set(task.pairs.map((p) => p.right))].sort(),
    [task],
  );
  return (
    <div className="space-y-2">
      {task.pairs.map((pair, i) => {
        const isRight = checked && value[i] === pair.right;
        const isWrong = checked && value[i] !== pair.right;
        return (
          <div
            key={pair.left}
            className={cn(
              "flex flex-col gap-2 rounded-xl border-2 p-3 sm:flex-row sm:items-center",
              isRight && "border-mint bg-mint-soft",
              isWrong && "border-rose-300 bg-rose-50",
              !checked && "border-ink/10",
            )}
          >
            <span className="flex-1 text-sm font-bold text-ink">{pair.left}</span>
            <span className="hidden text-ink/30 sm:inline" aria-hidden="true">
              →
            </span>
            <select
              value={value[i] ?? ""}
              disabled={disabled}
              aria-label={t("task.pairFor", { left: pair.left })}
              onChange={(e) => onChange({ ...value, [i]: e.target.value })}
              className="h-10 flex-1 rounded-lg border-2 border-ink/10 bg-white px-3 text-sm font-semibold outline-none focus:border-ink"
            >
              <option value="" disabled>
                {t("task.selectEllipsis")}
              </option>
              {rightOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
