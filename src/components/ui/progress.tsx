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

const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" } as const;

export function Progress({
  value,
  className,
  indicatorClassName = "bg-ink",
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
