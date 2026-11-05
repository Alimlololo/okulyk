import { forwardRef } from "react";
import { Slot } from "@/components/ui/slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // Filled near-black — the single primary action
        primary: "bg-ink text-white hover:bg-ink/90",
        // Outlined / white — the secondary pill
        outline:
          "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-ink/[0.03]",
        ghost: "text-ink/70 hover:bg-ink/[0.05] hover:text-ink",
        subtle: "bg-ink/[0.06] text-ink hover:bg-ink/[0.1]",
        // App-area accents, kept for student/parent flows
        fire: "bg-fire-500 text-white hover:bg-fire-600",
        sea: "bg-ink text-white hover:bg-sea-700",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
