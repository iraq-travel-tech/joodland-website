import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import React from "react";
import { buttonStyles } from "../buttons/UiButton";

interface UiLinkProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonStyles> {
  children?: React.ReactNode;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
export default function UiLink(props: UiLinkProps) {
  const style = buttonStyles({
    variant: props.variant,
    textSize: props.textSize,
    font: props.font,
    w: "max",
    className: props.className,
  });
  return (
    <Link href="/" className={style}>
      <span className="mt-1">{props.startIcon}</span>
      UiLink
      <span className="mt-1">{props.endIcon}</span>
    </Link>
  );
}
