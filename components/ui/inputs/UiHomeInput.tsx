"use client";

import { ElasticSearch } from "@/interfces/elasticSearch";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface UiHomeInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  startIcon: React.ReactNode;
  placeholder: string;

  Value: string;
  setValue: any;

  name: "from" | "to";

  className?: string;
}

export default function UiHomeInput(props: UiHomeInputProps) {
  const [OpenInput, setOpenInput] = useState(false);
  const [results, setResults] = useState<ElasticSearch[]>([]);
  const [selectedFromList, setSelectedFromList] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      const response = await fetch(
        `https://booking.kayak.com/mvm/smartyv2/search?f=j&s=airportonly&where=${props.Value}`
      );
      const data = await response.json();
      setResults(data);
    }

    fetchResults();
  }, [props.Value]);

  function handleInputBlur() {
    if (!selectedFromList) {
      props.setValue("");
    }

    setTimeout(() => {
      setOpenInput(false);
    }, 400);
  }

  return (
    <div
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
        className="relative flex items-center gap-2 sm:flex-1 rounded lg:shadow-xl shadow-md bg-white z-40"
      >
        <input
          type="text"
          className="w-full bg-white pl-12 h-full flex-1 rounded p-4 shadow-md"
          placeholder={props.placeholder}
          value={props.Value}
          onChange={(e) => {
            props.setValue(e.target.value);
            setSelectedFromList(false);
          }}
          onBlur={handleInputBlur}
          onClick={() => setOpenInput(true)}
        />
        <span className="ml-3 absolute top-4.5 left-2">{props.startIcon}</span>{" "}
        <AnimatePresence>
          {OpenInput && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => {
                setOpenInput(false);
              }}
              className="ml-3 hover:bg-zinc-200 p-1 rounded-full active:scale-95 transition-all absolute top-4.5 right-3"
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
            className="sm:absolute z-20 relative sm:top-16 top-5 left-0 w-full bg-white flex flex-col overflow-hidden gap-3 p-3 rounded shadow-md sm:shadow-xl"
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
                  className="flex text-left gap-3 rounded hover:bg-gray-100 justify-between items-center p-2 cursor-pointer"
                >
                  <div className="min-w-10 h-10">
                    <img
                      className="w-full h-full rounded object-cover"
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

                  <div className="font-bold text-white bg-orange-600 py-1 px-2 rounded text-xs">
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
    </div>
  );
}
