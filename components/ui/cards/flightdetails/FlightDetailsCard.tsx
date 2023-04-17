import React from "react";

type FlightDetailsCardProps = {};

export default function FlightDetailsCard(props: FlightDetailsCardProps) {
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
}
