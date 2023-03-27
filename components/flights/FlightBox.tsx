"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { Flight, FlightOfferingEntity } from "@/interfces/ResponseTypes";

export default function FlightBox({ data }: { data: FlightOfferingEntity }) {
  const [ShowDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col p-3 bg-zinc-200 rounded-xl gap-4">
      <div>
        <div className="grid md:grid-cols-[max-content_1fr_1fr_1fr_1fr_max-content] grid-cols-[max-content_1fr_max-content] items-center gap-5">
          {" "}
          <div className="icon w-10 h-10 bg-zinc-200 p-2 rounded-full">
            <img
              src={`https://storage.googleapis.com/uapi-search-microservice-f2/static/${data.validatingCarrier.logo}`}
              alt=""
            />
          </div>
          <div className="flex flex-col min-w-max">
            <div className="text-xl font-bold">
              {data.Departure.time} - {data.Arrival.time}
            </div>
            <div className="text-zinc-500 capitalize text-sm">
              {data.validatingCarrier.en}
            </div>
          </div>
          <div className="flex-col md:flex hidden">
            <div className="font-bold text-xl">{data.totalDuration.en}</div>
            <div className="text-zinc-600 text-xs">
              {data.Departure.location.id} - {data.Arrival.location.id}
            </div>
          </div>
          <div className="font-bold text-xl md:flex hidden">
            {data.totalStops >= 1
              ? `${data.totalStops} Stops`
              : "Direct flight"}
          </div>
          <div className="font-bold text-xl md:flex hidden">
            {data.Price.TotalPrice}$
          </div>
          <button
            onClick={() => setShowDetails(!ShowDetails)}
            className="h-10 active:scale-90 transition-all w-10 bg-zinc-300 flex items-center justify-center rounded-full"
          >
            <IoIosArrowDown
              className={`${
                ShowDetails && "rotate-180"
              } rotate-0 transition-all`}
              size={25}
            />
          </button>
        </div>
        <div className="flex items-baseline gap-4 px-3 md:hidden">
          <div className="text-xl font-bold">{data.Price.TotalPrice}$</div>

          <div className="text-md"></div>
        </div>
      </div>

      <FlightDetails data={data} ShowDetails={ShowDetails} />
    </div>
  );
}

const StopFlightBox = ({ flight }: { flight: Flight }) => {
  return (
    <div className="flex flex-col md:p-3 p-2 pt-3">
      <div className="flex gap-4">
        <div className="icon w-8 h-8 bg-zinc-200 rounded-full">
          <img
            src={`https://storage.googleapis.com/uapi-search-microservice-f2/static/${flight.carrier.logo}`}
            alt=""
          />
        </div>
        <div className="font-bold">{flight.carrier.en}</div>
      </div>

      <div className="flex gap-3 pl-2 pt-4">
        <div className="grid grid-rows-[max-content_1fr_max-content]">
          <div className="border-2 -mb-1 border-blue-600 bg-white z-10 w-4 h-4 rounded-full" />
          <div className="w-1 h-full bg-blue-600 mx-auto" />
          <div className="border-2 -mt-1 border-blue-600 bg-white z-10 w-4 h-4 rounded-full" />
        </div>

        <div className="flex md:text-md text-sm flex-col gap-4">
          <div className="font-bold">{flight.Departure.time}</div>
          <div className="text-zinc-600 text-sm">${flight.duration.en}</div>
          <div className="font-bold">${flight.Arrival.time}</div>
        </div>
        <div className="flex md:text-md text-sm flex-col gap-4">
          <div className="font-bold">{flight.Departure.location.en}</div>
          <div className="text-zinc-600 text-sm">.</div>
          <div className="font-bold">{flight.Arrival.location.en}</div>
        </div>
      </div>
    </div>
  );
};

const FlightDetails = ({
  data,
  ShowDetails,
}: {
  data: FlightOfferingEntity;
  ShowDetails: boolean;
}) => {
  return (
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
          className="overflow-hidden"
        >
          <div className="divider h-[.1em] bg-zinc-300 rounded-full" />

          {data.totalStops >= 1 &&
            data.flightSegments?.map((i) => (
              <StopFlightBox key={i.Flight.id} flight={i.Flight} />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
