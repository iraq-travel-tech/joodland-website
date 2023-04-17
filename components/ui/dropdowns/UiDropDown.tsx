import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

type UiDropDownProps = {
  StateValue: string;
  setStateValue: any;
  options: string[];
  className?: string;
};

export default function UiDropDown(props: UiDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " ") {
      setIsOpen(!isOpen);
    }
  }

  function handleClickOutside(e: MouseEvent) {
    if (
      componentRef.current &&
      !componentRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative" ref={componentRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`bg-white py-2 sm:px-3 px-2 sm:text-sm text-xs rounded flex gap-2 items-center capitalize active:scale-95 transition-all hover:bg-zinc-100 ${props.className}`}
      >
        {props.StateValue}
        <span className={`${isOpen && "rotate-180"} rotate-0 transition-all`}>
          <AiFillCaretDown />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full pt-2 left-0 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="min-w-[10em] p-2 rounded bg-white z-20 shadow-xl">
              {props.options.map((i, index) => (
                <button
                  key={index + i}
                  className={`${
                    props.StateValue === i && "bg-zinc-200"
                  } px-2 py-1 w-full rounded hover:bg-zinc-100 transition-all capitalize cursor-pointer active:scale-95`}
                  onClick={() => {
                    props.setStateValue(i);
                    setIsOpen(false);
                  }}
                >
                  {i}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
