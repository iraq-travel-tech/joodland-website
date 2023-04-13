"use client";

import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import OrangeButtonLink from "../../links/buttonlink/OrangeButtonLink";

type FlightCardProps = {};

export default function FlightCard(props: FlightCardProps) {
  const [ShowDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col rounded-xl bg-white">
      <div className="flex md:flex-row flex-col md:items-center relative md:gap-7 transition-all border-zinc-300 md:p-5 p-4  ">
        <div>
          <div className="logo md:w-10 md:h-10 w-6 h-6">
            <img
              src="https://seeklogo.com/images/T/turkish-airlines-logo-25BACC2D0C-seeklogo.com.png"
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>

        <div className="flex justify-between flex-1 md:items-center md:mt-0 mt-2 transition-all">
          <div className="flex max-w-[25em] w-full min-w-max md:flex-row flex-col md:gap-4  justify-between">
            <div className="flex flex-col min-w-max">
              <div className="sm:text-xl text-md font-bold">
                12:40 PM - 3:50 PM
              </div>
              <div className="text-zinc-400 capitalize md:text-sm md:flex hidden">
                norse atlantic UK
              </div>
            </div>
            <div className="flex md:flex-col flex-col-reverse min-w-max">
              <div className="md:text-xl text-md md:font-bold font-semibold md:mt-0 mt-2">
                8 hr 10 min
              </div>
              <div className="text-zinc-400 sm:text-sm text-xs">LGW - JFK</div>
            </div>
          </div>

          <div className="md:text-lg md:static absolute top-2 right-3.5 md:text-black text-orange-600 font-semibold md:font-normal">
            1 stop
          </div>

          <div className="flex max-w-[10em] md:w-full md:items-center md:flex-row flex-col md:justify-between">
            <div className="flex md:flex-none flex-1 flex-row">
              <div className="md:text-lg sm:text-3xl text-2xl md:font-normal font-bold md:ml-0 ml-auto">
                200$
              </div>
            </div>

            <button
              onClick={() => setShowDetails(!ShowDetails)}
              className="md:w-10 md:h-10 min-w-max text-xs py-1 px-2 rounded  gap-2 border md:border-none border-zinc-300 flex items-center justify-self-end justify-center md:rounded-full hover:bg-zinc-200 active:scale-90 active:bg-zinc-300 bg-white transition-all"
            >
              <span className="md:hidden">
                {ShowDetails ? "Hide" : "Show"} details
              </span>
              <BsChevronDown
                className="md:text-xl data-[open=true]:rotate-180 rotate-0 transition-all"
                data-open={ShowDetails}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {ShowDetails && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: "max-content",
            }}
            exit={{
              height: 0,
            }}
            data-open={ShowDetails}
            className="flex flex-col overflow-hidden"
          >
            <div className="md:p-5 p-4">
              <div className="divider h-[.1em] bg-zinc-300 rounded-full" />

              <StopFlightBox />
              <StopFlightBox />

              <OrangeButtonLink className="mt-3 w-max">
                checkout
              </OrangeButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StopFlightBox = () => {
  return (
    <div className="flex flex-col md:p-3 p-2 pt-3">
      <div className="flex gap-4">
        <div className="icon w-8 h-8 bg-zinc-200 rounded-full">
          <img
            src="https://seeklogo.com/images/T/turkish-airlines-logo-25BACC2D0C-seeklogo.com.png"
            alt=""
          />
        </div>
        <div className="font-bold">
          {/* {flight.carrier.en} */}
          Turkish Airlines
        </div>
      </div>

      <div className="flex gap-3 pl-2 pt-4">
        <div className="grid grid-rows-[max-content_1fr_max-content]">
          <div className="border-2 -mb-1 border-blue-600 bg-white z-10 w-4 h-4 rounded-full" />
          <div className="w-1 h-full bg-blue-600 mx-auto" />
          <div className="border-2 -mt-1 border-blue-600 bg-white z-10 w-4 h-4 rounded-full" />
        </div>

        <div className="flex md:text-md text-sm flex-col gap-4">
          <div className="font-bold">
            {/* {flight.Departure.time} */}
            12:40 PM
          </div>
          <div className="text-zinc-600 text-sm">
            {/* ${flight.duration.en} */}8 hr 10 min
          </div>
          <div className="font-bold">
            {/* ${flight.Arrival.time} */}
            3:50 PM
          </div>
        </div>
        <div className="flex md:text-md text-sm flex-col gap-4">
          <div className="font-bold">
            {/* {flight.Departure.location.en} */}
            LGW
          </div>
          <div className="text-zinc-600 text-sm">.</div>
          <div className="font-bold">
            {/* {flight.Arrival.location.en} */}
            JFK
          </div>
        </div>
      </div>
    </div>
  );
};
