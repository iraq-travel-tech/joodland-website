"use client";
import React, { useEffect, useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import moment from "moment";
import { DayPickerRangeController } from "react-dates";

export default function TestDatePicker() {
  const [startDate, setStartDate] = useState<moment.Moment | null>(null);
  const [endDate, setEndDate] = useState<moment.Moment | null>(null);
  const [focusedInput, setFocusedInput] = useState<"startDate" | "endDate">(
    "startDate"
  );
  const [orientation, setOrientation] = useState(
    window.innerWidth <= 700 ? "vertical" : "horizontal"
  );

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth <= 700 ? "vertical" : "horizontal");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-red-600 rounded-xl p-3 mx-auto w-max">
      <DayPickerRangeController
        initialVisibleMonth={() => moment().add(1, "month")}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => {
          setFocusedInput(focusedInput || "startDate" || "endDate" || null);
        }}
        numberOfMonths={
          orientation === "horizontal" ? 2 : window.innerWidth <= 700 ? 1 : 2
        }
        orientation={orientation as "horizontal" | "vertical"}
        minDate={moment()}
        isOutsideRange={(day) => {
          return day.isBefore(moment(), "day");
        }}
      />
    </div>
  );
}
