import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InsightRow {
  key: string;
  icon: ReactNode;
  label: string;
  percent: number;
  barClassName?: string;
}

/** "Platform Insight"-style card: icon + label + percent, with a bar underneath each row. */
export function InsightList({ title, rows }: { title: string; rows: InsightRow[] }) {
  return (
    <div className="rounded-card border border-ink/[0.05] p-5">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <ul className="mt-4 space-y-4">
        {rows.map((row) => (
          <li key={row.key}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/[0.05] text-ink/60">
                {row.icon}
              </span>
              <span className="flex-1 truncate text-sm font-medium text-ink">{row.label}</span>
              <span className="text-sm font-bold text-ink/70">{row.percent}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-pill bg-ink/[0.06]">
              <div
                className={cn("h-full rounded-pill", row.barClassName ?? "bg-ink")}
                style={{ width: `${Math.min(100, Math.max(0, row.percent))}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
