"use client";
import * as Select from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

export default function DropDown({ StateValue, setStateValue, options }: any) {
  const [Open, setOpen] = useState(false);

  return (
    <Select.Root
      onOpenChange={(e) => {
        setOpen(e);
        // console.log(Open);
      }}
      open={Open}
      value={StateValue}
      onValueChange={(e) => setStateValue(e)}
    >
      <Select.Trigger className="bg-white py-2 px-3 sm:text-sm text-xs rounded flex gap-2 items-center capitalize active:scale-95 transition-all hover:bg-zinc-100">
        {StateValue}
        <Select.Icon
          className={`${Open && "rotate-180"} rotate-0 transition-all`}
        >
          <AiFillCaretDown />
        </Select.Icon>
      </Select.Trigger>

      <>
        <Select.Portal>
          <Select.SelectContent asChild position="popper" className="z-50 mt-2">
            <motion.div
              className="relative"
              animate={{
                opacity: [0, 1],
                bottom: [-10, 0],
                rotateX: [90, 0],
                scale: [0.9, 1],
                transition: {
                  duration: 0.4,
                },
              }}
              exit={{
                opacity: 0,
                bottom: -10,
                rotateX: 90,
                scale: 0.9,
                transition: {
                  duration: 0.4, // changed from -0.4
                },
              }}
            >
              <Select.Viewport className="min-w-[10em] p-2 rounded bg-white z-20 shadow-xl ">
                {options.map((i: any, index: number) => (
                  <Select.Item
                    key={index + i}
                    className={`${
                      StateValue === i && "bg-zinc-200"
                    } px-2 py-1 rounded hover:bg-zinc-100 transition-all capitalize cursor-pointer active:scale-95`}
                    value={i}
                  >
                    <Select.ItemText>{i}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </motion.div>
          </Select.SelectContent>
        </Select.Portal>
      </>
    </Select.Root>
  );
}
