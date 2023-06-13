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
  const allTexts = {
    switchTexts: {
      direction: {
        oneway: t("switchTexts.direction.oneway"),
        round: t("switchTexts.direction.round"),
      },
      class: {
        economy: t("switchTexts.class.economy"),
        business: t("switchTexts.class.business"),
      },
    },
    city: t("city"),
    flights: t("flights"),
    hotels: t("hotels"),
    passengers: {
      name: t("passengers.name"),
      adults: {
        title: t("passengers.adults.title"),
        subTitle: t("passengers.adults.subTitle"),
      },
      children: {
        title: t("passengers.children.title"),
        subTitle: t("passengers.children.subTitle"),
      },
      babies: {
        title: t("passengers.babies.title"),
        subTitle: t("passengers.babies.subTitle"),
      },
    },
    btns: {
      done: t("btns.done"),
      search: t("btns.search"),
    },
    from: t("from"),
    to: t("to"),
    months: {
      january: t("months.january"),
      february: t("months.february"),
      march: t("months.march"),
      april: t("months.april"),
      may: t("months.may"),
      june: t("months.june"),
      july: t("months.july"),
      august: t("months.august"),
      september: t("months.september"),
      october: t("months.october"),
      november: t("months.november"),
      december: t("months.december"),
    },
    DepartureDate: t("DepartureDate"),
    ReturnDate: t("ReturnDate"),
    flashfrom: t("flashfrom"),
    flashto: t("flashto"),
  };

  return (
    <header
      className={`sticky top-0 bg-white shadow left-0 transition-all z-40 
      ${OpenSearchContainer ? " h-max " : " h-20 "}  
      `}
    >
      <nav className="max-w-6xl py-5 mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-between flex-col w-full">
        <div className="relative z-50 flex justify-between w-full items-center">
          <Link href="/" className="text-xl font-bold sm:flex hidden">
            Joodland
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
              <HomeSearchContainer noShadow noMarginTop allTexts={allTexts} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
