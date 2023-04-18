"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import UiHomeInput from "@/components/ui/inputs/UiHomeInput";
import UiDateButton from "@/components/ui/buttons/UiDateButton";
import { LocaleInterface } from "@/dictionaries/LocaleInterface";
import UiButton from "@/components/ui/buttons/UiButton";
import UiLink from "@/components/ui/links/UiLink";
import UiNewDropDown from "@/components/ui/dropdowns/UiNewDropDown";

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

  const [OneWayStartDate, setOneWayStartDate] = useState("");
  const [TwoWaysTripDate, setTwoWaysTripDate] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
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
            <UiNewDropDown
              State={TripDirection}
              setState={setTripDirection}
              options={[
                {
                  value: dictionary.home.oneway,
                  label: dictionary.home.oneway,
                },
                {
                  value: dictionary.home.roundtrip,
                  label: dictionary.home.roundtrip,
                },
              ]}
            />

            <UiNewDropDown
              State={TripClass}
              setState={setTripClass}
              options={[
                {
                  value: dictionary.home.economy,
                  label: dictionary.home.economy,
                },
                {
                  value: dictionary.home.business,
                  label: dictionary.home.business,
                },
              ]}
            />

            <UiButton
              onClick={() => setShowPassengersDialog(!ShowPassengersDialog)}
              variant="white"
              endIcon={<AiFillCaretDown />}
              className="!text-xs capitalize"
            >
              {/* passengers */}
              {dictionary.home.passengers}
            </UiButton>
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
              <UiDateButton
                isRange={
                  TripDirection === dictionary.home.roundtrip ? true : false
                }
              />
            </div>

            <UiLink
              href={`/flights?from=${From}&to=${To}&depart=${OneWayStartDate}&return=${TwoWaysTripDate[0].endDate}&adults=${Adults}&children=${Children}&babies=${Babies}&class=${TripClass}`}
              variant={"filled"}
              endIcon={<IoSearch />}
              className="!w-full lg:!w-max"
            >
              {/* search */}
              {dictionary.home.search}
            </UiLink>
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
    </div>
  );
}
