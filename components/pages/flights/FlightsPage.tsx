import FlightTicketCard from "@components/blocks/cards/FlightTicketCard";
import Button from "@components/elements/button/Button";
import React from "react";
import { MdFilterListAlt } from "react-icons/md";
import DropDown from "@components/elements/dropdown/DropDown";
import { useTranslations } from "next-intl";
import {
  FlightOffering,
  FlightOfferings,
} from "@lib/interfaces/FlightsInterfaces";

export default function FlightsPage({
  data,
  searchParams,
  locale,
}: {
  data: FlightOffering[];
  searchParams: {
    direction: string;
    class: string;
    adults: string;
    children: string;
    babies: string;
    departure: string;
    return: string;
  };
  locale: "en" | "ar";
}) {
  const t = useTranslations("flights");
  // console.log(searchParams);

  const allTexts = {
    flights: {
      selectOutbound: t("selectOutbound"),
      btns: {
        goback: t("btns.goback"),
        stops: t("btns.stops"),
        sort: t("btns.sort"),
      },
      directions: {
        oneway: t("directions.oneway"),
        round: t("directions.round"),
      },
    },
  };

  data.map((i) => {
    i.flightSegments.map((is) => {
      let aa = {
        // time: is.Flight
      };
    });
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-secondary-900">
          {allTexts.flights.selectOutbound}
        </div>

        <div className="sm:hidden">
          <DropDown
            align="end"
            trigger={
              <Button startIcon={<MdFilterListAlt />} roundedFull bg={"ghost"}>
                {allTexts.flights.btns.sort}
              </Button>
            }
          >
            <div className="w-[10em] flex flex-col gap-1">
              <button className="capitalize py-2 px-3 rounded hover:bg-gray-100">
                {allTexts.flights.btns.stops}
              </button>
            </div>
          </DropDown>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6 pb-10">
        {data.map((i, index) => (
          <div key={index}>
            <FlightTicketCard
              ticket={{
                logo: i.validatingCarrier.logo,
                departureTime: i.Departure.time,
                departureLocation: i.Departure.location[locale],
                arrivalTime: i.Arrival.time,
                arrivalLocation: i.Arrival.location[locale],
                price: i.Price.TotalPrice.toString(),
                passengerCount: 1,
                type: searchParams.direction,
                stops: i.totalStops,
                totalDuration: i.totalDuration[locale],
                stopDetails: i.flightSegments,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
