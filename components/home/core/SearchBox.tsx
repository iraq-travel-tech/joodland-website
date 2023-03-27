"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import HomeInput from "../inputs/HomeInput";

const TheDateComponent = dynamic(() => import("../Datecomponent"));
const DropDown = dynamic(
  () => import("@/components/core-ui/dropdown/DropDown/DropDown")
);
const PassengersComponent = dynamic(() => import("../PassengersComponent"));

export default function SearchBox({ showtexts }: { showtexts?: boolean }) {
  const [TripDirection, setTripDirection] = useState<
    "one way trip" | "round trip"
  >("one way trip");
  const [TripClass, setTripClass] = useState<"business" | "economy">("economy");

  const [Adults, setAdults] = useState(1);
  const [Children, setChildren] = useState(0);
  const [Babies, setBabies] = useState(0);

  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");

  const [ShowPassengersDialog, setShowPassengersDialog] = useState(false);
  const [ShowDateComponent, setShowDateComponent] = useState(false);
  const [OpenInput, setOpenInput] = useState<"from" | "to" | null>(null);

  const [OneWayStartDate, setOneWayStartDate] = useState("");
  const [TwoWaysTripDate, setTwoWaysTripDate] = useState<any>([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <div>
      {" "}
      <div
        className={`relative flex flex-col ${
          showtexts && "-mt-[3.5em]"
        }  transition-all`}
      >
        {showtexts && (
          <div className="flex flex-col">
            <div className="md:text-4xl text-2xl mt-40 font-bold text-white">
              Where are you flying?
            </div>
            <div className="md:text-2xl text-lg text-white">
              Find Your Flights and Book Them with Ease with Jooland.
            </div>
          </div>
        )}

        <div className="flex flex-col mt-5 gap-3">
          <div className="flex gap-3">
            <DropDown
              StateValue={TripDirection}
              setStateValue={setTripDirection}
              options={["round trip", "one way trip"]}
            />
            <DropDown
              StateValue={TripClass}
              setStateValue={setTripClass}
              options={["business", "economy"]}
            />
            <button
              onClick={() => setShowPassengersDialog(!ShowPassengersDialog)}
              className="bg-white py-2 px-3 text-xs rounded flex gap-2 items-center capitalize active:scale-95 transition-all hover:bg-zinc-100"
            >
              passengers
              <AiFillCaretDown />
            </button>
          </div>

          <div className="flex lg:flex-row flex-col gap-3">
            <div className="flex md:flex-row flex-col gap-3 flex-1">
              <AnimatePresence>
                <HomeInput
                  State={From}
                  setState={setFrom}
                  setOpenInput={setOpenInput}
                  OpenInput={OpenInput}
                  icon={<FaPlaneDeparture />}
                  placeholder="Going From"
                  name="from"
                  key={"from"}
                />
                <HomeInput
                  State={To}
                  setState={setTo}
                  setOpenInput={setOpenInput}
                  OpenInput={OpenInput}
                  icon={<FaPlaneArrival />}
                  placeholder="Going To"
                  name="to"
                  key={"to"}
                />
              </AnimatePresence>
            </div>
            <div className="flex flex-1 lg:max-w-max bg-white rounded gap-2 sm:p-2 p-1 lg:shadow-xl shadow-md">
              <motion.button
                onClick={() => setShowDateComponent(true)}
                className="lg:py-0 py-3 sm:px-4 px-3 min-w-max capitalize lg:flex-none flex-1 flex items-center gap-3 hover:bg-zinc-200 transition-all bg-white rounded active:scale-95 min-h-[2em]"
              >
                <span>
                  <BsFillCalendarDateFill />
                </span>
                set date
              </motion.button>
            </div>
            <Link
              href={`/flights?from=${From}&to=${To}&tripclass=${TripClass}&adults=${Adults}&children=${Children}&babies=${Babies}&departure=${OneWayStartDate}`}
              className="flex items-center sm:justify-between justify-center font-bold px-5 text-white bg-orange-600 hover:bg-orange-500 rounded  shadow-xl hover:scale-95 transition-all active:scale-90 gap-3 capitalize sm:w-max w-full lg:py-0 py-3"
            >
              <IoSearch aria-label="Search" className="rotate-90" />
              search
            </Link>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {ShowPassengersDialog && (
          <PassengersComponent
            Adults={Adults}
            setAdults={setAdults}
            Children={Children}
            setChildren={setChildren}
            Babies={Babies}
            setBabies={setBabies}
            State={ShowPassengersDialog}
            setState={setShowPassengersDialog}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {ShowDateComponent && (
          <TheDateComponent
            ShowDatePicker={ShowDateComponent}
            setShowDatePicker={setShowDateComponent}
            SelectedType={TripDirection}
            TwoWaysTripDate={TwoWaysTripDate}
            setTwoWaysTripDate={setTwoWaysTripDate}
            OneWayStartDate={OneWayStartDate}
            setOneWayStartDate={setOneWayStartDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
