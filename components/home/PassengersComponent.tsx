"use client";
import { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import DialogBox from "../core-ui/dialogbox/DialogBox";
import { AnimatePresence, motion } from "framer-motion";

export default function PassengersComponent({
  State,
  setState,
  Adults,
  setAdults,
  Children,
  setChildren,
  Babies,
  setBabies,
}: any) {
  const [Plus, setPlus] = useState(true);

  const psList = [
    {
      name: "adults",
      age: "more than 12 years old",
      state: Adults,
      setState: setAdults,
      min: 1,
    },
    {
      name: "children",
      age: "2-12 years old",
      state: Children,
      setState: setChildren,
      min: 0,
    },
    {
      name: "babies",
      age: "0-2 years old",
      state: Babies,
      setState: setBabies,
      min: 0,
    },
  ];

  return (
    <DialogBox State={State} setState={setState}>
      <div className="bg-white max-w-[50em] transition-all sm:min-w-[25em] rounded shadow-xl py-4 px-5 ">
        <div className="text-2xl font-bold">Passengers</div>

        <div className="w-full h-[.03em] my-4 bg-zinc-200 rounded-full" />
        <div className="flex flex-col gap-4">
          {psList.map((passenger, index: number) => (
            <div
              key={index + passenger.name}
              className="flex gap-8 justify-between items-center"
            >
              <div className="flex flex-col">
                <div className="font-bold capitalize">{passenger.name}</div>
                <div className="text-xs text-zinc-500">{passenger.age}</div>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  className="w-10 h-10 rounded-full border active:scale-90 transition-all hover:bg-zinc-200 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    passenger.setState(passenger.state + 1);
                    setPlus(true);
                  }}
                >
                  <BiPlus />
                </button>

                <div className="w-5 h-6 relative">
                  <AnimatePresence>
                    <motion.div
                      className={`absolute ${
                        passenger.state < 10 && "!left-1.5"
                      } left-0.5`}
                      key={passenger.state}
                      initial={{
                        translateY: Plus ? 20 : -20,
                        opacity: 0.5,
                        scale: 0.4,
                      }}
                      animate={{
                        translateY: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        translateY: !Plus ? 20 : -20,
                        opacity: 0,
                        scale: 0.4,
                      }}
                    >
                      {passenger.state}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <button
                  className="w-10 h-10 rounded-full border active:scale-90 transition-all hover:bg-zinc-200 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setPlus(false);
                    passenger.setState(
                      passenger.state > passenger.min
                        ? passenger.state - 1
                        : passenger.min
                    );
                  }}
                >
                  <BiMinus />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setState(!State)}
            className="p-2 font-bold text-white rounded bg-orange-600 active:scale-95 transition-all active:bg-orange-500 mt-3"
          >
            Done
          </button>
        </div>
      </div>
    </DialogBox>
  );
}
