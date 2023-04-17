import Link from "next/link";
import React from "react";
import { buttonStyles } from "../UiButton";
import { VariantProps } from "class-variance-authority";

interface UiLinkProps extends VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function UiLink(props: UiLinkProps) {
  const styles = buttonStyles({
    variant: props.variant,
    textSize: props.textSize,
    font: props.font,
    w: props.w,
    className: props.className,
  });
  return (
    <Link className={styles} href={props.href}>
      {props.children}
    </Link>
  );
}
