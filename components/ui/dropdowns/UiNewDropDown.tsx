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
    <div>
      <Select.Root
        onValueChange={(value) => {
          props.setState(value);
          setOpen(false);
        }}
        open={Open}
        onOpenChange={setOpen}
      >
        <Select.Trigger asChild>
          <button className="py-2 px-3 rounded active:scale-90 transition-all active:brightness-75 flex gap-2 items-center fill-current justify-center bg-white text-black hover:bg-gray-100 !text-xs capitalize select-none">
            <Select.Value>
              {
                props.options.find((option) => option.value === props.State)
                  ?.label
              }
            </Select.Value>

            <Select.Icon asChild>
              <AiFillCaretDown
                className={` transition-all ${
                  Open ? "transform rotate-180" : ""
                }`}
              />
            </Select.Icon>
          </button>
        </Select.Trigger>

        <>
          <>
            <Select.Content
              // make it align to the left
              className="z-40 p-2 mt-12 bg-white rounded shadow "
            >
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
                      active:scale-95 transition-all
                      `}
                      key={option.value}
                      value={option.value}
                    >
                      <Select.ItemText>{option.label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </motion.div>
            </Select.Content>
          </>
        </>
      </Select.Root>
    </div>
  );
}
