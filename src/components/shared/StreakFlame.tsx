import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n";
import type { Locale } from "@/i18n";

interface StreakFlameProps {
  days: number;
  size?: "sm" | "md" | "lg";
  /** Dim the flame when the streak is at risk / zero. */
  muted?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { box: "h-8 gap-1 px-2 text-sm", icon: "h-4 w-4" },
  md: { box: "h-10 gap-1.5 px-3 text-base", icon: "h-5 w-5" },
  lg: { box: "h-14 gap-2 px-4 text-2xl", icon: "h-7 w-7" },
} as const;

export function StreakFlame({
  days,
  size = "md",
  muted = false,
  animated = true,
  className,
}: StreakFlameProps) {
  const { locale } = useLocale();
  const s = sizeMap[size];
  const cold = muted || days === 0;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-bold",
        cold ? "bg-ink/[0.06] text-muted" : "bg-butter-soft text-butter-ink",
        s.box,
        className,
      )}
      aria-label={`Streak: ${days} ${pluralDays(days, locale)}`}
    >
      <Flame
        className={cn(s.icon, !cold && animated && "animate-flame", cold && "opacity-60")}
        fill={cold ? "none" : "currentColor"}
        aria-hidden="true"
      />
      {days}
    </span>
  );
}

function pluralDays(n: number, locale: Locale = "ru"): string {
  if (locale === "kz") return "күн"; // Kazakh nouns don't inflect after a numeral
  if (locale === "en") return n === 1 ? "day" : "days";
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "день";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "дня";
  return "дней";
}

export { pluralDays };
