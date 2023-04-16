"use client";
import { useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import { MdDateRange } from "react-icons/md";

type DateButtonProps = {
  isRange: boolean;
};

const UiDatePicker = dynamic(() => import("../modals/UiDatePicker"), {
  ssr: false,
});

export default function UiDateButton(props: DateButtonProps) {
  const [OneWayStartDate, setOneWayStartDate] = useState("");
  const [TwoWaysTripDate, setTwoWaysTripDate] = useState<any>([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [OpenModal, setOpenModal] = useState(false);

  return (
    <div className="relative w-full ">
      <button
        onClick={() => setOpenModal(!OpenModal)}
        className="bg-zinc-white text-black py-2 px-3 rounded active:scale-95 transition-all hover:bg-zinc-300 flex w-full justify-center gap-2 items-center capitalize"
      >
        <MdDateRange />

        {!props.isRange && (
          <div>
            {OneWayStartDate
              ? new Date(OneWayStartDate).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                })
              : "set date"}
          </div>
        )}
        {props.isRange && TwoWaysTripDate.length > 0 && (
          <div>
            {TwoWaysTripDate[0].startDate
              ? new Date(TwoWaysTripDate[0].startDate).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                })
              : ""}{" "}
            -{" "}
            {TwoWaysTripDate[0].endDate
              ? new Date(TwoWaysTripDate[0].endDate).toLocaleString("en-US", {
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </div>
        )}
      </button>

      {OpenModal && (
        <UiDatePicker
          isRange={props.isRange}
          setOneWayStartDate={setOneWayStartDate}
          TwoWaysTripDate={TwoWaysTripDate}
          setTwoWaysTripDate={setTwoWaysTripDate}
          OneWayStartDate={OneWayStartDate}
          setOpenModal={setOpenModal}
        />
      )}
    </div>
  );
}
