import { Children, cloneElement, forwardRef, isValidElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal `asChild` helper (a tiny stand-in for @radix-ui/react-slot):
 * merges its own props/className onto the single child element it receives.
 */
export const Slot = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    if (!isValidElement(children)) return null;
    const child = Children.only(children) as React.ReactElement<
      Record<string, unknown> & { className?: string }
    >;
    return cloneElement(child, {
      ...props,
      ...child.props,
      ref,
      className: cn(className, child.props.className),
    });
  },
);
Slot.displayName = "Slot";
