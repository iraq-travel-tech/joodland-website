"use client";
import Flash from "@components/blocks/flash/Flash";
import FlightsSearchBox from "../flights/FlightsSearchBox";
import useFlashMessages from "@lib/hooks/useFlashMessages";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TabsList from "@components/blocks/tabs/TabList";
import HotelsSearchContainer from "../hotels/HotelsSearchContainer";

export interface HomeAllTextsProps {
  switchTexts: {
    direction: {
      oneway: string;
      round: string;
    };
    class: {
      economy: string;
      business: string;
    };
  };
  passengers: {
    name: string;
    adults: {
      title: string;
      subTitle: string;
    };
    children: {
      title: string;
      subTitle: string;
    };
    babies: {
      title: string;
      subTitle: string;
    };
  };
  btns: {
    done: string;
    search: string;
  };
  from: string;
  to: string;
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
  DepartureDate: string;
  ReturnDate: string;
}

export default function HomeSearchContainer({
  noShadow,
  noMarginTop,
  allTexts,
}: {
  noShadow?: boolean;
  noMarginTop?: boolean;
  allTexts: HomeAllTextsProps;
}) {
  const { messages, addFlash, removeFlash } = useFlashMessages();

  const availableServices = [
    {
      name: "flights",
      value: "flights",
    },
    {
      name: "hotels",
      value: "hotels",
    },
  ];
  const [SelectedSearchBox, setSelectedSearchBox] = useState(
    availableServices[0].value
  );

  return (
    <div
      className={`flex z-10 w-full ${
        !noMarginTop && "sm:mt-16 mt-10"
      } flex-col bg-white p-4 rounded-lg ${!noShadow && "shadow-xl"}`}
    >
      <TabsList
        className="text-sm sm:w-max"
        State={SelectedSearchBox}
        setState={setSelectedSearchBox}
        items={availableServices}
      />
      <div className="flex sm:pt-1 pt-3">
        <AnimatePresence mode="wait">
          {SelectedSearchBox === "flights" ? (
            <FlightsSearchBox key="ss" allTexts={allTexts} />
          ) : (
            <HotelsSearchContainer key="ddd" allTexts={allTexts} />
          )}
        </AnimatePresence>
      </div>

      <Flash messages={messages} removeFlash={removeFlash} />
    </div>
  );
}
