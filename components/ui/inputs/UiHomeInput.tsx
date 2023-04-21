"use client";

import { ElasticSearch } from "@/interfces/elasticSearch";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

// @ts-ignore : doesn't have types
import { useDebouncedValue } from "@mantine/hooks";

interface UiHomeInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  startIcon: React.ReactNode;
  placeholder: string;

  Value: string;
  setValue: any;

  name: string;

  className?: string;
}

const UiHomeInput = (props: UiHomeInputProps) => {
  const [OpenInput, setOpenInput] = useState(false);
  const [results, setResults] = useState<ElasticSearch[]>([]);
  const [selectedFromList, setSelectedFromList] = useState(false);

  const [debounced] = useDebouncedValue(props.Value, 300);

  useEffect(() => {
    async function fetchResults() {
      const response = await fetch(
        `https://booking.kayak.com/mvm/smartyv2/search?f=j&s=airportonly&where=${props.Value}`
      );
      const data = await response.json();
      setResults(data);
    }

    fetchResults();
  }, [debounced]);

  function handleInputBlur() {
    if (!selectedFromList) {
      props.setValue("");
    }

    setTimeout(() => {
      setOpenInput(false);
    }, 400);
  }

  return (
    <motion.div
      layout
      className={`
        sm:!relative 
        
         sm:!p-0 
         z-10
flex-1
    ${OpenInput && "fixed inset-0 p-4 z-50 bg-white"}

    `}
    >
      <motion.div
        layout
        className="relative z-40 flex items-center gap-2 bg-white rounded shadow-md sm:flex-1 lg:shadow-xl"
      >
        <input
          type="text"
          className="flex-1 w-full h-full p-4 bg-white rounded shadow-md ltr:pl-12 rtl:pr-12"
          placeholder={props.placeholder}
          value={props.Value}
          onChange={(e) => {
            props.setValue(e.target.value);
            setSelectedFromList(false);
          }}
          onBlur={handleInputBlur}
          onClick={() => setOpenInput(true)}
          required
        />
        <span className="ltr:ml-3 rtl:mr-3 absolute top-4.5 ltr:left-2 rtl:right-2">
          {props.startIcon}
        </span>{" "}
        <AnimatePresence>
          {OpenInput && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => {
                setOpenInput(false);
              }}
              className="ml-3 hover:bg-zinc-200 p-1 rounded-full active:scale-95 transition-all absolute top-4.5 ltr:right-3 rtl:left-3"
            >
              <IoClose size={17} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <>
        {OpenInput && (
          <motion.div
            layout
            transition={{
              duration: 0.2,
            }}
            className="relative left-0 z-20 flex flex-col w-full gap-3 p-3 overflow-hidden bg-white rounded shadow-md sm:absolute sm:top-16 top-5 sm:shadow-xl"
          >
            <AnimatePresence>
              {results.map((i, index) => (
                <motion.button
                  key={i.id + index}
                  onClick={() => {
                    setSelectedFromList(true);
                    props.setValue(i.id);
                  }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{
                    type: "spring",
                    duration: 0.4,
                  }}
                  layout
                  className="flex items-center justify-between gap-3 p-2 text-left rounded cursor-pointer hover:bg-gray-100"
                >
                  <div className="h-10 min-w-10">
                    <img
                      className="object-cover w-full h-full rounded"
                      src={i.destination_images?.image_jpeg}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="font-bold">{i.name}</div>
                    <div className="text-zinc-500 text-xs truncate max-w-[20em] ">
                      {i.cityname}
                    </div>
                  </div>

                  <div className="px-2 py-1 text-xs font-bold text-white bg-orange-600 rounded">
                    {i.id}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </>

      <AnimatePresence>
        {OpenInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-10 sm:inset-0 bg-black/50"
          ></motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UiHomeInput;
