"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

export default function FlightBox() {
  const [ShowDetails, setShowDetails] = useState(true);
  return (
    <div className="flex flex-col p-3 bg-zinc-200 rounded-xl gap-4">
      <div>
        <div
          className="grid 
    md:grid-cols-[max-content_1fr_1fr_1fr_1fr_max-content]
    grid-cols-[max-content_1fr_max-content] items-center gap-5"
        >
          <div className="icon w-10 h-10 bg-zinc-200 p-2 rounded-full">
            <img
              src="https://companieslogo.com/img/orig/THYAO.IS-f22d40e8.png?t=1602914708"
              alt=""
            />
          </div>

          <div className="flex flex-col min-w-max">
            <div className="text-xl font-bold">12:40 - 3:40 PM</div>
            <div className="text-zinc-500 capitalize text-sm">
              turkish airlines
            </div>
          </div>

          <div className="flex-col md:flex hidden">
            <div className="font-bold text-xl">8 hr 10 min</div>
            <div className="text-zinc-600 text-xs">LGW - JFK</div>
          </div>

          <div className="font-bold text-xl md:flex hidden">1 Stop</div>
          <div className="font-bold text-xl md:flex hidden">200$</div>

          <button
            onClick={() => setShowDetails(!ShowDetails)}
            className="h-10 active:scale-95 active:bg-zinc-100 transition-all w-10 bg-zinc-300 flex items-center justify-center rounded-full"
          >
            <IoIosArrowDown
              className={`${
                ShowDetails && "rotate-180"
              } rotate-0 transition-all`}
              size={25}
            />
          </button>
        </div>
        <div className="flex items-baseline gap-4 px-3 md:hidden">
          <div className="text-xl font-bold">200$</div>

          <div className="text-md">1 Stop</div>
        </div>
      </div>

      <AnimatePresence>
        {ShowDetails && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: "max-content",
            }}
            exit={{
              height: 0,
            }}
            className="overflow-hidden"
          >
            <div className="divider h-[.1em] bg-zinc-300 rounded-full" />
            <StopFlightBox />
            <div className="divider h-[.1em] bg-zinc-300 rounded-full" />
            <StopFlightBox />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StopFlightBox = () => {
  return (
    <div className="flex flex-col md:p-3 p-2 pt-3">
      <div className="flex gap-4">
        <div className="icon w-8 h-8 bg-zinc-200 rounded-full">
          <img
            src="https://companieslogo.com/img/orig/THYAO.IS-f22d40e8.png?t=1602914708"
            alt=""
          />
        </div>
        <div className="font-bold">Qatar Airways</div>
      </div>

      <div className="flex gap-3 pl-2 pt-4">
        <div className="grid grid-rows-[max-content_1fr_max-content]">
          <div className="border-2 -mb-1 border-blue-600 bg-white z-10 w-4 h-4 rounded-full" />
          <div className="w-1 h-full bg-blue-600 mx-auto" />
          <div className="border-2 -mt-1 border-blue-600 bg-white z-10 w-4 h-4 rounded-full" />
        </div>

        <div className="flex md:text-md text-sm flex-col gap-4">
          <div className="font-bold">4:20 am</div>
          <div className="text-zinc-600 text-sm">2h 45min</div>
          <div className="font-bold">1:00 pm</div>
        </div>
        <div className="flex md:text-md text-sm flex-col gap-4">
          <div className="font-bold">Erbil (EBL)</div>
          <div className="text-zinc-600 text-sm">.</div>
          <div className="font-bold">Istanbul sabiha (SAW) ()</div>
        </div>
      </div>
    </div>
  );
};
