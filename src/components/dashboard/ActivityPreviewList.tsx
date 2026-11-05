import type { ReactNode } from "react";

export interface ActivityPreviewRow {
  key: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  /** Right-aligned meta, e.g. score and XP. */
  badge?: ReactNode;
}

/** Condensed recent-activity list for the dashboard overview. */
export function ActivityPreviewList({
  title,
  rows,
  empty,
}: {
  title: string;
  rows: ActivityPreviewRow[];
  empty?: string;
}) {
  return (
    <div className="rounded-card border border-ink/[0.06] p-5">
      <h3 className="text-base font-bold text-ink">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{empty}</p>
      ) : (
        <ul className="mt-3 divide-y divide-ink/[0.05]">
          {rows.map((row) => (
            <li key={row.key} className="flex items-center gap-3 py-2.5">
              {row.icon}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-semibold text-ink">{row.title}</p>
                <p className="truncate text-xs text-muted">{row.subtitle}</p>
              </div>
              {row.badge && <div className="shrink-0 text-right">{row.badge}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
