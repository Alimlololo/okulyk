import { forwardRef } from "react";
import { Slot } from "@/components/ui/slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-bold transition-[transform,box-shadow,background-color,border-color,color] duration-150 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-berry/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 select-none",
  {
    variants: {
      variant: {
        // Filled near-black — the single primary action
        primary: "bg-ink text-white shadow-[0_10px_22px_-12px_rgba(22,22,29,.7)] hover:bg-ink/90",
        // Bright blue accent — for playful in-app actions
        accent: "bg-berry text-white shadow-lift hover:bg-berry-600",
        // Outlined / white — the secondary pill
        outline:
          "border-2 border-ink/80 bg-white text-ink hover:border-ink hover:bg-snow",
        ghost: "text-ink/75 hover:bg-ink/[0.05] hover:text-ink hover:translate-y-0",
        subtle: "bg-ink/[0.06] text-ink hover:bg-ink/[0.1]",
        ghostNoLift: "text-ink/70 hover:bg-ink/[0.05] hover:text-ink hover:translate-y-0",
        // App-area accents, kept for student/parent flows
        fire: "bg-fire-500 text-white shadow-[0_12px_24px_-12px_rgba(255,122,26,.8)] hover:bg-fire-600",
        sea: "bg-ink text-white hover:bg-sea-700",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
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
