import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { StudentUser } from "@/types";
import { Avatar } from "@/components/shared/Avatar";
import { useLocale } from "@/i18n";
import { cn } from "@/lib/utils";

interface ChildSwitcherCompactProps {
  items: StudentUser[];
  value: string;
  onChange: (id: string) => void;
}

/** Dropdown pill for switching between children — labelled so it isn't confused with the account pill. */
export function ChildSwitcherCompact({ items, value, onChange }: ChildSwitcherCompactProps) {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (items.length <= 1) return null;
  const active = items.find((c) => c.id === value) ?? items[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-pill bg-ink/[0.05] py-1 pl-1 pr-3 hover:bg-ink/[0.08]"
      >
        <Avatar name={active.name} color={active.avatarColor} size="sm" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-medium uppercase tracking-wide text-muted">
            {t("x.parent.child")}
          </span>
          <span className="block text-sm font-semibold text-ink">{active.name}</span>
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={t("videos.close")}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            aria-label={t("x.parent.child")}
            className="absolute left-0 top-full z-50 mt-2 w-52 rounded-2xl border border-ink/10 bg-white p-1.5 shadow-pop"
          >
            {items.map((c) => (
              <button
                key={c.id}
                type="button"
                role="option"
                aria-selected={c.id === value}
                onClick={() => {
                  onChange(c.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm font-semibold transition-colors",
                  c.id === value ? "bg-ink/[0.06] text-ink" : "text-ink/70 hover:bg-ink/[0.04]",
                )}
              >
                <Avatar name={c.name} color={c.avatarColor} size="sm" />
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
