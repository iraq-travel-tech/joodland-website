"use client";
import Dialog from "@components/elements/dialog/Dialog";
import WheelPicker from "@components/elements/wheel/WheelPicker";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdNumbers } from "react-icons/md";

export default function PackagesNumbersWheel() {
  const numbers = Array.from({ length: 35 }, (_, index) => index + 1);
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState(1);
  const t = useTranslations("packages");

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex text-left w-full items-center gap-3 h-14 min-w-[14em] cursor-pointer border bg-gray-100 rounded-lg px-3 py-2 border-gray-300  relative"
      >
        <span className="text-zinc-400">
          <MdNumbers />
        </span>
        <div className="min-w-max">
          <span className="text-xs leading-1 text-zinc-400">
            {t("btns.numberofdays")}
          </span>
          <div className="text-sm font-semibold">
            {t("btns.days", {
              count: number,
            })}
          </div>
        </div>
      </button>
      <Dialog open={open} setOpen={setOpen}>
        <div className="flex justify-between">
          <div className="font-bold">{t("btns.numberofdays")}</div>
          <button className="px-3 text-blue-600" onClick={() => setOpen(false)}>
            {t("btns.done")}
          </button>
        </div>
        <hr className="my-4" />
        <div className="">
          <div className="flex w-[17em] justify-center relative h-[10em] overflow-hidden divide-2">
            <div className="absolute left-0 z-10 w-full h-10 pointer-events-none bg-gradient-to-b from-white top-3" />
            <div className="absolute left-0 z-10 w-full h-10 pointer-events-none bg-gradient-to-t from-white bottom-3" />
            <WheelPicker State={number} setState={setNumber} list={numbers} />
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-zinc-200/40 rounded right-2 left-2 h-[30px] pointer-events-none"></div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
