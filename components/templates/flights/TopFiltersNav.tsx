"use client";
import { useIsScrollingDown } from "@lib/hooks/scrollDetect";
import React, { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function TopFiltersNav() {
  const Scrolling = useIsScrollingDown()

  return (
    <div
      className={`${
        Scrolling && " -translate-y-full shadow-none"
      } md:w-[25em] bg-white shadow-lg md:!translate-y-0 transition-all duration-300 md:!shadow-lg md:p-3 p-2 h-max md:sticky fixed right-0 md:top-28 top-20 noscrollwheel left-0 md:rounded-lg sm:flex-wrap flex gap-2 overflow-x-scroll snap-x scroll-px-2 snap-mandatory`}
    >
      <button className="rounded-md flex gap-0.5 items-center border snap-start py-1 px-2 text-sm text-zinc-400">
        <MdOutlineAttachMoney className="pt-0.5" />
        <span>cheapest</span>
      </button>
      <button className="rounded-md flex gap-0.5 items-center border snap-start py-1 px-2 text-sm text-zinc-400">
        <MdOutlineAttachMoney className="pt-0.5" />
        <span>cheapest</span>
      </button>
      <button className="rounded-md flex gap-0.5 items-center border snap-start py-1 px-2 text-sm text-zinc-400">
        <MdOutlineAttachMoney className="pt-0.5" />
        <span>cheapest</span>
      </button>
      <button className="rounded-md flex gap-0.5 items-center border snap-start py-1 px-2 text-sm text-zinc-400">
        <MdOutlineAttachMoney className="pt-0.5" />
        <span>cheapest</span>
      </button>
      <button className="rounded-md flex gap-0.5 items-center border snap-start py-1 px-2 text-sm text-zinc-400">
        <MdOutlineAttachMoney className="pt-0.5" />
        <span>cheapest</span>
      </button>
    </div>
  );
}
