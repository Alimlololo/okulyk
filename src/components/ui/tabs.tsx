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
        variant === "pill" && "rounded-full bg-snow p-1 ring-1 ring-ink/[0.06]",
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
              "whitespace-nowrap px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-berry/60 focus-visible:ring-offset-2",
              variant === "pill" && "rounded-full",
              variant === "pill" && active
                ? "bg-ink text-white shadow-[0_8px_18px_-10px_rgba(22,22,29,.8)]"
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
