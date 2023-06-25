"use client";
import { useState } from "react";
import HotelsInput from "./HotelsInput";
import Button from "@components/elements/button/Button";
import { useTranslations } from "next-intl";
import HotelsDatePicker from "./HotelsDatePicker";
import { useParams, useRouter } from "next/navigation";
import HotelsGuestsRooms from "./HotelsGuestsRooms";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

export default function HotelsSearchContainer() {
  const params = useParams() as {
    locale: "en" | "ar";
  };

  const router = useRouter();

  const [City, setCity] = useState({
    name: "",
    country: "",
  });

  const monthNameToNumber = (monthName: string) => {
    const index = AllMonths.indexOf(monthName) + 1;
    return String(index).padStart(2, "0");
  };

  const t = useTranslations("Home");

  const today = new Date();
  const year = String(today.getFullYear());
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    today
  );
  const day = String(today.getDate());

  const [CheckIn, setCheckIn] = useState({
    year: year,
    month: month,
    day: day,
  });

  const [CheckOut, setCheckOut] = useState({
    year: year,
    month: month,
    day: day,
  });

  const AllMonths = [
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
  const [Loading, setLoading] = useState(false);

  const hotelsUrl = `/hotels/${City.name}?checkin=${
    CheckIn.year
  }-${monthNameToNumber(CheckIn.month)}-${CheckIn.day}&checkout=${
    CheckOut.year
  }-${monthNameToNumber(CheckOut.month)}-${
    CheckOut.day
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
      <HotelsInput State={City} setState={setCity} />
      <div className="flex sm:flex-row flex-col gap-2">
        <HotelsDatePicker
          date={CheckIn}
          title={t("checkin")}
          setDate={setCheckIn}
          months={[...AllMonths]}
        />

        <HotelsDatePicker
          date={CheckOut}
          title={t("checkout")}
          setDate={setCheckOut}
          months={[...AllMonths]}
        />
      </div>
      <HotelsGuestsRooms />
      <Button
        className="h-full w-full"
        onClick={() => {
          if (City.name === "") {
            alert("Please enter a city");
          } else if (
            CheckIn.year === CheckOut.year &&
            CheckIn.month === CheckOut.month &&
            CheckIn.day === CheckOut.day
          ) {
            alert("Check-out date cannot be the same as check-in date");
          } else {
            setLoading(true);
            // Navigate to /flights or whatever you need to do next
            router.push(hotelsUrl);
          }
        }}
      >
        {!Loading && t("btns.search")}
        {Loading && (
          <AiOutlineLoading3Quarters className="animate-spin h-[1em]" />
        )}
      </Button>
    </motion.div>
  );
}
