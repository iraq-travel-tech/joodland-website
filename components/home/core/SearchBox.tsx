"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import RegularButton from "@/components/core-ui/buttons/regular/RegularButton";
import OrangeButtonLink from "@/components/core-ui/links/buttonlink/OrangeButtonLink";
import UiHomeInput from "@/components/ui/inputs/UiHomeInput";
import UiDateButton from "@/components/ui/buttons/UiDateButton";
import { LocaleInterface } from "@/dictionaries/LocaleInterface";

const DropDown = dynamic(
  () => import("@/components/core-ui/dropdown/SimpleDropDown/DropDown")
);
const PassengersComponent = dynamic(() => import("../PassengersComponent"));

export default function SearchBox({
  showtexts,
  dictionary,
}: {
  showtexts?: boolean;
  dictionary: LocaleInterface;
}) {
  const [TripDirection, setTripDirection] = useState(dictionary.home.oneway);
  const [TripClass, setTripClass] = useState(dictionary.home.economy);

  const [Adults, setAdults] = useState(1);
  const [Children, setChildren] = useState(0);
  const [Babies, setBabies] = useState(0);

  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");

  const [ShowPassengersDialog, setShowPassengersDialog] = useState(false);
  const [ShowDateComponent, setShowDateComponent] = useState(false);

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
              {/* Where are you flying? */}
              {dictionary.home.title}
            </div>
            <div className="md:text-2xl text-lg text-white">
              {/* Find Your Flights and Book Them with Ease with Jooland. */}
              {dictionary.home.subtitle}
            </div>
          </div>
        )}

        <div className="flex flex-col mt-5 gap-3">
          <div className="flex gap-3 flex-wrap">
            <DropDown
              StateValue={TripDirection}
              setStateValue={setTripDirection}
              options={[dictionary.home.oneway, dictionary.home.roundtrip]}
            />
            <DropDown
              StateValue={TripClass}
              setStateValue={setTripClass}
              // options={["business", "economy"]}
              options={[dictionary.home.economy, dictionary.home.business]}
            />
            <RegularButton
              onClick={() => setShowPassengersDialog(!ShowPassengersDialog)}
              bg="white"
              endIcon={<AiFillCaretDown />}
              className="!text-xs capitalize"
            >
              {/* passengers */}
              {dictionary.home.passengers}
            </RegularButton>
          </div>

          <div className="flex lg:flex-row flex-col gap-3">
            <div className="flex md:flex-row flex-col gap-3 flex-1">
              <UiHomeInput
                Value={From}
                setValue={setFrom}
                name={dictionary.home.from.value}
                placeholder={dictionary.home.from.title}
                startIcon={<FaPlaneDeparture />}
              />

              <UiHomeInput
                Value={To}
                setValue={setTo}
                name={dictionary.home.to.value}
                placeholder={dictionary.home.to.title}
                startIcon={<FaPlaneArrival />}
              />
            </div>
            <div className="flex flex-1 lg:max-w-max bg-white rounded gap-2 sm:p-2 p-1 lg:shadow-xl shadow-md">
              {/* <RegularButton
                onClick={() => setShowDateComponent(true)}
                bg="white"
                endIcon={<BsFillCalendarDateFill />}
                className="capitalize justify-center items-center w-full"
              >
                set date
              </RegularButton> */}
              <UiDateButton
                isRange={
                  TripDirection === dictionary.home.roundtrip ? true : false
                }
              />
            </div>

            <OrangeButtonLink
              href={`/flights?from=${From}&to=${To}&tripclass=${TripClass}&adults=${Adults}&children=${Children}&babies=${Babies}&departure=${OneWayStartDate}`}
              endIcon={<IoSearch aria-label="Search" className="rotate-90" />}
              className="!justify-center"
            >
              {/* search */}
              {dictionary.home.search}
            </OrangeButtonLink>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {ShowPassengersDialog && (
          <PassengersComponent
          dictionary={dictionary}
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
      {/* <AnimatePresence>
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
      </AnimatePresence> */}
    </div>
  );
}
