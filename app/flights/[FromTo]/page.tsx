import FlightTicketCard from "@components/blocks/cards/FlightTicketCard";
import React from "react";

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
      <div className="text-3xl font-bold">Select outbound</div>

      <div className="flex flex-col gap-4 pt-6 pb-10">
        {[1, 2, 3, 4, 5].map((i, index) => (
          <FlightTicketCard key={index} />
        ))}
      </div>
    </div>
  );
}
