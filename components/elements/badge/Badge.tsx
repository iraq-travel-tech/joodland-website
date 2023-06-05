import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const BadgeStyles = cva(
  "inline-flex items-center justify-center rounded-full font-medium absolute -top-1 -right-1",
  {
    variants: {
      size: {
        sm: "h-[1.5em] w-[1.5em] text-[.8em]",
        md: "h-5 w-5 text-sm",
        lg: "h-6 w-6 text-base",
      },
      variant: {
        primary: "bg-primary-600 text-white",
        secondary: "bg-blue-500 text-white",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-black",
        error: "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      size: "sm",
      variant: "primary",
    },
  }
);

interface BadgeProps extends VariantProps<typeof BadgeStyles> {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className, ...props }: BadgeProps) {
  const style = BadgeStyles(props);

  return <span className={`${style} ${className}`}>{children}</span>;
}
