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
              key={hotel.name.en}
              hotelName={hotel.name[params.locale]}
              hotelDescription={hotel.hotel_description[params.locale]}
              pricePerNight={hotel.min_price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
