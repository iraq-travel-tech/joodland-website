"use client";
import { useState } from "react";
import HotelsInput from "./HotelsInput";
import Button from "@components/elements/button/Button";
import { useTranslations } from "next-intl";
import HotelsDatePicker from "./HotelsDatePicker";
import { useParams } from "next/navigation";
import HotelsGuestsRooms from "./HotelsGuestsRooms";

export default function HotelsSearchContainer() {
  const params = useParams() as {
    locale: "en" | "ar";
  };

  const [City, setCity] = useState({
    name: "",
    country: "",
  });

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

  return (
    <div className="flex lg:flex-row flex-col w-full gap-3 mt-2">
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

      <Button>{t("btns.search")}</Button>
    
    </div>
  );
}
