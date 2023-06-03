import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const TextStyles = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    color: {
      primary: "dark:text-primary-100 ",
      secondary: "text-secondary-600",
      invert: "dark:text-black text-white",
    },
    bold: {
      true: "font-bold",
      false: "font-normal",
    },
  },

  defaultVariants: {
    size: "md",
    color: "invert",
  },
});

interface TextProps extends VariantProps<typeof TextStyles> {
  children: React.ReactNode;
}

export default function Text({ children, ...props }: TextProps) {
  const textStyles = TextStyles(props);
  return <div className={textStyles}>{children}</div>;
}
