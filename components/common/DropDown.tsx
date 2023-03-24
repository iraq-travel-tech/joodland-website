import { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function DropDown({
  StateValue,
  setStateValue,
  options,
  className,
}: {
  StateValue: string;
  setStateValue: any;
  options: string[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // add event listener to detect clicks outside of the component
    document.addEventListener("click", handleClickOutside);
    return () => {
      // remove the event listener when the component unmounts
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

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    // Add cleanup function to reset the overflow property of the body element
    return () => {
      body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={componentRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`bg-white py-2 sm:px-3 px-2 sm:text-sm text-xs rounded flex gap-2 items-center capitalize active:scale-95 transition-all hover:bg-zinc-100 ${className}`}
      >
        {StateValue}
        <span className={`${isOpen && "rotate-180"} rotate-0 transition-all`}>
          <AiFillCaretDown />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 z-20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="min-w-[10em] p-2 rounded bg-white z-20 shadow-xl">
              {options.map((i, index) => (
                <button
                  key={index + i}
                  className={`${
                    StateValue === i && "bg-zinc-200"
                  } px-2 py-1 w-full rounded hover:bg-zinc-100 transition-all capitalize cursor-pointer active:scale-95`}
                  onClick={() => {
                    setStateValue(i);
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
