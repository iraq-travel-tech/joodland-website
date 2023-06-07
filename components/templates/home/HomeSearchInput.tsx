"use client";
import TextInput from "@components/elements/textinput/TextInput";
import React, { useEffect, useState, useCallback } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaPlaneDeparture } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// @ts-ignore : doesn't have types
import { useDebouncedValue } from "@mantine/hooks";
import { IoMdClose } from "react-icons/io";
import Button from "@components/elements/button/Button";
import { useParams } from "next/navigation";

type ResultItem = {
  id: string;
  destination_images: { image_jpeg: string };
  name: string;
  cityname: string;
};

type HomeSearchInputProps = {
  State: string;
  setState: (state: string) => void;
  placeHolder: string;
  startIcon: React.ReactNode;
};

const HomeSearchInput: React.FC<HomeSearchInputProps> = ({
  State,
  setState,
  placeHolder,
  startIcon,
}) => {
  const [inputState, setInputState] = useState(State);
  const [openContainer, setOpenContainer] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [selectedFromList, setSelectedFromList] = useState(false);
  const [loading, setLoading] = useState(false);

  const [debouncedFrom] = useDebouncedValue(inputState, 300);

  const handlePopState = useCallback(
    (event: any) => {
      if (openContainer) {
        event.preventDefault();
        setOpenContainer(false);
      }
    },
    [openContainer, setOpenContainer]
  );

  useEffect(() => {
    // Push a new state to history when the dialog opens
    if (openContainer) {
      window.history.pushState(null, "");
    }
  }, [openContainer]);

  useEffect(() => {
    // Add the popstate listener when the dialog is open, remove it when it's not
    if (openContainer) {
      window.addEventListener("popstate", handlePopState);
    } else {
      window.removeEventListener("popstate", handlePopState);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [openContainer, handlePopState]);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);

      try {
        const response = await fetch(
          `https://booking.kayak.com/mvm/smartyv2/search?f=j&s=airportonly&where=${debouncedFrom}`
        );
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    if (debouncedFrom !== "") {
      fetchResults();
    }
  }, [debouncedFrom]);

  function handleInputBlur() {
    if (!selectedFromList) {
      setInputState("");
      setSelectedFromList(false); // reset selectedFromList state here
    }

    setTimeout(() => {
      setOpenContainer(false);
    }, 400);
  }

  function handleInputFocus() {
    setOpenContainer(true);
  }
  const params = useParams();

  return (
    <div
      className={`sm:relative sm:p-0 ${
        openContainer && "z-50 fixed p-5"
      } bg-white  top-0 left-0 w-full h-full`}
    >
      <motion.div layout>
        {openContainer && (
          <div className="text-2xl flex justify-between items-center mb-4 font-bold sm:hidden">
            <p>{placeHolder}</p>
            <button className="active:scale-90 transition-all">
              <IoMdClose />
            </button>
          </div>
        )}
        <TextInput
          className=""
          startIcon={startIcon}
          State={inputState}
          setState={setInputState}
          placeholder={placeHolder}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
        />
      </motion.div>
      {openContainer && (
        <div
          className={`
            autocomeplete-container absolute bg-white  

        sm:h-[17em]
        max-h-[50vh]
        sm:rounded-lg 
        rounded
        sm:top-14
        top-32
        sm:w-[27em]



        ${params.locale === "ar" ? "sm:right-0" : "sm:left-0"}
        left-5

        sm:right-auto
        overflow-y-scroll

        right-5
        flex-col
        flex
        gap-4

        sm:py-0
        py-3

        sm:shadow-lg


            `}
        >
          <AnimatePresence>
            {loading
              ? [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-20 roudned flex gap-2 p-2">
                    <div className="min-w-14 w-14 h-14 rounded bg-gray-300 animate-pulse"></div>
                    <div className="flex flex-col gap-1">
                      <div className="w-[8em] h-6 bg-gray-300 animate-pulse rounded"></div>
                      <div className="w-[4em] h-4 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                  </div>
                ))
              : results.map((item, index) => (
                  <AirportItem
                    key={item.id + index} // Use unique id for key, if available
                    item={item}
                    onSelect={() => {
                      setSelectedFromList(true);
                      setInputState(item.id);
                      setState(item.id);
                      setSelectedFromList(false);
                    }}
                    setFrom={setState}
                  />
                ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const AirportItem: React.FC<{
  item: {
    id: string;
    destination_images: { image_jpeg: string };
    name: string;
    cityname: string;
  };

  onSelect: any;
  setFrom: any;
}> = ({ item, onSelect, setFrom }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      className="h-20 relative cursor-pointer rounded hover:bg-gray-100 p-2 flex gap-2"
      onClick={onSelect}
    >
      <img
        className="object-cover min-w-14 w-14 h-14 rounded"
        src={item.destination_images?.image_jpeg}
        alt={`${item.name} - ${item.cityname}`} // More descriptive alt text
      />
      <div className="flex flex-col">
        <div className="font-bold">{item.name}</div>
        <div className="text-zinc-400 text-sm line-clamp-1">
          {item.cityname}
        </div>
      </div>
      {/* <div>{item.id}</div> */}
    </motion.div>
  );
};

export default HomeSearchInput;
