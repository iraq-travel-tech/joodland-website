"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

type Locale = "en" | "ar";

interface DatesListProps {
  initialDate: string;
}

const DatesList: React.FC<DatesListProps> = ({ initialDate }) => {
  const { locale } = useParams() as {
    locale: Locale;
  };

  const monthNames = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ar: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  };

  const generateDates = (selectedDate: string) => {
    const [year, month, day] = selectedDate.split("-").map(Number);
    const generatedDates: string[] = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(year, month - 1, day + i);
      const formattedMonth = monthNames[locale][date.getMonth()];
      const formattedDay = date.getDate();
      generatedDates.push(`${formattedMonth} ${formattedDay}`);
    }
    return generatedDates;
  };

  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [dates, setDates] = useState<string[]>(generateDates(initialDate));

  const handleDateClick = (date: string) => {
    const [monthName, day] = date.split(" ");
    const monthIndex = monthNames[locale].indexOf(monthName) + 1;
    const newDate = `${selectedDate.split("-")[0]}-${String(
      monthIndex
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    setSelectedDate(newDate);
    setDates(generateDates(newDate));
  };

  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingDown(currentScrollPos > prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className={`bg-white py-1 relative border-t border-gray-200 text-zinc-400 flex gap-2 text-sm overflow-x-scroll justify-center noscrollwheel scroll-smooth transition-all ${
        isScrollingDown ? "translate-y-full" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {dates.map((date, index) => (
        <motion.button
          key={date}
          className={`rounded min-w-max px-3 ${
            date ===
            `${
              monthNames[locale][parseInt(selectedDate.split("-")[1], 10) - 1]
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
