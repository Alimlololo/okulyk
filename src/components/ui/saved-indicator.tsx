import { useCallback, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Returns [visible, flash] — call flash() after a change to show "Saved" briefly. */
export function useSavedFlash(ms = 1800): [boolean, () => void] {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const flash = useCallback(() => {
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), ms);
  }, [ms]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return [visible, flash];
}

/** Small "✓ Saved" pill announced to screen readers. */
export function SavedIndicator({ visible, label }: { visible: boolean; label: string }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-center gap-1 rounded-pill bg-mint-soft px-2.5 py-1 text-xs font-semibold text-mint-ink transition-opacity",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {visible && (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </>
      )}
    </span>
  );
}
