export interface ValidatingCarrier {
  type: string;
  id: string;
  logo: string;
  en: string;
  ar: string;
}

export interface Price {
  type: string;
  currencyCode: string;
  Base: number;
  TotalTaxes: number;
  TotalPrice: number;
}

export interface TotalDuration {
  type: string;
  id: string;
  en: string;
  ar: string;
}

export interface Location {
  type: string;
  id: string;
  en: string;
  ar: string;
}

export interface Departure {
  type: string;
  location: Location;
  date: string;
  time: string;
}

export interface Arrival {
  type: string;
  location: Location;
  date: string;
  time: string;
}

export interface Duration {
  type: string;
  id: string;
  en: string;
  ar: string;
}

export interface Carrier {
  type: string;
  id: string;
  logo: string;
  en: string;
  ar: string;
}

export interface Flight {
  type: string;
  id: string;
  distance: number;
  duration: Duration;
  carrier: Carrier;
  number: string;
  equipment: string[];
  Departure: Departure;
  Arrival: Arrival;
}

export interface FlightSegment {
  type: string;
  sequence: number;
  connectionDuration: string;
  boundFlightsInd: boolean;
  Flight: Flight;
}

export interface FlightOffering {
  validatingCarrier: ValidatingCarrier;
  cabin: string;
  Price: Price;
  totalDuration: TotalDuration;
  totalStops: number;
  Departure: Departure;
  Arrival: Arrival;
  flightSegments: FlightSegment[];
}

export interface FlightOfferings {
  FlightOffering: FlightOffering[];
}

export interface FlightOfferingsResponse {
  FlightOfferings: FlightOfferings;
}

export default FlightOfferingsResponse;
