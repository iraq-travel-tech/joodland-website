import { FlightsResponse } from "@/interfces/ResponseTypes";
import { NextResponse } from "next/server";
import { GET_flights } from "../apiFunctions/GetFlights";

export async function GET(request: Request, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const adults = searchParams.get("adults") || "0";
  const babies = searchParams.get("babies") || "0";
  const children = searchParams.get("children") || "0";
  const tripclass = searchParams.get("tripclass") || "economy";
  const departure = searchParams.get("departure") ?? "";
  const currencyCode = searchParams.get("currencyCode");
  console.log(departure);

  const Resi = await GET_flights({
    from: from,
    to: to,
    adults: adults,
    children: children,
    babies: babies,
    departure: departure,
    tripclass: tripclass,
  });
  const data: FlightsResponse = await Resi.json();

  return NextResponse.json(
    data
  );
}
