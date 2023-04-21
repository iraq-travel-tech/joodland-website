import * as Select from "@radix-ui/react-select";
import { AiFillCaretDown } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type UiNewDropDownProps = {
  options: { value: string; label: string }[];

  State: string;
  setState: (value: string) => void;
};

export default function UiNewDropDown(props: UiNewDropDownProps) {
  const [Open, setOpen] = useState(false);

  return (
    <div className="relative z-20">
      <Select.Root
        onValueChange={(value) => {
          props.setState(value);
        }}
        open={Open}
        onOpenChange={() => {
          setTimeout(() => {
            setOpen(!Open);
          }, 100);
        }}
      >
        <Select.Trigger asChild>
          <button className="py-2 sm:px-3 px-2 rounded active:scale-90 transition-all active:brightness-75 flex sm:gap-2 gap-1  items-center fill-current justify-center bg-white text-black hover:bg-gray-100 !text-xs capitalize select-none">
            <Select.Value>{props.State}</Select.Value>

            <Select.Icon
              className={` transition-all ${
                Open ? "transform rotate-180" : ""
              }`}
            >
              <AiFillCaretDown />
            </Select.Icon>
          </button>
        </Select.Trigger>

        <>
          <Select.Portal className="z-20 absolute">
            <Select.Content
              align="start"
              position="popper"
              className="p-2 bg-white rounded shadow min-w-max"
            >
              <Select.Group>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Select.Viewport>
                    {props.options.map((option) => (
                      <Select.Item
                        className={`px-7 py-1 cursor-pointer hover:bg-zinc-200 rounded transition-all text-center focus:bg-zinc-200
                      ${
                        option.value === props.State
                          ? "bg-zinc-200"
                          : "bg-white"
                      }
                      active:scale-95 transition-all relative z-50
                      `}
                        key={option.value}
                        value={option.value}
                      >
                        <Select.ItemText>{option.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </motion.div>
              </Select.Group>
            </Select.Content>
          </Select.Portal>
        </>
      </Select.Root>
    </div>
  );
}
