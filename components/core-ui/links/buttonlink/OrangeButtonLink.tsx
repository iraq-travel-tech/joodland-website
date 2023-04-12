type buttonsProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
};

export default function OrangeButtonLink(props: buttonsProps) {
  return (
    <button
      onClick={props.onClick}
      data-size={props.size || "md"}
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

      flex gap-2 items-center font-semibold
        `}
    >
      <span>{props.startIcon}</span>
      {props.children}
      <span>{props.endIcon}</span>
    </button>
  );
}
