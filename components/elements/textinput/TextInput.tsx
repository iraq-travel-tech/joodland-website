import { cva, VariantProps } from "class-variance-authority";

export const TextInputStyles = cva(
  `
  relative
  flex items-center h-12 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100
  focus:outline-none focus:ring-2 focus:ring-blue-500
  transition duration-200 ease-in-out
  `,
  {
    variants: {
      size: {
        sm: "text-sm h-8",
        md: "text-base h-10",
        lg: "text-lg h-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface TextInputProps extends VariantProps<typeof TextInputStyles> {
  placeholder?: string;
  State: string;
  setState: (State: string) => void;
  label?: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  onBlur?: any;
  onFocus?: any;
}

export default function TextInput({
  size,
  placeholder,
  State,
  setState,
  label,
  onFocus,
  onBlur,
  type = "text",
  startIcon,
  endIcon,
  className,
}: TextInputProps) {
  const inputStyles = TextInputStyles({ size, className });

  return (
    <div className="relative w-full">
      <div
        className={`absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events`}
      >
        {startIcon}
      </div>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
        className={`${inputStyles} `}
        style={{
          paddingLeft: startIcon ? "2.5rem" : "1rem",
          paddingRight: endIcon ? "2.5rem" : "1rem",
        }}
        placeholder={placeholder}
        value={State}
        onChange={(e) => setState(e.target.value)}
      />
      <div
        className={`absolute z-10 inset-y-0 right-0 pr-3 flex items-center pointer-events-none `}
      >
        {endIcon}
      </div>
    </div>
  );
}
