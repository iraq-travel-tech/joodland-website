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
import { useRouter } from "next/navigation";

const PassengersComponent = dynamic(() => import("../PassengersComponent"));

export default function SearchBox({
  showtexts,
  dictionary,
  lang,
}: {
  showtexts?: boolean;
  dictionary: LocaleInterface;
  lang: string;
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

  const router = useRouter();
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
            <div className="mt-40 text-2xl font-bold text-white md:text-4xl">
              {/* Where are you flying? */}
              {dictionary.home.title}
            </div>
            <div className="text-lg text-white md:text-2xl">
              {/* Find Your Flights and Book Them with Ease with Jooland. */}
              {dictionary.home.subtitle}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-5">
          <div className="flex flex-wrap sm:gap-3 gap-2">
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

          <form
            className="flex flex-col  gap-3 lg:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col flex-1 gap-3 md:flex-row">
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
            <div className="flex flex-1 gap-2 p-1 bg-white rounded shadow-md lg:max-w-max sm:p-2 lg:shadow-xl">
              <UiDateButton
                isRange={
                  TripDirection === dictionary.home.roundtrip ? true : false
                }
              />
            </div>

            <UiLink
              href={`${lang}/flights?from=${From}&to=${To}&depart=${
                OneWayStartDate ? OneWayStartDate : TwoWaysTripDate[0].startDate
              }&return=${
                OneWayStartDate ? OneWayStartDate : TwoWaysTripDate[0].endDate
              }&adults=${Adults}&children=${Children}&babies=${Babies}&class=${TripClass}`}
              className="!w-full lg:!w-max"
              variant={"filled"}
              endIcon={<IoSearch />}
            >
              {dictionary.home.search}
            </UiLink>
          </form>
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
