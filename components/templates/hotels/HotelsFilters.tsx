"use client";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { isFilterVisibleAtom } from "./HotelsPageList";

export default function HotelsFilters() {
  const [isFilterVisible, setIsFilterVisible] = useAtom(isFilterVisibleAtom);
  const t = useTranslations("hotels");

  return (
    <>
      <div
        className={`bg-black fixed inset-0 z-40 transition-all
        ${isFilterVisible ? "opacity-50" : "opacity-0 pointer-events-none"}

      `}
        onClick={() => setIsFilterVisible(false)}
      />
      <div
        className={`lg:w-3/12 sm:w-5/12 w-7/12 lg:p-0 px-6 lg:pt-0 pt-20 lg:sticky lg:top-24 lg:block lg:right-0 transition-all lg:bg-transparent bg-white lg:h-max h-full z-50 top-0 border-r ${
          isFilterVisible ? "fixed right-0" : "fixed -right-full"
        }`}
      >
        <div className="text-2xl font-bold ">{t("filters")}</div>
        <hr className="my-2" />

        {/* Maximum Price Filter */}
        <div className="flex flex-col mt-4">
          <div className="font-semibold">{t("maximumPricePerNight")}</div>
          {[
            { label: "50 USD", checked: false },
            { label: "100 USD", checked: false },
            { label: "150 USD", checked: false },
          ].map((i) => (
            <div key={i.label} className="flex items-center mt-2">
              <input
                type="radio"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                defaultChecked={i.checked}
                name="maximumPrice" // <-- this is the corrected line
              />
              <label
                htmlFor={i.label}
                className="ms-3 min-w-0 flex-1 text-gray-500"
              >
                {i.label}
              </label>
            </div>
          ))}
        </div>

        {/* Stars and Ratings Filter */}
        <div className="flex flex-col mt-4">
          <div className="font-semibold">{t("stars")}</div>
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="flex items-center mt-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                name={`star-${star}`}
              />
              <label
                htmlFor={`star-${star}`}
                className="ms-3 min-w-0 flex-1 text-gray-500"
              >
                {"★".repeat(star)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
