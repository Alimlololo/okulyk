import { cn } from "@/lib/utils";

/** Minimal editorial mark — a small ink "spark" + the wordmark. */
export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
      </svg>
      {withText && (
        <span className="text-lg font-semibold tracking-tight text-ink">Munara</span>
      )}
    </span>
  );
}
