export interface SearchParamsProps {
  from: string;
  to: string;
  adults: string;
  children: string;
  babies: string;
  tripclass: string;
  departure: string;
  currencyCode?: string | "USD";
}
