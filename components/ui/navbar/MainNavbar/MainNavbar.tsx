"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { LocaleInterface } from "@/dictionaries/LocaleInterface";

export default function MainNavbar({
  dictionary,
}: {
  dictionary: LocaleInterface;
}) {
  const [OpenSidebar, setOpenSidebar] = useState(false);
  const pathname = usePathname();

  return (
    <nav dir="ltr" className="sticky z-40 bg-orange-700 top-0 left-0 w-full">
      <div className="md:px-5 max-w-6xl mx-auto flex items-center justify-between text-white px-5 py-3">
        <div className="text-xl font-bold">jooLand</div>

        <button
          data-active={OpenSidebar}
          onClick={(e) => setOpenSidebar(!OpenSidebar)}
          className="flex flex-col gap-1.5 group cursor-pointer py-2 sm:hidden relative z-50"
        >
          <div className="w-8 h-[.17em] bg-white rounded-full  relative top-0 left-0 opacity-1 group-data-[active=true]:!rotate-45 group-data-[active=true]:!top-2 transition-all"></div>
          <div className="w-8 h-[.17em] bg-white rounded-full relative top-0 left-0 opacity-1 group-data-[active=true]:!opacity-0 group-data-[active=true]:!-left-10 transition-all"></div>
          <div className="w-8 h-[.17em] bg-white rounded-full relative top-0 left-0 opacity-1 group-data-[active=true]:!-rotate-45 group-data-[active=true]:!-top-2 transition-all"></div>
        </button>

        <div
          data-open={OpenSidebar}
          className="flex gap-4 sm:flex-row flex-col sm:relative fixed w-full h-full bg-orange-700/60 backdrop-blur-xl top-0 -left-full sm:left-0 data-[open=true]:left-0 transition-all items-center justify-center z-40 sm:justify-end"
        >
          {[
            {
              name: dictionary.nav.home,
              link: "/",
            },
            {
              name: dictionary.nav.about,
              link: "/about",
            },
          ].map((i) => (
            <Link
              key={i.link}
              className={`py-2 px-3 ${
                pathname === i.link && "sm:bg-orange-600"
              } sm:text-base text-xl capitalize font-bold sm:font-normal rounded`}
              href={i.link}
            >
              {i.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
