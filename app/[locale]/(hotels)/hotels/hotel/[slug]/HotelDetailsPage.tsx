import React from "react";
import HotelDetailsImages from "./_HotelDetailsImages";
import { BiLink } from "react-icons/bi";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { useTranslations } from "next-intl";
import GoBackBtn from "@components/elements/button/GoBackBtn";
import AccordionDemo from "@components/elements/accordion/Accordion";

export default function HotelDetailsPage({
  data,
  locale,
}: {
  data: HotelResponse;
  locale: "en" | "ar";
}) {
  const t = useTranslations("HotelDetails");

  const questions = [
    {
      question: t("questions.aboutHotel"),
      answer: data.data.hotels[0].hotel_description[locale],
    },
    {
      question: t("questions.roomExpectation"),
      answer: data.data.hotels[0].room_description[locale],
    },
    {
      question: t("questions.diningOptions"),
      answer: data.data.hotels[0].eating_description[locale],
    },
    {
      question: t("questions.popularAttractions"),
      answer: data.data.hotels[0].poi_description[locale],
    },
  ];

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 pb-10 py-8"
    >
      <HotelDetailsImages />

      <div className="mt-10">
        <GoBackBtn>{t("goback")}</GoBackBtn>
      </div>
      <h1 className="lg:text-4xl md:text-3xl text-2xl mt-2 font-bold">
        {data.data.hotels[0].name[locale]}
      </h1>
      <section className="flex md:flex-row flex-col justify-between gap-10">
        <article className="flex flex-col ">
          <p className="text-zinc-500 lg:text-2xl md:text-xl mt-2">
            {data.data.hotels[0].general_description[locale]}
          </p>

          <div className="md:max-w-lg sm:text-base text-sm mt-6">
            <AccordionDemo questions={questions} />
          </div>
        </article>

        <aside className="flex md:w-[25em] flex-col">
          <div className="flex flex-col divide-y-2 w-full min-w-max">
            <div className="py-2 flex justify-between items-center gap-10 w-full">
              <p className="text-zinc-600 flex items-center gap-2">
                <BiLink aria-label="Link icon" />
                {t("hotelWebsite")}
              </p>
              <Link
                className="text-blue-600 underline truncate max-w-[10em]"
                href={data.data.hotels[0].hotel_web}
              >
                {data.data.hotels[0].hotel_web}
              </Link>
            </div>

            <div className="py-2 flex justify-between items-center gap-10">
              <p className="text-zinc-600 flex items-center  gap-2">
                <GrLocation aria-label="Location icon" />
                {t("city")}
              </p>
              <p className="text-zinc-600 max-w-[8em] truncate">
                {data.data.hotels[0].city[locale]}
              </p>
            </div>

            <div className="py-2 flex justify-between items-center gap-10">
              <p className="text-zinc-600 flex items-center gap-2">
                <GrLocation aria-label="Location icon" />
                {t("address")}
              </p>
              <p className="text-zinc-600 max-w-[9em] truncate">
                {data.data.hotels[0].address[locale]}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

interface HotelResponse {
  data: {
    hotels: Hotel[];
  };
}

interface Hotel {
  address: LocalizedString;
  city: LocalizedString;
  eating_description: LocalizedString;
  general_description: LocalizedString;
  hotel_description: LocalizedString;
  hotel_id: string;
  hotel_image_url: string;
  hotel_web: string;
  latitude: string;
  longitude: string;
  min_price: string;
  zip: string;
  room_description: LocalizedString;
  poi_description: LocalizedString;
  name: LocalizedString;
}

interface LocalizedString {
  en: string;
  ar: string;
}
