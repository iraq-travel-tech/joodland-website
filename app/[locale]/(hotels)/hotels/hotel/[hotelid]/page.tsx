"use client";

import Link from "next/link";
import { BiLink } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import HotelDetailsImages from "./_HotelDetailsImages";

export default function page() {
  return (
    <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 pb-10 py-8">
      <HotelDetailsImages />

      <div className="text-4xl mt-10 font-bold">Hotel Astoria</div>
      <div className="flex md:flex-row flex-col justify-between gap-10">
        <div className="text-zinc-500 text-2xl mt-2">
          Overlooking the old market of Dubai, Hotel Astoria is one of the
          oldest luxury hotels in the area, and sits at just two minutes away
          from Dubai Creek.
        </div>

        <div className="flex flex-col divide-y-2 min-w-max">
          <div className="py-2 flex justify-between items-center gap-10">
            <p className="text-zinc-600 flex items-center gap-2">
              <BiLink />
              Hotel Website
            </p>
            <Link
              href="www.astoriahoteldubai.com"
              className="text-blue-600 underline"
            >
              www.astoriahoteldubai.com
            </Link>
          </div>

          <div className="py-2 flex justify-between items-center gap-10">
            <p className="text-zinc-600 flex items-center gap-2">
              <GrLocation />
              city
            </p>
            <p className="text-zinc-600">Dubai</p>
          </div>

          <div className="py-2 flex justify-between items-center gap-10">
            <p className="text-zinc-600 flex items-center gap-2">
              <GrLocation />
              address
            </p>
            <p className="text-zinc-600">Al Fahidi Street</p>
          </div>
        </div>
      </div>
    </div>
  );
}
