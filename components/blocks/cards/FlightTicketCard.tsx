"use client";

import Button from "@components/elements/button/Button";
import React, { useState } from "react";
import { BiChevronDown, BiTransferAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { BsAirplaneFill } from "react-icons/bs";
import { FlightSegment } from "@lib/interfaces/FlightsInterfaces";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type FlightTicketCardProps = {
  ticket: Ticket;
};

type Ticket = {
  logo: string;
  departureTime: string;
  departureLocation: string;
  arrivalTime: string;
  arrivalLocation: string;
  price: string;
  passengerCount: number;
  type: string; // One Way or Return
  stops: number;
  stopDetails: FlightSegment[];
  totalDuration: string;
};

export default function FlightTicketCard({ ticket }: FlightTicketCardProps) {
  const [OpenStops, setOpenStops] = useState(false);
  const params = useParams() as { locale: "en" | "ar" };

  const t = useTranslations("common");

  return (
    <motion.div
      className={`
      grid grid-cols-[1fr_max-content] grid-rows-[max-content-1fr_max-content_max-content] custom-shadow rounded-lg p-4  ring-primary-600 ring-0 transition-all
      ${OpenStops ? " !ring-2 " : ""}
    `}
    >
      <p className="col-span-2 font-bold text-secondary-800">{ticket.logo}</p>
      <div className="flex items-center justify-between col-span-2 sm:col-span-1">
        <div className="flex gap-4">
          <div className="flex-col sm:pt-0 pt-2">
            <p
              dir="ltr"
              className="text-lg min-w-max font-bold text-secondary-800 sm:text-2xl"
            >
              {ticket.departureTime.slice(0, -2)}
              <span className=" text-sm">
                {ticket.departureTime.slice(-2)}
              </span>
            </p>
            <p className="text-sm leading-4 text-zinc-400 sm:text-md">
              {ticket.departureLocation}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[.08em] sm:w-8 w-4 rounded bg-zinc-300"></div>
            <p className="text-xs text-center sm:min-w-max w-full text-zinc-500 sm:text-sm">
              {ticket.totalDuration}
            </p>
            <div className="h-[.08em] sm:w-8 w-4 rounded bg-zinc-300"></div>
          </div>
          <div className="flex-col sm:pt-0 pt-2">
            <p
              dir="ltr"
              className="text-lg min-w-max font-bold text-secondary-800 sm:text-2xl"
            >
              {ticket.arrivalTime.slice(0, -2)}
              <span className=" text-sm">
                {ticket.arrivalTime.slice(-2)}
              </span>
            </p>
            <p className="text-sm leading-4 text-zinc-400 sm:text-md">
              {ticket.arrivalLocation}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end mt-6 sm:mt-0">
        <div className="text-xl font-bold text-secondary-800 sm:text-2xl">
          {ticket.price}$
        </div>
        <div className="flex items-center gap-3 text-xs ms:text-sm">
          <p className="flex items-center gap-1">
            <span>{ticket.passengerCount}</span>
            <span>
              <FaUser className="fill-secondary-800" size={12} />
            </span>
          </p>
          <div className="w-1 h-1 bg-black rounded-full circle"></div>
          <p>{ticket.type}</p>
        </div>
      </div>
      <div className="flex col-start-1 row-start-3 mt-auto sm:mt-5 md:col-span-2">
        <Button
          padding={"sm"}
          className="text-sm px-3 !bg-primary-100 !text-primary-700"
          endIcon={
            <BiChevronDown
              className={`${
                OpenStops ? "transform rotate-180" : ""
              } transition-transform duration-300`}
            />
          }
          roundedFull
          onClick={() => setOpenStops(!OpenStops)}
        >
          {t("texts.Stops")}
        </Button>
      </div>

      <AnimatePresence>
        {OpenStops && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: "auto",
            }}
            exit={{
              height: 0,
            }}
            className="flex flex-col col-span-2 gap-4 overflow-hidden"
          >
            {ticket.stopDetails.map((stop, index) => (
              <div
                key={index}
                className={`flex ${
                  index === 0 && "pt-6"
                } flex-col relative gap-4`}
              >
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <div className="font-bold text-secondary-800">
                      {stop.Flight.Departure.time}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {stop.Flight.Departure.time}
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    <div className="font-bold text-secondary-800">
                      {stop.Flight.Departure.location[params.locale]}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {stop.Flight.carrier[params.locale]}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center w-max gap-2 h-[5em]">
                  <BsAirplaneFill className="rotate-180" />
                  <div className="h-full w-[.08em] bg-zinc-300"></div>
                  <div className="circle w-[.5em] min-h-[.5em] h-[.5em] rounded-full bg-black"></div>
                </div>

                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <div className="font-bold text-secondary-800">
                      {stop.Flight.Arrival.time}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {stop.Flight.Arrival.time}
                    </div>
                  </div>

                  <div className="relative flex flex-col">
                    <div className="font-bold text-secondary-800">
                      {stop.Flight.Arrival.location[params.locale]}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {stop.Flight.carrier[params.locale]}
                    </div>
                  </div>
                </div>
                {index < ticket.stopDetails.length - 1 && (
                  <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
                    <BiTransferAlt className="fill-current" size={16} />
                    {stop.connectionDuration} {t("texts.transferTime")}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
