"use client";
import { useTranslations } from "next-intl";

import DatesList from "@components/blocks/dateslist/DatesList";
import Button from "@components/elements/button/Button";
import TopFiltersNav from "@components/templates/flights/TopFiltersNav";
import FlightsNav from "@components/templates/nav/FlightsNav";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { GoChevronLeft } from "react-icons/go";

export default function layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const t = useTranslations("common");
  const params = useParams() as {
    locale: "en" | "ar";
  };
  const departure = searchParams?.get("departure");

  return (
    <div className="bg-gray-100">
      <FlightsNav />

      <div className="flex flex-col max-w-6xl gap-3 px-4 pt-6 mx-auto sm:px-6 lg:px-8 md:flex-row md:gap-7">
        <TopFiltersNav />
        <div
          dir={params.locale === "ar" ? "rtl" : "ltr"}
          className="w-full pt-14"
        >
          <Link className="hidden md:flex w-max" href="/">
            <Button bg={"ghost"} startIcon={<GoChevronLeft />}>
              {t("btns.goBack")}
            </Button>
          </Link>
          {children}

          <div className="fixed bottom-0 left-0 right-0">
            <DatesList initialDate={departure || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
