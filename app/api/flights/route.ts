import { FlightsResponse } from "@/interfces/ResponseTypes";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const adults = searchParams.get("adults") || "0";
  const babies = searchParams.get("babies") || "0";
  const children = searchParams.get("children") || "0";
  const tripclass = searchParams.get("tripclass") || "economy";
  const departure = searchParams.get("departure");
  const currencyCode = searchParams.get("currencyCode");

  const GetFlights = await fetch(
    "https://joodland-iraqtraveltech.ey.r.appspot.com/flightofferings",
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        CatalogOfferingsRequestAir: {
          offersPerPage: 5,
          PassengerCriteria: [
            {
              value: "ADT",
              number: adults,
            },
          ],
          PricingModifiersAir: {
            currencyCode: currencyCode || "USD",
          },
          SearchCriteriaFlight: [
            {
              "@type": "SearchCriteriaFlight",
              departureDate: departure,
              From: {
                value: from?.toLowerCase(),
              },
              To: {
                value: to?.toUpperCase(),
              },
            },
          ],
          SearchModifiersAir: {
            "@type": "SearchModifiersAir",
            CarrierPreference: {
              "@type": "CarrierPreference",
              type: "Prohibited",
              carriers: ["WN"],
            },
          },
          PseudoCityInfo: {
            value: "PCC",
          },
        },
      }),
    }
  );
  const data: FlightsResponse = await GetFlights.json();

  return NextResponse.json(
    data.FlightOfferingsResponse.FlightOfferings.FlightOffering
  );
}
