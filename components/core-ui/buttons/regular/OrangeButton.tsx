type buttonsProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function OrangeButton(props: buttonsProps) {
  return (
    <button
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
      `}
    >
      {props.children}
    </button>
  );
}
