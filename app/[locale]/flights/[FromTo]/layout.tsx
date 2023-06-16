"use client";
import { useTranslations } from "next-intl";

import DatesList from "@components/blocks/dateslist/DatesList";
import Button from "@components/elements/button/Button";
import TopFiltersNav from "@components/templates/flights/TopFiltersNav";
import FlightsNav from "@components/templates/nav/FlightsNav";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { GoChevronLeft } from "react-icons/go";
import { useState } from "react";
import { MdFilterListAlt } from "react-icons/md";
import ScrollToTopButton from "@components/elements/floatingButton/ScrollToTopButton";

export default function layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const t = useTranslations("common");
  const params = useParams() as {
    locale: "en" | "ar";
  };
  const departure = searchParams?.get("departure");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return (
    <div className="bg-gray-100">
      <FlightsNav />

      <div className="flex flex-col max-w-6xl gap-3 px-4 pt-6 mx-auto sm:px-6 lg:px-8 md:flex-row md:gap-7">
        <div dir={params.locale === "ar" ? "rtl" : "ltr"} className="w-full pb-12">
          <Link className="hidden md:flex w-max" href="/">
            <Button bg={"ghost"} startIcon={<GoChevronLeft />}>
              {t("btns.goBack")}
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-secondary-900">
              {t("texts.selectOutbound")}
            </div>

            <TopFiltersNav
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />

            <Button
              onClick={() => setIsDialogOpen(true)}
              startIcon={<MdFilterListAlt />}
              roundedFull
              bg={"ghost"}
            >
              {t("btns.filters")}
            </Button>
          </div>
          {children}

          <div className="fixed bottom-0 left-0 right-0">
            <DatesList initialDate={departure || ""} />
          </div>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
