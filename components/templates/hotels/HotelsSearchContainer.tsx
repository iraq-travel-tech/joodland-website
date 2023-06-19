"use client";
import { useState } from "react";
import HotelsInput from "./HotelsInput";
import { TbCalendarStats } from "react-icons/tb";
import Button from "@components/elements/button/Button";

export default function HotelsSearchContainer() {
  const [City, setCity] = useState({
    name: "",
    country: "",
  });
  return (
    <div className="flex lg:flex-row flex-col w-full gap-3 mt-2">
      <HotelsInput State={City} setState={setCity} />

      <div className="flex sm:flex-row flex-col gap-2">
        <DateBox />
        <DateBox />
      </div>

      <Button>Search</Button>
    </div>
  );
}

const DateBox = () => {
  return (
    <div className="flex items-center gap-3 w-full h-14 min-w-[14em] cursor-pointer border bg-gray-100 rounded-lg px-3 py-2 border-gray-300  relative">
      <span className="text-zinc-400">
        <TbCalendarStats size={22} />
      </span>
      <div className="flex flex-col">
        <div className="text-xs leading-1 text-zinc-400">check-in</div>
        <p className="capitalize text-sm font-semibold">sat, 06/24/23</p>
      </div>
    </div>
  );
};
