import FlightsPage from "@components/pages/flights/FlightsPage";
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
    <div className="md:mt-4">
      <FlightsPage />
    </div>
  );
}
