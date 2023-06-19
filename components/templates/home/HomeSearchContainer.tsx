"use client";
import FlightsSearchBox from "../flights/FlightsSearchBox";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TabsList from "@components/blocks/tabs/TabList";
import HotelsSearchContainer from "../hotels/HotelsSearchContainer";
import { useTranslations } from "next-intl";

export default function HomeSearchContainer({
  noShadow,
  noMarginTop,
}: {
  noShadow?: boolean;
  noMarginTop?: boolean;
}) {
  const t = useTranslations("Home");

  const availableServices = [
    {
      name: t("flights"),
      value: "flights",
    },
    {
      name: t("hotels"),
      value: "hotels",
    },
  ];
  const [SelectedSearchBox, setSelectedSearchBox] = useState(
    availableServices[1].value
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
      <div className="flex pt-3 sm:pt-1">
        <AnimatePresence mode="wait">
          {SelectedSearchBox === "flights" ? (
            <FlightsSearchBox key="ss" />
          ) : (
            <HotelsSearchContainer key="ddd" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
