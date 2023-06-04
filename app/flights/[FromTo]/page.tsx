import FlightTicketCard from "@components/blocks/cards/FlightTicketCard";
import Button from "@components/elements/button/Button";
import React from "react";
import { MdFilterListAlt } from "react-icons/md";

export default function page({
  params,
}: {
  params: {
    FromTo: string;
  };
}) {
  const from = params.FromTo.split("-")[0];
  const to = params.FromTo.split("-")[1];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-secondary-900">
          Select outbound
        </div>
        <Button startIcon={<MdFilterListAlt />} roundedFull bg={"ghost"}>
          sort filters
        </Button>
      </div>

      <div className="flex flex-col gap-4 pt-6 pb-10">
        {[1, 2, 3, 4, 5].map((i, index) => (
          <FlightTicketCard key={index} />
        ))}
      </div>
    </div>
  );
}
