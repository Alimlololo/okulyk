import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Trend } from "@/lib/stats";

type Tone = "sky" | "blush" | "mint";

const TONE_BG: Record<Tone, string> = {
  sky: "bg-sky-soft",
  blush: "bg-blush-soft",
  mint: "bg-mint-soft",
};
const TONE_BAR: Record<Tone, string> = {
  sky: "fill-sky",
  blush: "fill-blush",
  mint: "fill-mint",
};

interface MetricCardProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  /** Real change vs the previous period — omitted when there's no data to compare. */
  trend?: Trend & { caption: string };
  /** Small note under the value when there's no trend (e.g. a goal). */
  caption?: string;
  tone: Tone;
  /** Per-day values, oldest first — the last bar (today) is drawn solid. */
  chart: number[];
  /** Accessible description of the chart. */
  chartLabel?: string;
  className?: string;
}

/** Pastel metric card with an optional trend badge and a 7-day bar chart. */
export function MetricCard({
  label,
  icon,
  value,
  trend,
  caption,
  tone,
  chart,
  chartLabel,
  className,
}: MetricCardProps) {
  return (
    <div className={cn("flex flex-col rounded-card p-5", TONE_BG[tone], className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink/70">{label}</p>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/70 text-ink/60">
          {icon}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <p className="font-display text-3xl font-bold text-ink">{value}</p>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-pill bg-white/70 px-1.5 py-0.5 text-[11px] font-bold",
              trend.direction === "up" ? "text-mint-ink" : "text-blush-ink",
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="h-3 w-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="h-3 w-3" aria-hidden="true" />
            )}
            {trend.percent}%
          </span>
        )}
      </div>
      {(trend || caption) && (
        <p className="text-xs text-ink/55">{trend ? trend.caption : caption}</p>
      )}

      <div className="mt-4 flex-1">
        <Bars values={chart} tone={tone} label={chartLabel} />
      </div>
    </div>
  );
}

function Bars({ values, tone, label }: { values: number[]; tone: Tone; label?: string }) {
  const max = Math.max(1, ...values);
  const barW = 100 / Math.max(1, values.length);
  return (
    <svg
      viewBox="0 0 100 48"
      preserveAspectRatio="none"
      className="h-14 w-full"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {values.map((v, i) => {
        const gap = barW * 0.3;
        const w = barW - gap;
        const h = Math.max(3, (v / max) * 46);
        const isToday = i === values.length - 1;
        return (
          <rect
            key={i}
            x={i * barW + gap / 2}
            y={48 - h}
            width={w}
            height={h}
            rx={Math.min(3, w / 2)}
            className={isToday ? "fill-ink" : TONE_BAR[tone]}
          />
        );
      })}
    </svg>
  );
}
