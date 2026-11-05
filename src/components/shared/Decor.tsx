/**
 * Playful geometric decoration (see DESIGN.md §3). Purely visual — every
 * piece is aria-hidden and pointer-events-none unless stated otherwise.
 */
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const SPARKLE_COLOR = {
  berry: "#3D5AFE",
  leaf: "#3CC47C",
  sun: "#FFC530",
  sky: "#8EC5FF",
  bubble: "#FF6FA8",
  grape: "#8B5CF6",
  white: "#FFFFFF",
} as const;
export type DecorColor = keyof typeof SPARKLE_COLOR;

/** Four-point star. */
export function Sparkle({
  color = "sun",
  size = 28,
  className,
  style,
  twinkle = true,
}: {
  color?: DecorColor;
  size?: number;
  className?: string;
  style?: CSSProperties;
  twinkle?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("pointer-events-none shrink-0", twinkle && "animate-twinkle", className)}
      style={style}
    >
      <path
        d="M12 0c.9 6.7 5.3 11.1 12 12-6.7.9-11.1 5.3-12 12-.9-6.7-5.3-11.1-12-12C6.7 11.1 11.1 6.7 12 0Z"
        fill={SPARKLE_COLOR[color]}
      />
    </svg>
  );
}

/** Glossy white knob, like the handle of a toggle switch. */
export function Knob({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid place-items-center rounded-full bg-gradient-to-b from-white to-[#ECEDF3] text-ink shadow-knob",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small solid dot with a white ring — the ends of dashed routes. */
export function Dot({ color = "berry", className }: { color?: DecorColor; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block h-3.5 w-3.5 rounded-full ring-[3px] ring-white", className)}
      style={{ backgroundColor: SPARKLE_COLOR[color], boxShadow: "0 2px 6px rgba(22,22,29,.25)" }}
    />
  );
}

/** A juicy circle, solid or gradient, optionally holding an icon. */
export function Blob({
  className,
  gradient,
  color,
  children,
}: {
  className?: string;
  /** CSS gradient, e.g. "linear-gradient(135deg,#8B5CF6,#FF7A1A)". */
  gradient?: string;
  color?: DecorColor;
  children?: ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("grid shrink-0 place-items-center rounded-full", className)}
      style={{ background: gradient ?? (color ? SPARKLE_COLOR[color] : undefined) }}
    >
      {children}
    </span>
  );
}

/** Pill-shaped toggle with a knob. */
export function PillToggle({
  variant = "gradient",
  className,
  knobClassName,
  knob,
  animated = false,
}: {
  variant?: "gradient" | "outline" | "glass";
  className?: string;
  knobClassName?: string;
  knob?: ReactNode;
  animated?: boolean;
}) {
  const shell =
    variant === "gradient"
      ? "bg-[linear-gradient(100deg,#3D5AFE_0%,#6B6BFF_45%,#FF6FA8_100%)]"
      : variant === "outline"
        ? "border-[5px] border-ink bg-white"
        : "bg-white/60 backdrop-blur-sm ring-1 ring-white/80 shadow-knob";
  return (
    <span aria-hidden="true" className={cn("relative inline-flex items-center rounded-full p-1.5", shell, className)}>
      <span className={cn("ml-auto", animated && "animate-slide-knob")}>
        {knob ?? <Knob className={cn("h-full", knobClassName)} />}
      </span>
    </span>
  );
}

/** Dashed SVG route. `d` uses a 0–100 × 0–100 viewBox stretched over the parent. */
export function DashedRoute({
  d,
  className,
  strokeWidth = 3,
}: {
  d: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
    >
      <path
        d={d}
        fill="none"
        stroke="#16161D"
        strokeWidth={strokeWidth}
        strokeDasharray="7 7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Scattered sparkles and circles for page backgrounds (auth, onboarding…). */
export function ConfettiBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <Blob color="sun" className="absolute -left-16 top-24 h-40 w-40 opacity-90" />
      <Blob gradient="linear-gradient(135deg,#8B5CF6,#FF6FA8)" className="absolute -right-20 top-10 h-52 w-52 opacity-90" />
      <Blob color="leaf" className="absolute -bottom-14 left-[12%] h-32 w-32" />
      <Blob color="sky" className="absolute -bottom-20 -right-10 h-56 w-56" />
      <Sparkle color="berry" size={26} className="absolute left-[8%] top-[55%]" />
      <Sparkle color="leaf" size={22} className="absolute right-[10%] top-[48%]" style={{ animationDelay: "0.8s" }} />
      <Sparkle color="sun" size={30} className="absolute right-[22%] top-[12%]" style={{ animationDelay: "1.6s" }} />
      <Sparkle color="bubble" size={18} className="absolute bottom-[22%] left-[6%]" style={{ animationDelay: "2.2s" }} />
    </div>
  );
}
