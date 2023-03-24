"use client";

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { ElasticSearch } from "@/interfces/elasticSearch";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

export default function HomeInput({
  icon,
  placeholder,
  OpenInput,
  setOpenInput,
  name,
  State,
  setState,
}: {
  icon: React.ReactNode;
  placeholder: string;
  OpenInput: "from" | "to" | null;
  setOpenInput: any;
  name: string;
  State: string;
  setState: any;
}) {
  const [results, setResults] = useState<ElasticSearch[]>([]);
  const [selectedFromList, setSelectedFromList] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      const response = await fetch(
        `https://booking.kayak.com/mvm/smartyv2/search?f=j&s=airportonly&where=${State}`
      );
      const data = await response.json();
      setResults(data);
    }

    fetchResults();
  }, [State]);

  function handleInputBlur() {
    if (!selectedFromList) {
      setState("");
    }
  }

  return (
    <div
      className={`${
        OpenInput === name && "z-50 fixed top-0 left-0 w-full h-full"
      } 
        
        sm:relative flex-1 flex sm:flex-row flex-col`}
    >
      <div
        className={`flex items-center gap-2 sm:flex-1 rounded relative lg:shadow-xl shadow-md bg-white 
        transition-all ${
          OpenInput === name && "shadow-xl absolute top-0  z-30 "
        }`}
      >
        <span className="ml-3 absolute top-4.5 left-2">{icon}</span>{" "}
        <input
          value={State}
          onChange={(e) => {
            setState(e.target.value);
            setSelectedFromList(false);
          }}
          onBlur={handleInputBlur}
          onClick={() => setOpenInput(name)}
          type="text"
          placeholder={placeholder}
          className={`w-full bg-white pl-12 h-full flex-1 rounded p-4 
            ${OpenInput === name && "rounded-0"} transition-all`}
        />{" "}
        {OpenInput === name && (
          <button
            onClick={() => setOpenInput(false)}
            className="absolute top-4.5 right-2 w-8 h-8 hover:bg-zinc-200 rounded-full flex sm:hidden items-center justify-center active:scale-95 transition-all z-30"
          >
            <IoClose size={18} className="" />
          </button>
        )}
      </div>

      {OpenInput === name && (
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
        >
          <motion.ul
            layout
            className="list sm:absolute rounded sm:shadow-xl left-0 sm:top-12 mt-2 right-0 bg-white sm:p-3 p-2 z-40 relative min-w-max sm:max-h-[20em] overflow-y-scroll"
          >
            {results.map((result: ElasticSearch, index: number) => {
              const previousImage =
                index > 0
                  ? results[index - 1].destination_images?.image_jpeg
                  : null;
              const currentImage = result.destination_images?.image_jpeg;
              const showImage = currentImage !== previousImage || index === 0;

              return (
                <motion.li
                  key={index + result.id}
                  layout
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: 20,
                    opacity: 0,
                  }}
                  onClick={() => {
                    setState(result.id);
                    setOpenInput(null);
                    setSelectedFromList(true);
                  }}
                  className="flex gap-3 rounded hover:bg-gray-100 justify-between items-center p-2 cursor-pointer"
                >
                  {" "}
                  {showImage ? (
                    <div className="min-w-10 h-10">
                      <img
                        className="w-full h-full rounded object-cover"
                        src={currentImage}
                        alt=""
                      />
                    </div>
                  ) : (
                    <MdOutlineSubdirectoryArrowRight className="text-black ml-3" />
                  )}
                  <div className="flex flex-col flex-1">
                    <div className="font-bold">{result.name}</div>
                    <div className="text-zinc-500 text-xs truncate max-w-[20em] ">
                      {result.cityname}
                    </div>
                  </div>
                  <div className="font-bold text-white bg-orange-600 py-1 px-2 rounded text-xs">
                    {result.id}
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* dark background */}
          <div
            onClick={() => setOpenInput(null)}
            className="fixed inset-0 sm:bg-black/40 bg-white z-10"
          />
        </motion.div>
      )}
    </div>
  );
}
