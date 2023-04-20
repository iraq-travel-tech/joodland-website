import React from "react";

type FlightDetailsCardProps = {};

export default function FlightDetailsCard(props: FlightDetailsCardProps) {
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
}
