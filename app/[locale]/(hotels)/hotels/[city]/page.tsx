import HotelsFilters from "@components/templates/hotels/HotelsFilters";
import HotelsPageList from "@components/templates/hotels/HotelsPageList";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: {
    locale: string;
    city: string;
  };
}) {
  const url = process.env.HOTELS_API_ENDPOINT as string;
  const query = `
  {
    hotels(city:"${params.city}"){
      hotel_id
      name{
        en
        ar
      }
      hotel_description{
        en
        ar
      }
      min_price
    }
  }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  return (
    <div
      dir={params.locale === "ar" ? "rtl" : "ltr"}
      className="flex gap-3 w-full"
    >
      <Suspense fallback={<p>loading...</p>}>
        <HotelsPageList data={data} />
      </Suspense>
    </div>
  );
}
