import { VariantProps, cva } from "class-variance-authority";

export const ButtonStyles = cva(
  "active:scale-95 flex justify-center items-center gap-2 transition-all rounded",
  {
    variants: {
      bg: {
        primary: "bg-primary-600 hover:bg-primary-500 text-white",
        secondary: "bg-blue-500 hover:bg-blue-600 text-white",
        ghost: "bg-transparent hover:bg-gray-200 text-black",
      },
      padding: {
        sm: "px-2 py-1",
        md: "px-4 py-2",
        lg: "px-6 py-3",
        xl: "px-8 py-4",
      },
      roundedFull: {
        true: "rounded-full",
      },
      shadow: {
        true: "shadow-lg",
        false: "",
      },
      iconOnly: {
        true: "!py-3 !px-3",
      },
    },

    defaultVariants: {
      bg: "primary",
      padding: "md",
      roundedFull: false,
      shadow: false,
    },
  }
);

interface ButtonProps
  extends VariantProps<typeof ButtonStyles>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  onClick?: () => void;

  className?: string;
}

export default function Button({
  children,
  startIcon,
  endIcon,
  onClick,
  iconOnly,
  bg,
  padding,
  roundedFull,
  shadow,
  className,
  ...props
}: ButtonProps) {
  const style = ButtonStyles({
    bg,
    padding,
    roundedFull,
    shadow,
    iconOnly,
    className,
  });

  return (
    <button className={style} onClick={onClick} {...props}>
      <span className="pointer-events-none">{startIcon}</span>{" "}
      <span>{children}</span>
      <span className="pointer-events-none">{endIcon}</span>{" "}
    </button>
  );
}
