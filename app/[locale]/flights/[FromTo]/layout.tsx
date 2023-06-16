"use client";
import DatesList from "@components/blocks/dateslist/DatesList";
import Button from "@components/elements/button/Button";
import TopFiltersNav from "@components/templates/flights/TopFiltersNav";
import FlightsNav from "@components/templates/nav/FlightsNav";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { GoChevronLeft } from "react-icons/go";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const params = useParams() as {
    locale: "en" | "ar";
  };
  const departure = searchParams?.get("departure");

  return (
    <div className="bg-gray-100">
      <FlightsNav />

      <div className="max-w-6xl pt-6 mx-auto px-4 sm:px-6 lg:px-8 flex md:flex-row flex-col md:gap-7 gap-3">
        <TopFiltersNav />
        <div dir={params.locale === "ar" ? "rtl" : "ltr"} className="w-full">
          <Link className="md:flex hidden w-max" href="/">
            <Button bg={"ghost"} startIcon={<GoChevronLeft />}>
              {params.locale === "ar" ? "الرجوع" : "Go Back "}
            </Button>
          </Link>
          {children}

          <div className="fixed left-0 bottom-0 right-0">
            <DatesList initialDate={departure || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
