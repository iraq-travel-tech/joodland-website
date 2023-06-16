"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface DatesListProps {
  initialDate: string;
}

const DatesList: React.FC<DatesListProps> = ({ initialDate }) => {
  const t = useTranslations("Home");

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

  const generateDates = (selectedDate: string) => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const generatedDates: string[] = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(year, month - 1, day + i);
      const formattedMonth = AllMonths[date.getMonth()];
      const formattedDay = date.getDate();
      generatedDates.push(`${formattedMonth} ${formattedDay}`);
    }
    return generatedDates;
  };

  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [dates, setDates] = useState<string[]>(generateDates(initialDate));

  const handleDateClick = (date: string) => {
    const [monthName, day] = date.split(" ");
    const monthIndex = AllMonths.indexOf(monthName) + 1;
    const newDate = `${selectedDate.split("-")[0]}-${String(
      monthIndex
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    setSelectedDate(newDate);
    setDates(generateDates(newDate));
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function setNamesView(name: string, newValue: string) {
    const params = searchParams
      ? new URLSearchParams(searchParams.toString())
      : null;
    if (params) {
      params.set(name, newValue);
      router.replace(`${pathname}?${params}`);
    }
  }

  useEffect(() => {
    setNamesView("departure", selectedDate);
  }, [selectedDate]);

  return (
    <motion.div
      className={`bg-white md:!translate-y-full py-1 relative border-t border-gray-200 text-zinc-400 flex gap-2 text-sm overflow-x-scroll justify-center noscrollwheel scroll-smooth snap-x snap-mandatory transition-all `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      dir="ltr"
    >
      {dates.map((date, index) => (
        <motion.button
          key={date}
          className={`rounded snap-start min-w-max px-3 ${
            date ===
            `${
              AllMonths[parseInt(selectedDate.split("-")[1], 10) - 1]
            } ${parseInt(selectedDate.split("-")[2], 10)}`
              ? " bg-primary-600 text-white py-1"
              : ""
          }`}
          onClick={() => handleDateClick(date)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {date}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default DatesList;
