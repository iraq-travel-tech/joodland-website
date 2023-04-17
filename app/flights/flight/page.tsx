import MainCheckout from "@/components/flightdetails/MainCheckout";
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
