import React from "react";
import WhiteBoxTitle from "./whitebox/FlightDetails-WhiteBox";
import { BsArrowRight } from "react-icons/bs";
import CheckoutFormSection from "./CheckoutFormSection";
import FlightDetailsCard from "../ui/cards/flightdetails/FlightDetailsCard";

export default function MainCheckout() {
  return (
    <div className="flex gap-10 mt-5">
      <div className="flex flex-col flex-1">
        <WhiteBoxTitle className="flex-1 px-5" title="Trip Summary">
          <div className="flex items-center gap-2 mt-5">
            <div className="flex items-center gap-2 font-bold capitalize ">
              <p>London</p>
              <span>
                <BsArrowRight />
              </span>
              <p>Paris</p>
            </div>

            <div className="text-sm text-zinc-400">Duration: 15h 35m</div>
          </div>

          <div className="flex flex-col gap-4 mt-3">
            <div className="p-2 bg-white border rounded shadow-md border-zinc-300">
              <FlightDetailsCard />
            </div>
            <div className="p-2 bg-white border rounded shadow-md border-zinc-300">
              <FlightDetailsCard />
            </div>
          </div>
        </WhiteBoxTitle>

        <WhiteBoxTitle className="flex-1 px-5 mt-5" title="Passengers Details">
          <CheckoutFormSection passengers={["Adult", "Child"]} />
        </WhiteBoxTitle>
      </div>
    </div>
  );
}
