import React from "react";

type props = {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  onClick?: () => void;
  className?: string;

  icon?: React.ReactNode;

  variant?: keyof typeof variants;
};

const variants = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-orange-600 text-white",
  danger: "bg-red-600 text-white",
  warning: "bg-yellow-400 text-white",
  success: "bg-green-600 text-white",
  info: "bg-blue-600 text-white",
  light: "bg-gray-200 text-black",
  dark: "bg-gray-800 text-white",
  link: "bg-transparent text-blue-600",
  ghost: "bg-transparent text-black hover:bg-black/20 active:bg-black/30",
};

export default function UiButton(props: props) {
  return (
    <button
      className={
        `flex items-center justify-center ${
          props.icon && "!px-2"
        } px-4 py-2 rounded-md active:scale-90 transition-all  active:brightness-90 fill-current ` +
        variants[props.variant || "primary"] +
        " " +
        props.className
      }
      onClick={props.onClick}
    >
      {props.endIcon}
      {props.children}
      {props.icon}
      {props.startIcon}
    </button>
  );
}
