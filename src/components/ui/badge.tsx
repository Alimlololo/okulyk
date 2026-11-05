import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      tone: {
        neutral: "bg-ink/[0.05] text-ink/70",
        // Pastel accents
        butter: "bg-butter-soft text-butter-ink",
        mint: "bg-mint-soft text-mint-ink",
        blush: "bg-blush-soft text-blush-ink",
        // App-area tones
        brand: "bg-brand-50 text-brand-700",
        fire: "bg-fire-50 text-fire-700",
        sea: "bg-sea-50 text-sea-700",
        success: "bg-mint-soft text-mint-ink",
        warning: "bg-butter-soft text-butter-ink",
        danger: "bg-rose-50 text-rose-700",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { badgeVariants };
