import React from "react";

type OfferCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function OfferCard(props: OfferCardProps) {
  return (
    <article
      key={props.title}
      className="border-2 border-zinc-200 bg-white p-3 flex flex-col rounded hover:scale-105  hover:shadow-xl shadow-none transition-all"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded text-orange-600 bg-orange-600/40">
        {props.icon}
      </div>

      <h1 className="font-bold capitalize mt-3">{props.title}</h1>

      <p className="text-sm mt-1">{props.description} </p>
    </article>
  );
}
