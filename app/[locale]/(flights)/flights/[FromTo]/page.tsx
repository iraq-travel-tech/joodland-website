import FlightsPage from "@components/pages/flights/FlightsPage";
import { fetchFlights } from "@lib/functions/getFlights";
import FlightOfferingsResponse from "@lib/interfaces/FlightsInterfaces";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: {
    FromTo: string;
    locale: "en" | "ar";
  };
  searchParams: {
    direction: string;
    class: string;
    adults: string;
    children: string;
    babies: string;
    departure: string;
    return: string;
  };
}) {
  const from = params.FromTo.split("-")[0];
  const to = params.FromTo.split("-")[1];

  const data: { FlightOfferingsResponse: FlightOfferingsResponse } =
    await fetchFlights(from, to);

  return (
    <div className="md:mt-4">
      {data.FlightOfferingsResponse && (
        <FlightsPage
          data={data.FlightOfferingsResponse.FlightOfferings.FlightOffering}
          searchParams={searchParams}
          locale={params.locale}
        />
      )}
    </div>
  );
}
