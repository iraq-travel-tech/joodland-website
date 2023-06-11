"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/elements/button/Button";
import HomeSearchInput from "../home/HomeSearchInput";
import { motion } from "framer-motion";
import { FaHotel } from "react-icons/fa";
import { HomeAllTextsProps } from "../home/HomeSearchContainer";
import useFlashMessages from "@lib/hooks/useFlashMessages";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function HotelsSearchContainer({
  allTexts,
}: {
  allTexts: HomeAllTextsProps;
}) {
  const router = useRouter();
  const [City, setCity] = useState("");
  const [Loading, setLoading] = useState(false);
  const { addFlash } = useFlashMessages();

  const SearchFunction = async (text: string) => {
    try {
      const response = await fetch(
        "https://us-central1-vtravel-388521.cloudfunctions.net/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
                    query ($city: String) {
                        hotels(city: $city) {
                            name {
                                en
                            }
                            hotel_id
                            hotel_image_url
                            city {
                                en
                            }
                        }
                    }
                `,
            variables: {
              city: text,
            },
          }),
        }
      );

      const { data } = await response.json();

      if (data) {
        // Transform the data into the desired format
        return data.hotels.map((hotel: any) => ({
          id: hotel.hotel_id,
          destination_images: { image_jpeg: hotel.hotel_image_url },
          name: hotel.name.en,
          cityname: hotel.city.en,
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch hotels", error);
      return [];
    }
  };

  return (
    <motion.div
      initial={{
        x: 10,
        opacity: 0,
      }}
      exit={{
        x: -2,
        opacity: 0,
        transition: {
          type: "just",
        },
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          type: "just",
        },
      }}
      className="min-w-full"
    >
      <div className="flex md:flex-row flex-col mt-3 gap-2">
        <div className="flex flex-1 sm:flex-row flex-col gap-2">
          <HomeSearchInput
            placeHolder={allTexts.city}
            State={City}
            setState={setCity}
            SearchFunction={SearchFunction}
            startIcon={<FaHotel className="fill-gray-400" />}
          />
        </div>

        <div className="h-full min-w-[10em]">
          <Button
            onClick={() => {
              if (City === "") {
                addFlash(`Please set the 'City' field.`);
              } else {
                setLoading(true);
                // Navigate to hotels search results page
                router.push(`/hotels/${City}`);
              }
            }}
            className="h-full py-3 w-full rounded-lg"
          >
            {!Loading && allTexts.btns.search}
            {Loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
