"use client";
import HotelCard from "@components/blocks/cards/HotelCard";
import Button from "@components/elements/button/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { GoChevronLeft } from "react-icons/go";

import { atom, useAtom } from "jotai";

export const isFilterVisibleAtom = atom(false);

interface Hotel {
  name: {
    en: string;
    ar: string;
  };
  hotel_description: {
    en: string;
    ar: string;
  };
  min_price: string;
  hotel_id: string;
}

interface HotelsData {
  data: {
    hotels: Hotel[];
  };
}

export default function HotelsPageList({ data }: { data: HotelsData }) {
  const t = useTranslations("hotels");
  const [isFilterVisible, setIsFilterVisible] = useAtom(isFilterVisibleAtom);

  const params = useParams() as {
    locale: "en" | "ar";
  };

  // this has to be removed in futrue
  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  // FUNCTION_END

  const images = [
    "https://storage.googleapis.com/v-travel-hotels-images/55355/50113833.jpg",
    "https://storage.googleapis.com/v-travel-hotels-images/55355/7728e4f1.jpg",
    "https://storage.googleapis.com/v-travel-hotels-images/55355/cb0f5b3d.jpg",
    "https://storage.googleapis.com/v-travel-hotels-images/55355/e3cb4f1e.jpg",
    "https://storage.googleapis.com/v-travel-hotels-images/55355/c03952cf.jpg",
  ];
  const randomizedImages = shuffleArray(images);

  return (
    <div>
      <div className="flex-1">
        <div className="w-max">
          <Link href="/">
            <Button dir="ltr" bg={"ghost"} startIcon={<GoChevronLeft />}>
              {t("goBack")}
            </Button>
          </Link>
        </div>
        <div className="flex mt-2 justify-between items-center">
          <div className="sm:text-2xl text-lg capitalize font-bold">
            20 {t("staysIn")} Istanbul
          </div>
          <button
            className="lg:hidden text-blue-600 underline"
            onClick={() => setIsFilterVisible(true)}
          >
            {t("filters")}
          </button>
        </div>
        <hr className="mt-2" />
        <div className="grid gap-3 mt-2 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
          {data.data.hotels.map((hotel) => (
            <HotelCard
              images={shuffleArray(images)}
              key={hotel.name.en}
              hotelName={hotel.name[params.locale]}
              hotelDescription={hotel.hotel_description[params.locale]}
              pricePerNight={hotel.min_price}
              hotelId={hotel.hotel_id}
              slug={hotel.name.en.replaceAll(" ", "-")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
