"use client";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import "../../../styles/daterange.css";

// @ts-ignore
import { DateRange, Calendar } from "react-date-range";

type UiDatePickerProps = {
  isRange: any;
  setOneWayStartDate: any;
  TwoWaysTripDate: any;
  setTwoWaysTripDate: any;
  OneWayStartDate: any;

  setOpenModal: any;
};

function formatDate(date: string) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function UiDatePicker(props: UiDatePickerProps) {
  return (
    <div
      className="rounded-xl shadow-xl 
       md:py-6 
       md:px-5 
      md:bg-white

    
    md:absolute 
    md:top-18
    md:-left-1/2
    md:-translate-x-1/2
    md:w-max
    md:inset-auto

    fixed 
    inset-0

    flex 
    justify-center
    items-end

    z-50
    "
    >
      <div
        className="relative w-full 
      rounded-t-2xl md:p-0 p-10
      md:rounded-t-none
      bg-white z-20
      flex items-center justify-center
      "
      >
        {!props.isRange && (
          <Calendar
            minDate={new Date()}
            className="w-full"
            rangeColors={["#F7F7F7"]}
            date={new Date()}
            onChange={(date: string) =>
              props.setOneWayStartDate(formatDate(formatDate(date)))
            }
          />
        )}
        {props.isRange && (
          <DateRange
            editableDateInputs={true}
            rangeColors={["#F7F7F7"]}
            showDateDisplay={false}
            showMonthAndYearPickers={false}
            monthDisplayFormat="MMMM YYY"
            direction="horizontal"
            minDate={new Date()}
            editableOldDateInputs={true}
            onChange={(item: any) => {
              props.setTwoWaysTripDate([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={props.TwoWaysTripDate}
            min
          />
        )}
      </div>

      <div
        onClick={() => props.setOpenModal(false)}
        className="absolute md:hidden inset-0 z-10 bg-black/50"
      ></div>
    </div>
  );
}
