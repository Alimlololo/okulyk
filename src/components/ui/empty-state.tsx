import type { ReactNode } from "react";
import { Sparkle } from "@/components/shared/Decor";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-card bg-snow px-6 py-12 text-center",
        className,
      )}
    >
      <Sparkle color="sun" size={20} className="absolute left-[14%] top-6" />
      <Sparkle color="berry" size={16} className="absolute right-[16%] top-10" style={{ animationDelay: "1s" }} />
      <Sparkle color="leaf" size={14} className="absolute bottom-8 left-[22%]" style={{ animationDelay: "2s" }} />
      {icon && (
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-white text-3xl shadow-knob">
          {icon}
        </div>
      )}
      <p className="font-display text-lg font-bold text-ink">{title}</p>
      {description && <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
