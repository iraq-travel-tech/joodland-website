import FlightBox from "@/components/flights/FlightBox";
import SearchBox from "@/components/home/core/SearchBox";
import { FlightsResponse } from "@/interfces/ResponseTypes";
import { SearchParamsProps } from "@/interfces/SearchParamsProps";
import { GET_flights } from "../api/apiFunctions/GetFlights";
import UiFlightCard from "@/components/ui/cards/flightcard/UiFlightCard";

type PageProps = {
  searchParams: SearchParamsProps;
};

export default async function page({ searchParams }: PageProps) {
  const res = await GET_flights({
    from: searchParams.from,
    to: searchParams.to,
    adults: searchParams.adults,
    children: searchParams.children,
    babies: searchParams.babies,
    departure: searchParams.departure,
    tripclass: searchParams.tripclass,
  });

  const data: FlightsResponse = await res.json();
  console.log(data);

  return (
    <div>
      {/* <SearchBox /> */}

      <div className="flex flex-col pt-10">
        <div className="text-2xl font-bold">Best departing flights</div>
        <div className="text-zinc-600">
          Ranked based on price and convenience
        </div>
      </div>
      <div className="flex py-4 flex-col gap-4">
        {/* {data.FlightOfferingsResponse.FlightOfferings.FlightOffering?.map(
          (data, index) => (
            <FlightBox key={data.Departure.location.id + index} data={data} />
          )
        )} */}

        <UiFlightCard />
        <UiFlightCard />
        <UiFlightCard />
      </div>
    </div>
  );
}
