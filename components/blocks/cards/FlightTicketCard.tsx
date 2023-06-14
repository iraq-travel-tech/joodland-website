"use client";

import Button from "@components/elements/button/Button";
import React, { useState } from "react";
import { BiChevronDown, BiTransferAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { BsAirplaneFill } from "react-icons/bs";
import { FlightSegment } from "@lib/interfaces/FlightsInterfaces";
import { useParams } from "next/navigation";

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

type ticketCardProps = {
  ticket: Ticket;
};

export default function FlightTicketCard({ ticket }: FlightTicketCardProps) {
  const [OpenStops, setOpenStops] = useState(false);
  const params = useParams() as { locale: "en" | "ar" };

  return (
    <motion.div
      className={`
      grid grid-cols-[1fr_max-content] grid-rows-[max-content-1fr_max-content_max-content] custom-shadow rounded-lg p-4  ring-primary-600 ring-0 transition-all
      ${OpenStops ? " !ring-2 " : ""}
    `}
    >
      <p className="font-bold text-secondary-800 col-span-2">{ticket.logo}</p>
      <div className="flex sm:col-span-1 col-span-2 justify-between items-center">
        <div className="flex gap-4">
          <div className="flex-col">
            <p className="font-bold text-secondary-800 sm:text-2xl text-xl">
              {ticket.departureTime}
              <span className="text-sm ml-1">AM</span>
            </p>
            <p className="text-zinc-400 leading-4 sm:text-md text-sm">
              {ticket.departureLocation}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[.08em] sm:w-8 w-4 rounded bg-zinc-300"></div>
            <p className="sm:min-w-max text-center text-zinc-500 sm:text-sm text-xs">
              {ticket.totalDuration}
            </p>
            <div className="h-[.08em] sm:w-8 w-4 rounded bg-zinc-300"></div>
          </div>
          <div className="flex-col">
            <p className="font-bold text-secondary-800 sm:text-2xl text-xl">
              {ticket.arrivalTime}
              <span className="text-sm ml-1">AM</span>
            </p>
            <p className="text-zinc-400 leading-4 sm:text-md text-sm">
              {ticket.arrivalLocation}
            </p>
          </div>
        </div>
      </div>
      <div className="flex sm:mt-0 mt-6 flex-col items-end">
        <div className="font-bold text-secondary-800 sm:text-2xl text-xl">
          {ticket.price}$
        </div>
        <div className="flex items-center gap-3 ms:text-sm text-xs">
          <p className="flex items-center gap-1">
            <span>{ticket.passengerCount}</span>
            <span>
              <FaUser className="fill-secondary-800" size={12} />
            </span>
          </p>
          <div className="circle rounded-full w-1 h-1 bg-black"></div>
          <p>{ticket.type}</p>
        </div>
      </div>
      <div className="flex col-start-1 row-start-3 sm:mt-5 mt-auto md:col-span-2">
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
          {params.locale === "ar"
            ? ticket.stops === 0
              ? "٠ توقف"
              : `${ticket.stops} توقف`
            : ticket.stops === 0
            ? "0 Stops"
            : `${ticket.stops} Stops`}
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
            className="col-span-2 overflow-hidden flex flex-col gap-4"
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
                    <div className="text-zinc-400 text-sm">
                      {stop.Flight.Departure.time}
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <div className="font-bold text-secondary-800">
                      {stop.Flight.Departure.location[params.locale]}
                    </div>
                    <div className="text-zinc-400 text-sm">
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
                    <div className="text-zinc-400 text-sm">
                      {stop.Flight.Arrival.time}
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <div className="font-bold text-secondary-800">
                      {stop.Flight.Arrival.location[params.locale]}
                    </div>
                    <div className="text-zinc-400 text-sm">
                      {stop.Flight.carrier[params.locale]}
                    </div>
                  </div>
                </div>
                {index < ticket.stopDetails.length - 1 && (
                  <div className="flex mt-2 gap-3 items-center text-zinc-400 text-sm">
                    <BiTransferAlt className="fill-current" size={16} />
                    {stop.connectionDuration}{" "}
                    {params.locale === "en" ? "Transfer time" : "وقت التوقف"}
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
