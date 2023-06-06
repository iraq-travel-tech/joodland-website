"use client";
import { useEffect, useState } from "react";
import Dialog from "../dialog/Dialog";
import WheelPicker from "../wheel/WheelPicker";
import Button from "../button/Button";

interface DatePickerProps {
  date: {
    year: string;
    month: string;
    day: string;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      year: string;
      month: string;
      day: string;
    }>
  >;
  title: string;
  months: any;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
  title,
  months,
}) => {
  const years = Array.from({ length: 2 }, (_, index) => index + 2023);
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(date.year);
  const [month, setMonth] = useState(date.month);
  const [day, setDay] = useState(date.day);

  const handleDone = () => {
    setDate({ year, month, day });
    setOpen(false);
  };

  useEffect(() => {
    setDate({
      year,
      month,
      day,
    });
  }, [year, month, day]);

  return (
    <div>
      <button
        className="bg-gray-100 border rounded border-gray-300 w-full p-3 text-gray-500 h-full"
        onClick={() => setOpen(true)}
      >
        {title} : {year} / {month} / {day}
      </button>
      <Dialog open={open} setOpen={setOpen}>
        <div className="flex justify-between">
          <div className="font-bold">{title}</div>
          <button className="text-blue-600 px-3" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
        <hr className="my-4" />
        <div>
          <div className="flex relative h-[10em] overflow-hidden divide-2">
            <div className="absolute bg-gradient-to-b from-white pointer-events-none w-full h-10 top-3 left-0 z-10" />
            <div className="absolute bg-gradient-to-t from-white pointer-events-none w-full h-10 bottom-3 left-0 z-10" />
            <WheelPicker State={year} setState={setYear} list={years} />
            <WheelPicker State={month} setState={setMonth} list={months} />
            <WheelPicker State={day} setState={setDay} list={days} />
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-zinc-200/40 rounded right-2 left-2 h-[30px] pointer-events-none"></div>
          </div>
        </div>

        <Button onClick={handleDone} className="w-full mt-5">
          Done
        </Button>
      </Dialog>
    </div>
  );
};

export default DatePicker;
