"use client";
import { useState } from "react";
import { MdDateRange } from "react-icons/md";
import UiDatePicker from "../modals/UiDatePicker";
import { AnimatePresence } from "framer-motion";

type UiDateButtonProps = {
  isRange: boolean;
};

export default function UiDateButton(props: UiDateButtonProps) {
  const [OpenModal, setOpenModal] = useState(false);
  const [DepartureDate, setDepartureDate] = useState<null | any>(null);
  const [ReturnDate, setReturnDate] = useState<null | any>(null);

  return (
    <div className="w-full">
      <button
        onClick={() => setOpenModal(!OpenModal)}
        className="bg-zinc-white text-black py-2 px-3 rounded active:scale-95 transition-all hover:bg-zinc-300 flex w-full justify-center gap-2 items-center capitalize"
      >
        {!DepartureDate && (
          <>
            <MdDateRange />
            <span>set date</span>
          </>
        )}

        {DepartureDate && (
          <>
            <span>
              <span className="font-bold">departure: </span>
              {DepartureDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>

            {props.isRange && ReturnDate && (
              <span>
                - <span className="font-bold">Return: </span>
                {ReturnDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </>
        )}
      </button>

      <AnimatePresence>
        {OpenModal && (
          <UiDatePicker
            isRange={props.isRange}
            setDepartureDate={setDepartureDate}
            setReturnDate={setReturnDate}
            DepartureDate={DepartureDate}
            ReturnDate={ReturnDate}
            setOpen={setOpenModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
