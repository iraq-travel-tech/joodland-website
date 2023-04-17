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
          <div className="flex mt-5 items-center gap-2">
            <div className="font-bold capitalize flex gap-2 items-center ">
              <p>London</p>
              <span>
                <BsArrowRight />
              </span>
              <p>Paris</p>
            </div>

            <div className="text-zinc-400 text-sm">Duration: 15h 35m</div>
          </div>

          <div className="mt-3 flex flex-col gap-4">
            <div className="bg-white shadow-md p-2 border border-zinc-300 rounded">
              <FlightDetailsCard />
            </div>
            <div className="bg-white shadow-md p-2 border border-zinc-300 rounded">
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
