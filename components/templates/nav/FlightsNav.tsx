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
import { useTranslations } from "next-intl";
export default function FlightsNav() {
  const [OpenSearchContainer, setOpenSearchContainer] = useState(false);
  const params = useParams() as {
    FromTo: string;
  };

  const t = useTranslations("Home");

  return (
    <header
      className={`sticky top-0 bg-white shadow left-0 transition-all z-40 
      ${OpenSearchContainer ? " h-max " : " h-20 "}  
      `}
    >
      <nav className="flex flex-col items-start justify-between w-full max-w-6xl px-4 py-5 mx-auto sm:px-6 lg:px-8">
        <div className="relative z-50 flex items-center justify-between w-full">
          <Link href="/" className="hidden text-xl font-bold sm:flex">
            Joodland
          </Link>

          <Link className="flex sm:hidden" href="/">
            <Button bg={"ghost"} iconOnly>
              <GoChevronLeft />
            </Button>
          </Link>

          <div className="flex flex-col sm:hidden">
            <div className="flex gap-1">
              {params.FromTo.split("-").map((item, index) => {
                return (
                  <p
                    key={index}
                    className="flex items-center gap-1 text-sm font-bold text-gray-500"
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
