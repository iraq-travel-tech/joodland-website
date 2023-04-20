import React from "react";

type UiOfferCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function UiOfferCard(props: UiOfferCardProps) {
  return (
    <article
      key={props.title}
      className="flex flex-col p-3 transition-all bg-white border-2 rounded shadow-none border-zinc-200 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-center justify-center w-10 h-10 text-orange-600 rounded bg-orange-600/40">
        {props.icon}
      </div>

      <h1 className="mt-3 font-bold capitalize">{props.title}</h1>

      <p className="mt-1 text-sm">{props.description} </p>
    </article>
  );
}
