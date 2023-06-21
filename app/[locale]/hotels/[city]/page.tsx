import HotelsFilters from "@components/templates/hotels/HotelsFilters";
import HotelsPageList from "@components/templates/hotels/HotelsPageList";

export default async function page({
  params,
}: {
  params: {
    locale: string;
    city: string;
  };
}) {
  const url =
    "https://us-central1-vtravel-388521.cloudfunctions.net/hotelsgraphql";
  const query = `
  {
    hotels(city:"${params.city}"){
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

      <HotelsPageList data={data} />
    </div>
  );
}
