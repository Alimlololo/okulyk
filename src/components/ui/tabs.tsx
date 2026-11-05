import { cn } from "@/lib/utils";

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  icon?: string;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  variant?: "pill" | "underline";
}

export function Tabs<T extends string>({
  items,
  value,
  onValueChange,
  className,
  variant = "pill",
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "flex gap-1 overflow-x-auto",
        variant === "pill" && "rounded-xl bg-ink/[0.06] p-1",
        variant === "underline" && "border-b border-ink/10",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onValueChange(item.value)}
            className={cn(
              "whitespace-nowrap px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2",
              variant === "pill" && "rounded-lg",
              variant === "pill" && active
                ? "bg-white text-ink shadow-sm"
                : variant === "pill"
                  ? "text-muted hover:text-ink"
                  : "",
              variant === "underline" &&
                (active
                  ? "-mb-px border-b-2 border-ink text-ink"
                  : "-mb-px border-b-2 border-transparent text-muted hover:text-ink"),
            )}
          >
            {item.icon && <span className="mr-1.5">{item.icon}</span>}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
