import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--gold-main))] text-background font-semibold border border-[hsl(var(--gold-light)/0.3)] rounded-sm shadow-[0_2px_12px_rgba(180,140,80,0.2)] hover:bg-[hsl(var(--gold-light))] hover:shadow-[0_4px_20px_rgba(180,140,80,0.3)] hover:-translate-y-px",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm",
        outline: "border border-[hsl(var(--gold-main)/0.4)] bg-transparent text-[hsl(var(--gold-light))] rounded-sm hover:bg-[hsl(var(--gold-main)/0.1)] hover:border-[hsl(var(--gold-main))] hover:text-[hsl(var(--gold-light))]",
        secondary: "bg-[hsl(var(--gold-dark))] text-foreground font-medium border border-[hsl(var(--gold-main)/0.2)] rounded-sm hover:bg-[hsl(var(--gold-main)/0.9)] hover:text-background",
        ghost: "hover:bg-[hsl(var(--gold-main)/0.1)] hover:text-[hsl(var(--gold-light))] rounded-sm",
        link: "text-[hsl(var(--gold-light))] underline-offset-4 hover:underline",
        hero: "bg-transparent border border-[hsl(var(--gold-main)/0.5)] text-[hsl(var(--gold-light))] font-medium tracking-widest uppercase text-xs rounded-none hover:bg-[hsl(var(--gold-main)/0.15)] hover:border-[hsl(var(--gold-light))] transition-all duration-500",
        premium: "bg-gradient-to-r from-[hsl(var(--gold-dark))] via-[hsl(var(--gold-main))] to-[hsl(var(--gold-dark))] bg-size-200 bg-pos-0 hover:bg-pos-100 text-background font-semibold tracking-wide rounded-sm shadow-[0_2px_15px_rgba(180,140,80,0.25)] hover:shadow-[0_4px_20px_rgba(180,140,80,0.35)] transition-all duration-500",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
