export async function fetchHotelData(name: string) {
  const response = await fetch(process.env.HOTELS_API_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query ($name: String) {
            hotels(name: $name) {
              address { en,ar }
              city { en,ar }
              eating_description { en,ar }
              general_description { en,ar }
              hotel_description { en,ar }
              hotel_id
              hotel_image_url
              hotel_web
              latitude
              longitude
              min_price
              zip
              room_description { en,ar }
              poi_description { en,ar }
              name { en,ar }
            }
          }
        `,
      variables: {
        name: name.replaceAll("-", " "),
      },
    }),
  });

  const data = await response.json();
  return data;
}
