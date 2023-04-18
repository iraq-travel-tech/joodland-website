"use client";
import React, { useState } from "react";
import { DateRange, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { motion } from "framer-motion";

type UiDatePickerProps = {
  isRange: boolean;
  setDepartureDate: any;
  setReturnDate: any;
  DepartureDate: any;
  ReturnDate: any;
  setOpen: any;
};

export default function UiDatePicker(props: UiDatePickerProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener("resize", updateWidth);

  return (
    <div 
    dir="ltr"
    className="fixed z-50 inset-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="sm:p-5 p-2 relative z-10 rounded-xl shadow-xl bg-white"
      >
        {props.isRange ? (
          <DateRange
            minDate={new Date()}
            editableDateInputs={false}
            dateDisplayFormat="MMM d"
            color="orange"
            months={width > 768 ? 2 : 1}
            direction="horizontal"
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            ranges={[
              {
                startDate: props.DepartureDate || new Date(),
                endDate: props.ReturnDate || new Date(),
                key: "selection",
              },
            ]}
            onChange={(item) => {
              props.setDepartureDate(item.selection.startDate || new Date());
              props.setReturnDate(item.selection.endDate || new Date());
            }}
          />
        ) : (
          <Calendar
            minDate={new Date()}
            editableDateInputs={false}
            dateDisplayFormat="MMM d"
            color="orange"
            months={width > 768 ? 2 : 1}
            direction="horizontal"
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            onChange={(item) => {
              props.setDepartureDate(item || new Date());
              props.setReturnDate(null);
              props.setOpen(false);
            }}
            date={props.DepartureDate}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => props.setOpen(false)}
        className="absolute inset-0 bg-black/50"
      />
    </div>
  );
}
