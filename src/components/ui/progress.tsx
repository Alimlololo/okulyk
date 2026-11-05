import { clamp, cn } from "@/lib/utils";

interface ProgressProps {
  /** 0..100 */
  value: number;
  className?: string;
  /** Tailwind bg-* class for the filled portion. */
  indicatorClassName?: string;
  /** Height token. */
  size?: "sm" | "md" | "lg";
  label?: string;
}

const heights = { sm: "h-2", md: "h-3", lg: "h-4" } as const;

export function Progress({
  value,
  className,
  indicatorClassName = "bg-[linear-gradient(90deg,#3D5AFE,#8B5CF6)]",
  size = "md",
  label,
}: ProgressProps) {
  const pct = clamp(Math.round(value), 0, 100);
  return (
    <div
      className={cn("w-full overflow-hidden rounded-full bg-ink/[0.06]", heights[size], className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500 ease-out", indicatorClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
