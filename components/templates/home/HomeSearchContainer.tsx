"use client";
import FlightsSearchBox from "../flights/FlightsSearchBox";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TabsList from "@components/blocks/tabs/TabList";
import HotelsSearchContainer from "../hotels/HotelsSearchContainer";
import { useTranslations } from "next-intl";
import PackagesSearchBox from "../packages/PackagesSearchBox";

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
    {
      name: t("packages"),
      value: "packages",
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
      <div className="flex pt-3 sm:pt-1">
        <AnimatePresence mode="wait">
          {availableServices.map((service) => {
            if (service.value === SelectedSearchBox) {
              if (service.value === "flights") {
                return <FlightsSearchBox key="ss" />;
              } else if (service.value === "hotels") {
                return <HotelsSearchContainer key="ddd" />;
              } else {
                return <PackagesSearchBox />;
              }
            }
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
