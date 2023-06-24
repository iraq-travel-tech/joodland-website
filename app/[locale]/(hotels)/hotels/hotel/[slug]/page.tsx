import { fetchHotelData } from "@lib/functions/hotelData";
import HotelDetailsPage from "./HotelDetailsPage";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
    locale: "en" | "ar";
  };
}) {
  const data = await fetchHotelData(params.slug);
  return {
    title: data.data.hotels[0].name[params.locale],
    description: data.data.hotels[0].general_description[params.locale],
  };
}

export default async function page({
  params,
}: {
  params: {
    slug: string;
    locale: "en" | "ar";
  };
}) {
  const data = await fetchHotelData(params.slug);

  return (
    <>
      <HotelDetailsPage data={data} locale={params.locale} />
    </>
  );
}
