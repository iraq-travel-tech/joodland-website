"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeSearchContainer from "../home/HomeSearchContainer";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { GoChevronLeft } from "react-icons/go";
import Button from "@components/elements/button/Button";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FlightsNav() {
  const [OpenSearchContainer, setOpenSearchContainer] = useState(false);
  const params = useParams() as {
    FromTo: string;
  };

  return (
    <header
      className={`sticky top-0 bg-white shadow left-0 transition-all z-40 
      ${OpenSearchContainer ? " h-max " : " h-20 "} overflow-hidden 
      `}
    >
      <nav className="max-w-6xl py-5 mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-between flex-col w-full">
        <div className="relative z-50 flex justify-between w-full items-center">
          <Link href="/" className="text-xl font-bold sm:flex hidden">
            JooLand
          </Link>

          <Link className="flex sm:hidden" href="/">
            <Button bg={"ghost"} iconOnly>
              <GoChevronLeft />
            </Button>
          </Link>

          <div className="flex sm:hidden flex-col">
            <div className="flex gap-1">
              {params.FromTo.split("-").map((item, index) => {
                return (
                  <p
                    key={index}
                    className="text-sm flex items-center gap-1 font-bold text-gray-500"
                  >
                    {item}{" "}
                    {index === 0 ? (
                      <GoChevronLeft className="rotate-180 mt-0.5" />
                    ) : (
                      ""
                    )}
                  </p>
                );
              })}
            </div>
          </div>

          <Button
            bg={"ghost"}
            iconOnly
            onClick={() => setOpenSearchContainer(!OpenSearchContainer)}
          >
            {OpenSearchContainer ? <IoMdClose /> : <HiOutlineSearch />}
          </Button>
        </div>

        <AnimatePresence>
          {OpenSearchContainer && (
            <motion.div
              className="w-full"
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: OpenSearchContainer ? 1 : 0,
                y: OpenSearchContainer ? 0 : -20,
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <HomeSearchContainer noShadow noMarginTop />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
