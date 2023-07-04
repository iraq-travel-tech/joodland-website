import React from "react";

export default function loading() {
  return (
    <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 pb-10 py-8">
      <div className="grid md:grid-cols-4 md:grid-rows-2 md:gap-1 h-[20em] md:w-full">
        <div className="relative bg-zinc-300 rounded animate-pulse  col-span-2 row-span-2"></div>
        <div className="relative bg-zinc-300 rounded animate-pulse"></div>
        <div className="relative bg-zinc-300 rounded animate-pulse"></div>
        <div className="relative bg-zinc-300 rounded animate-pulse"></div>
        <div className="relative bg-zinc-300 rounded animate-pulse"></div>
      </div>

      <div className="flex md:flex-row flex-col mt-10 lg:gap-10 gap-8">
        <div className="flex flex-col flex-1">
          <div className="bg-zinc-300 rounded animate-pulse w-[8em] h-10" />
          <div className="bg-zinc-300 rounded animate-pulse md:w-9/12 w-full h-10 mt-3" />
          <div className="bg-zinc-300 rounded animate-pulse md:w-5/12 w-7/12 h-10 mt-3" />
          <div className="bg-zinc-300 rounded animate-pulse md:w-3/12 w-5/12 h-10 mt-3" />
        </div>

        <div className="md:w-[20em] w-full bg-zinc-300 rounded animate-pulse h-[18em] gap-4 flex flex-col"></div>
      </div>
    </div>
  );
}
