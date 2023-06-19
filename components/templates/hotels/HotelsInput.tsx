"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDebouncedValue } from "@mantine/hooks";

interface FetchResponse {
  name: string;
  latitude: string;
  longitude: string;
  country: string;
  population: string;
  is_capital: boolean;
}

export default function HotelsInput({
  State,
  setState,
}: {
  State: { name: string; country: string };
  setState: any;
}) {
  const [OpenContainer, setOpenContainer] = useState(false);
  const [inputState, setInputState] = useState(State.name);
  const [Results, setResults] = useState<FetchResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const InputRef = useRef<HTMLInputElement>(null);
  const [selectedFromList, setSelectedFromList] = useState(false);

  const [debouncedInput] = useDebouncedValue(inputState, 500);

  const focusInput = () => {
    if (InputRef.current) {
      InputRef.current.focus();
    }
  };

  const Focused = () => {
    setOpenContainer(true);
  };

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      setError("");
      try {
        if (debouncedInput.trim() !== "") {
          const response = await fetch(`/api/cities?query=${debouncedInput}`);
          const data = await response.json();
          setResults(data);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching data");
      }
      setLoading(false);
    }

    fetchResults();
  }, [debouncedInput]);

  const OnInputBlur = () => {
    selectedFromList
      ? () => {
          setState({ name: "", country: "" });
          setInputState("");
        }
      : setInputState(State.name);
    setSelectedFromList(false);

    setTimeout(() => {
      setOpenContainer(false);
    }, 300);
  };

  return (
    <div
      className={`w-full md:relative md:overflow-visible ${
        OpenContainer
          ? "fixed inset-0 z-50 bg-white p-3 overflow-y-auto md:p-0 md:bg-transparent md:static"
          : "relative h-14"
      }`}
    >
      <motion.div layout>
        <motion.input
          ref={InputRef}
          className="relative h-14 w-full px-3 pb-1 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:pt-3.5 font-semibold transition duration-200 ease-in-out text-base"
          onFocus={Focused}
          onBlur={OnInputBlur}
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          style={{ paddingLeft: "3rem" }}
        />
      </motion.div>

      {OpenContainer ? (
        <>
          <AiOutlineClose
            size={28}
            className={`absolute md:left-3 left-5 md:top-1/2 top-10 transform -translate-y-1/2 text-zinc-400 text-lg`}
          />
        </>
      ) : (
        <AiOutlineSearch
          size={28}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 text-lg`}
        />
      )}

      <motion.div
        className={`labeltext absolute  text-zinc-400 md:!block
        
        ${
          OpenContainer || inputState.trim() !== ""
            ? "left-12 top-2 text-xs hidden"
            : "top-4 capitalize left-12 transform text-base"
        }
        `}
        layout
        onClick={focusInput}
      >
        destinations
      </motion.div>

      <AnimatePresence>
        {OpenContainer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-2 w-full mt-4 rounded-lg bg-white flex flex-col overflow-y-auto md:w-[30em] md:h-[20em] md:mt-0 md:absolute md:top-[4.4em] md:left-0 md:shadow-lg`}
          >
            {loading ? (
              <>
                {[1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    className="h-14 my-1 w-full rounded-lg bg-gray-200 animate-pulse"
                  ></motion.div>
                ))}
              </>
            ) : error ? (
              <div>{error}</div>
            ) : (
              Results.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex gap-3 p-2 rounded-lg hover:bg-gray-200 items-center cursor-pointer active:scale-95 transition-all"
                  onClick={() => {
                    setSelectedFromList(true);
                    setState({ name: item.name, country: item.country });
                    setInputState(item.name);
                  }}
                >
                  <HiOutlineLocationMarker
                    size={22}
                    className="text-primary-500"
                  />
                  <div className="flex flex-col">
                    <div className="capitalize font-bold text-lg">
                      {item.name}
                    </div>
                    <div className="text-zinc-400 text-xs leading-1">
                      {item.country}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
