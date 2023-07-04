"use client";
import Button from "@components/elements/button/Button";
import Dialog from "@components/elements/dialog/Dialog";
import WheelPicker from "@components/elements/wheel/WheelPicker";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TbCalendarStats } from "react-icons/tb";

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

const PackagesDate: React.FC<DatePickerProps> = ({
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
    setDate({ year, month, day: String(day).padStart(2, "0") });
    setOpen(false);
  };

  useEffect(() => {
    setDate({
      year,
      month,
      day,
    });
  }, [year, month, day]);

  const t = useTranslations("common");
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 h-14 min-w-[14em] cursor-pointer border bg-gray-100 rounded-lg px-3 py-2 border-gray-300  relative"
      >
        <span className="text-zinc-400">
          <TbCalendarStats size={22} />
        </span>
        <div className="flex flex-col">
          <div className="text-xs leading-1 text-zinc-400">{title}</div>
          <p className="capitalize text-sm font-semibold">
            {year} / {month} / {day}
          </p>
        </div>
      </div>

      <Dialog open={open} setOpen={setOpen}>
        <div className="flex justify-between">
          <div className="font-bold">{title}</div>
          <button className="px-3 text-blue-600" onClick={() => setOpen(false)}>
            {t("btns.cancel")}
          </button>
        </div>
        <hr className="my-4" />
        <div>
          <div className="flex relative h-[10em] overflow-hidden divide-2">
            <div className="absolute left-0 z-10 w-full h-10 pointer-events-none bg-gradient-to-b from-white top-3" />
            <div className="absolute left-0 z-10 w-full h-10 pointer-events-none bg-gradient-to-t from-white bottom-3" />
            <WheelPicker State={year} setState={setYear} list={years} />
            <WheelPicker State={month} setState={setMonth} list={months} />
            <WheelPicker State={day} setState={setDay} list={days} />
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-zinc-200/40 rounded right-2 left-2 h-[30px] pointer-events-none"></div>
          </div>
        </div>

        <Button onClick={handleDone} className="w-full mt-5">
          {t("btns.done")}
        </Button>
      </Dialog>
    </>
  );
};

export default PackagesDate;
