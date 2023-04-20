"use client";

import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import UiLink from "../../links/UiLink";

type UiFlightCardProps = {};

export default function UiFlightCard(props: UiFlightCardProps) {
  const [ShowDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col bg-white rounded-xl">
      <div className="relative flex flex-col p-4 transition-all md:flex-row md:items-center md:gap-7 border-zinc-300 md:p-5 ">
        <div>
          <div className="w-6 h-6 logo md:w-10 md:h-10">
            <img
              src="https://seeklogo.com/images/T/turkish-airlines-logo-25BACC2D0C-seeklogo.com.png"
              alt=""
              className="object-cover w-full h-full rounded"
            />
          </div>
        </div>

        <div className="flex justify-between flex-1 mt-2 transition-all md:items-center md:mt-0">
          <div className="flex max-w-[25em] w-full min-w-max md:flex-row flex-col md:gap-4  justify-between">
            <div className="flex flex-col min-w-max">
              <div className="font-bold sm:text-xl text-md">
                12:40 PM - 3:50 PM
              </div>
              <div className="hidden capitalize text-zinc-400 md:text-sm md:flex">
                norse atlantic UK
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-col min-w-max">
              <div className="mt-2 font-semibold md:text-xl text-md md:font-bold md:mt-0">
                8 hr 10 min
              </div>
              <div className="text-xs text-zinc-400 sm:text-sm">LGW - JFK</div>
            </div>
          </div>

          <div className="md:text-lg md:static absolute top-2 right-3.5 md:text-black text-orange-600 font-semibold md:font-normal">
            1 stop
          </div>

          <div className="flex max-w-[10em] md:w-full md:items-center md:flex-row flex-col md:justify-between">
            <div className="flex flex-row flex-1 md:flex-none">
              <div className="ml-auto text-2xl font-bold md:text-lg sm:text-3xl md:font-normal md:ml-0">
                200$
              </div>
            </div>

            <button
              onClick={() => setShowDetails(!ShowDetails)}
              className="flex items-center justify-center gap-2 px-2 py-1 text-xs transition-all bg-white border rounded md:w-10 md:h-10 min-w-max md:border-none border-zinc-300 justify-self-end md:rounded-full hover:bg-zinc-200 active:scale-90 active:bg-zinc-300"
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
            <div className="p-4 md:p-5">
              <div className="divider h-[.1em] bg-zinc-300 rounded-full" />

              <StopFlightBox />
              <StopFlightBox />

              <UiLink className="mt-3 w-max" href="/" variant="filled">
                checkout
              </UiLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const StopFlightBox = () => {
  return (
    <div className="flex flex-col p-2 pt-3 md:p-3">
      <div className="flex gap-4">
        <div className="w-8 h-8 rounded-full icon bg-zinc-200">
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

      <div className="flex gap-3 pt-4 pl-2">
        <div className="grid grid-rows-[max-content_1fr_max-content]">
          <div className="z-10 w-4 h-4 -mb-1 bg-white border-2 border-blue-600 rounded-full" />
          <div className="w-1 h-full mx-auto bg-blue-600" />
          <div className="z-10 w-4 h-4 -mt-1 bg-white border-2 border-blue-600 rounded-full" />
        </div>

        <div className="flex flex-col gap-4 text-sm md:text-md">
          <div className="font-bold">
            {/* {flight.Departure.time} */}
            12:40 PM
          </div>
          <div className="text-sm text-zinc-600">
            {/* ${flight.duration.en} */}8 hr 10 min
          </div>
          <div className="font-bold">
            {/* ${flight.Arrival.time} */}
            3:50 PM
          </div>
        </div>
        <div className="flex flex-col gap-4 text-sm md:text-md">
          <div className="font-bold">
            {/* {flight.Departure.location.en} */}
            LGW
          </div>
          <div className="text-sm text-zinc-600">.</div>
          <div className="font-bold">
            {/* {flight.Arrival.location.en} */}
            JFK
          </div>
        </div>
      </div>
    </div>
  );
};
