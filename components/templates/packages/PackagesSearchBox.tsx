"use client";
import { useState } from "react";
import Button from "@components/elements/button/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import HotelsInput from "../hotels/HotelsInput";
import HotelsGuestsRooms from "../hotels/HotelsGuestsRooms";
import PackagesDate from "./PackagesDate";
import PackagesNumbersWheel from "./PackagesNumbersWheel";

const TODAY = new Date();
const YEAR = String(TODAY.getFullYear());
const MONTH = new Intl.DateTimeFormat("en-US", { month: "long" }).format(TODAY);
const DAY = String(TODAY.getDate());

export default function PackagesSearchBox() {
  const router = useRouter();

  const [city, setCity] = useState({
    name: {
      en: "",
      ar: "",
    },
  });

  const [checkIn, setCheckIn] = useState({
    year: YEAR,
    month: MONTH,
    day: DAY,
  });

  const t = useTranslations("packages");

  const allMonths = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ];
  const monthNameToNumber = (monthName: string) => {
    const index = allMonths.indexOf(monthName) + 1;
    return String(index).padStart(2, "0");
  };
  const [isLoading, setIsLoading] = useState(false);

  const packagesUrl = `/packages/${city.name.en}?checkin=${
    checkIn.year
  }-${monthNameToNumber(checkIn.month)}-${
    checkIn.day
  }&adults=1&children=0&rooms=1`;

  return (
    <motion.div
      initial={{
        x: 10,
        opacity: 0,
      }}
      exit={{
        x: -2,
        opacity: 0,
        transition: {
          type: "just",
        },
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          type: "just",
        },
      }}
      className="flex lg:flex-row flex-col w-full gap-3 mt-2"
    >
      <HotelsInput State={city} setState={setCity} />
      <div className="flex sm:flex-row flex-col gap-2">
        <PackagesDate
          date={checkIn}
          title={t("btns.checkin")}
          setDate={setCheckIn}
          months={[...allMonths]}
        />
      </div>

      <HotelsGuestsRooms />
      <PackagesNumbersWheel />
      <Button
        className="h-full w-full"
        disabled={isLoading}
        onClick={() => {
          if (city.name.en === "") {
            // TODO: Handle validation message
          } else {
            setIsLoading(true);
            // Navigate to /flights or whatever you need to do next
            router.push(packagesUrl);
          }
        }}
      >
        {!isLoading && t("btns.search")}
        {isLoading && (
          <AiOutlineLoading3Quarters className="animate-spin h-[1em]" />
        )}
      </Button>
    </motion.div>
  );
}
