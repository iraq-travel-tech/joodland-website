import React from "react";
type Props = {
  fullWidth?: boolean;
  className?: string;

  my?: string;
  mx?: string;
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;

  color?: keyof typeof colors;
};

const colors = {
  zinc: "bg-zinc-400",
  red: "bg-red-300",
  green: "bg-green-300",
  blue: "bg-blue-300",
};

export default function Divide(props: Props) {
  return (
    <div
      className={`border-t border-gray-300 ${props.className}
        ${colors[props.color || "zinc"]}    
      
      
      
        ${props.fullWidth && "w-full"}
        ${props.my && "my-" + props.my}
        ${props.mx && "mx-" + props.mx}
        ${props.mt && "mt-" + props.mt}
        ${props.mb && "mb-" + props.mb}
        ${props.ml && "ml-" + props.ml}
        ${props.mr && "mr-" + props.mr}
        
        `}
    />
  );
}
