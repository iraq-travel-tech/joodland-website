import { FlightsResponse } from "@/interfces/ResponseTypes";
import { SearchParamsProps } from "@/interfces/SearchParamsProps";
import { GET_flights } from "../api/apiFunctions/GetFlights";
import UiFlightCard from "@/components/ui/cards/flightcard/UiFlightCard";
import { getDictionary } from "@/get-dictionary";

type PageProps = {
  searchParams: SearchParamsProps;
  params: { lang: "en" | "ar" };
};

export default async function page(props: PageProps) {
  // const res = await GET_flights({
  //   from: searchParams.from,
  //   to: searchParams.to,
  //   adults: searchParams.adults,
  //   children: searchParams.children,
  //   babies: searchParams.babies,
  //   departure: searchParams.departure,
  //   tripclass: searchParams.tripclass,
  // });

  // const data: FlightsResponse = await res.json();
  // console.log(data);
  const dictionary: any = await getDictionary(props.params.lang);

  return (
    <div>
      <div className="flex flex-col pt-10">
        <div className="text-2xl font-bold">{dictionary.flights.title}</div>
        <div className="text-zinc-600">{dictionary.flights.subtitle}</div>
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
