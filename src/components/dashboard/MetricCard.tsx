import { TrendingDown, TrendingUp } from "lucide-react";
import { Sparkle } from "@/components/shared/Decor";
import { cn } from "@/lib/utils";
import type { Trend } from "@/lib/stats";

type Tone = "sun" | "berry" | "leaf";

/** Bright (student) and calm (parent) skins per tone. */
const SKIN: Record<Tone, { bright: string; calm: string; bar: string; barCalm: string; today: string; onBright: "light" | "dark" }> = {
  sun: { bright: "bg-sun text-ink", calm: "bg-butter-soft text-ink", bar: "fill-white/60", barCalm: "fill-sun/50", today: "fill-ink", onBright: "dark" },
  berry: { bright: "bg-berry text-white", calm: "bg-berry-soft text-ink", bar: "fill-white/35", barCalm: "fill-berry/30", today: "fill-white", onBright: "light" },
  leaf: { bright: "bg-leaf text-ink", calm: "bg-leaf-soft text-ink", bar: "fill-white/60", barCalm: "fill-leaf/45", today: "fill-ink", onBright: "dark" },
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
  /** Calmer pastel skin (parent dashboard). */
  calm?: boolean;
  /** Per-day values, oldest first — the last bar (today) is drawn solid. */
  chart: number[];
  /** Accessible description of the chart. */
  chartLabel?: string;
  className?: string;
}

/** Juicy metric card with an optional trend badge and a 7-day bar chart. */
export function MetricCard({ label, icon, value, trend, caption, tone, calm = false, chart, chartLabel, className }: MetricCardProps) {
  const skin = SKIN[tone];
  const light = !calm && skin.onBright === "light";
  return (
    <div className={cn("relative flex flex-col overflow-hidden rounded-card p-5", calm ? skin.calm : skin.bright, className)}>
      {!calm && <Sparkle color="white" size={18} className="absolute right-14 top-4 opacity-80" />}
      <div className="flex items-center justify-between">
        <p className={cn("text-sm font-bold", light ? "text-white/85" : "text-ink/75")}>{label}</p>
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full", light ? "bg-white/20 text-white" : "bg-white/80 text-ink")}>
          {icon}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <p className="font-display text-[2rem] font-extrabold leading-tight">{value}</p>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-pill bg-white px-2 py-0.5 text-[11px] font-extrabold",
              trend.direction === "up" ? "text-leaf-ink" : "text-bubble-ink",
            )}
          >
            {trend.direction === "up" ? <TrendingUp className="h-3 w-3" aria-hidden="true" /> : <TrendingDown className="h-3 w-3" aria-hidden="true" />}
            {trend.percent}%
          </span>
        )}
      </div>
      {(trend || caption) && (
        <p className={cn("text-xs font-semibold", light ? "text-white/80" : "text-ink/65")}>{trend ? trend.caption : caption}</p>
      )}

      <div className="mt-4 flex-1">
        <Bars values={chart} barClass={calm ? skin.barCalm : skin.bar} todayClass={calm ? "fill-ink" : skin.today} label={chartLabel} />
      </div>
    </div>
  );
}

function Bars({ values, barClass, todayClass, label }: { values: number[]; barClass: string; todayClass: string; label?: string }) {
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
        const h = Math.max(4, (v / max) * 46);
        const isToday = i === values.length - 1;
        return (
          <rect key={i} x={i * barW + gap / 2} y={48 - h} width={w} height={h} rx={Math.min(4, w / 2)} className={isToday ? todayClass : barClass} />
        );
      })}
    </svg>
  );
}
