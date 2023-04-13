import React from "react";

type WhiteBoxTitleProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export default function WhiteBoxTitle(props: WhiteBoxTitleProps) {
  return (
    <div
      className={`bg-white rounded border border-zinc-300 p-4 ${props.className}`}
    >
      <div className="flex flex-col">
        <h1 className="text-xl font-bold capitalize">{props.title}</h1>
        <div className="w-full h-[.06em] mt-2 bg-zinc-300 rounded-full" />
      </div>

      <div className="pt-2">{props.children}</div>
    </div>
  );
}
