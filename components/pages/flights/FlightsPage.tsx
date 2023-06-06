"use client";
import { motion } from "framer-motion";
import FlightTicketCard from "@components/blocks/cards/FlightTicketCard";
import Button from "@components/elements/button/Button";
import React, { useState } from "react";
import { MdFilterListAlt } from "react-icons/md";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import DropDown from "@components/elements/dropdown/DropDown";

const ticketVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: -50, opacity: 0, transition: { duration: 0.2 } },
};

export default function FlightsPage() {
  const [Filter, setFilter] = useState();
  return (
    <div>
      <motion.div
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="flex  justify-between items-center"
      >
        <div className="text-2xl font-bold text-secondary-900">
          Select outbound
        </div>

        <div className="sm:hidden">
        <DropDown
          align="end"
          trigger={
            <Button startIcon={<MdFilterListAlt />} roundedFull bg={"ghost"}>
              sort filters
            </Button>
          }
        >
          <div className="w-[10em] flex flex-col gap-1">
            <button className="capitalize py-2 px-3 rounded hover:bg-gray-100">
              non stop
            </button>
          </div>
        </DropDown>

        </div>
      </motion.div>

      <motion.div layout className="flex flex-col gap-4 pt-6 pb-10">
        {[1, 2, 3, 4, 5].map((i, index) => (
          <motion.div
            key={index}
            variants={ticketVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
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
