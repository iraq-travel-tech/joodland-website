"use client";

import { useState } from "react";
import Dialog from "../dialog/Dialog";
import WheelPicker from "../wheel/WheelPicker";
import Button from "../button/Button";

const years = Array.from({ length: 100 }, (_, index) => index + 2023);
const months = Array.from({ length: 12 }, (_, index) => index + 1);
const days = Array.from({ length: 31 }, (_, index) => index + 1);

export default function DatePicker({}: {}) {
  const [Open, setOpen] = useState(false);
  const [Year, setYear] = useState(2034);
  const [Month, setMonth] = useState(3);
  const [Day, setDay] = useState(2);

  return (
    <div>
      <button
        className="bg-gray-100 border rounded border-gray-300 w-full p-3 text-gray-500 h-full"
        onClick={() => setOpen(true)}
      >
        {Year} / {Month} / {Day}
      </button>
      <Dialog open={Open} setOpen={setOpen}>
        <div className="flex justify-between">
          <div className="font-bold">Depreture Date</div>
          <button className="text-blue-600 px-3" onClick={() => setOpen(false)}>
            cancel
          </button>
        </div>
        <hr className="my-4" />
        <div>
          <div className="flex relative h-[10em] overflow-hidden divide-2">
            <div className="absolute bg-gradient-to-b from-white pointer-events-none w-full h-10 top-3 left-0 z-10" />
            <div className="absolute bg-gradient-to-t from-white pointer-events-none w-full h-10 bottom-3 left-0 z-10" />
            <WheelPicker State={Year} setState={setYear} list={years} />
            <WheelPicker State={Month} setState={setMonth} list={months} />
            <WheelPicker State={Day} setState={setDay} list={days} />
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-zinc-200/40 rounded right-2 left-2 h-[30px] pointer-events-none"></div>
          </div>
        </div>

        <Button onClick={() => setOpen(false)} className="w-full mt-5">
          Done
        </Button>
      </Dialog>
    </div>
  );
}
