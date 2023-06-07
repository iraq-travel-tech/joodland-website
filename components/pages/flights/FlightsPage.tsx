"use client";
import { motion } from "framer-motion";
import FlightTicketCard from "@components/blocks/cards/FlightTicketCard";
import Button from "@components/elements/button/Button";
import React, { useState } from "react";
import { MdFilterListAlt } from "react-icons/md";
import DropDown from "@components/elements/dropdown/DropDown";

export default function FlightsPage({
  allTexts,
}: {
  allTexts: {
    selectOutbound: string;
    btns: { goback: string; stops: string; sort: string };
    directions: {
      oneway: string;
      round: string;
    };
  };
}) {
  return (
    <div>
      <motion.div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-secondary-900">
          {allTexts.selectOutbound}
        </div>

        <div className="sm:hidden">
          <DropDown
            align="end"
            trigger={
              <Button startIcon={<MdFilterListAlt />} roundedFull bg={"ghost"}>
                {allTexts.btns.sort}
              </Button>
            }
          >
            <div className="w-[10em] flex flex-col gap-1">
              <button className="capitalize py-2 px-3 rounded hover:bg-gray-100">
                {allTexts.btns.stops}
              </button>
            </div>
          </DropDown>
        </div>
      </motion.div>

      <motion.div layout className="flex flex-col gap-4 pt-6 pb-10">
        {[1, 2, 3, 4, 5].map((i, index) => (
          <motion.div key={index}>
            <FlightTicketCard
              ticket={{
                logo: "Airline Logo",
                departureTime: "12:40",
                departureLocation: "Baghdad",
                arrivalTime: "12:40",
                arrivalLocation: "Baghdad",
                price: "200$",
                passengerCount: 1,
                type: "One Way",
                stops: 0,
                totalDuration: "3h 10min",
                stopDetails: [
                  {
                    time: "12:40",
                    duration: "3h 10m",
                    location: "Baghdad",
                    airport: "Baghdad International",
                  },
                ],
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
