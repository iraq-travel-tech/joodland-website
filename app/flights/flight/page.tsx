import FlightDetailsCard from "@/components/core-ui/cards/flightdetails/FlightDetailsCard";
import MainCheckout from "@/components/flightdetails/MainCheckout";
import WhiteBoxTitle from "@/components/flightdetails/whitebox/FlightDetails-WhiteBox";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

export default function page() {
  return (
    <div className="pt-10">
      <div className="text-2xl font-bold capitalize flex gap-5 items-center">
        <p>London</p>
        <span>
          <BsArrowRight />
        </span>
        <p>Paris</p>
      </div>

      <MainCheckout />
    </div>
  );
}
