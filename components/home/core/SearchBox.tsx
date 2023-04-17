"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import UiHomeInput from "@/components/ui/inputs/UiHomeInput";
import UiDateButton from "@/components/ui/buttons/UiDateButton";
import UiDropDown from "@/components/ui/dropdowns/UiDropDown";
import UiButton from "@/components/ui/buttons/UiButton";
import UiLink from "@/components/ui/links/UiLink";


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
          <div className="flex gap-3 flex-wrap">
            <UiDropDown
              StateValue={TripDirection}
              setStateValue={setTripDirection}
              options={["round trip", "one way trip"]}
            />

            <UiDropDown
              StateValue={TripClass}
              setStateValue={setTripClass}
              options={["business", "economy"]}
            />

          
            <UiButton
              onClick={() => setShowPassengersDialog(!ShowPassengersDialog)}
              variant="white"
              endIcon={<AiFillCaretDown />}
              className="!text-xs capitalize"
            >
              passengers
            </UiButton>
          </div>

          <div className="flex lg:flex-row flex-col gap-3">
            <div className="flex md:flex-row flex-col gap-3 flex-1">
              <UiHomeInput
                Value={From}
                setValue={setFrom}
                name="from"
                placeholder="Going From"
                startIcon={<FaPlaneDeparture />}
              />

              <UiHomeInput
                Value={To}
                setValue={setTo}
                name="to"
                placeholder="Going To"
                startIcon={<FaPlaneArrival />}
              />
            </div>
            <div className="flex flex-1 lg:max-w-max bg-white rounded gap-2 sm:p-2 p-1 lg:shadow-xl shadow-md">
              <UiDateButton
                isRange={TripDirection === "round trip" ? true : false}
              />
            </div>

            <UiLink
              href={`/flights?from=${From}&to=${To}&depart=${OneWayStartDate}&return=${TwoWaysTripDate[0].endDate}&adults=${Adults}&children=${Children}&babies=${Babies}&class=${TripClass}`}
              variant={"filled"}
              endIcon={<IoSearch />}
              className="!w-full lg:!w-max"
            >
              search
            </UiLink>
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
    </div>
  );
}
