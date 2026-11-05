import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/10 bg-ink/[0.02] px-6 py-10 text-center",
        className,
      )}
    >
      {icon && (
        <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl shadow-card">
          {icon}
        </div>
      )}
      <p className="text-base font-bold text-ink">{title}</p>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
