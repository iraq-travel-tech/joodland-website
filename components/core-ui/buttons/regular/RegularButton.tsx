type buttonsProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  bg?: "orange" | "white";

  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  onClick?: () => void;
};

export default function RegularButton(props: buttonsProps) {
  return (
    <button
      onClick={props.onClick}
      data-size={props.size || "md"}
      data-bg={props.bg || "orange"}
      className={`
    
      ${props.className}
    
    text-white
    bg-orange-600

    hover:bg-orange-700
    active:scale-95 transition-all
      
    rounded

    data-[size="sm"]:text-sm
    data-[size="md"]:text-base
    data-[size="lg"]:text-lg

    px-3 py-2

    data-[bg="white"]:bg-white
    data-[bg="white"]:hover:bg-zinc-200
    data-[bg="white"]:text-black
      
    flex items-center gap-2
    `}
    >
      <span>{props.startIcon}</span>

      {props.children}

      <span>{props.endIcon}</span>
    </button>
  );
}
