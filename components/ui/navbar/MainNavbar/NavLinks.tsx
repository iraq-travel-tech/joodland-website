"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import LocaleSwitcher from "@/components/home/locale-switcher";

export default function NavLinks({
  dictionary,
  OpenSidebar,
  setOpenSidebar,
}: any) {
  const pathname = usePathname();
  const [Hovering, setHovering] = useState("");

  return (
    <>
      <motion.div
        className={`md:flex-row flex flex-col md:relative bg-orange-700 md:bg-transparent shadow-lg md:p-0 p-4 bottom-0 fixed top-0 md:!left-0  z-40 w-full md:w-max md:shadow-none
          ${
            OpenSidebar ? "left-0" : "-left-full"
          } md:pt-0 pt-20 md:text-sm text-xl divide-y-2 md:divide-none divide-orange-600 transition-all duration-300`}
      >
        <LocaleSwitcher />
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
            href={i.link}
            key={i.link}
            className={`px-5 ${
              i.link === pathname?.split("/")[1] && "font-bold"
            } relative capitalize py-2 font-bold sm:font-normal md:rounded`}
            onMouseEnter={() => setHovering(i.link)}
            onMouseLeave={() => setHovering("")}
            onClick={() => setOpenSidebar(!OpenSidebar)}
          >
            <div className="relative z-10">{i.name}</div>
            {Hovering === i.link && (
              <motion.div
                layoutId="iorouruo2pour3i"
                className="absolute inset-0 rounded bg-orange-500"
              />
            )}
          </Link>
        ))}
      </motion.div>
      <button
        data-active={OpenSidebar}
        onClick={() => setOpenSidebar(!OpenSidebar)}
        className="flex flex-col gap-1.5 group cursor-pointer py-2 md:hidden relative z-50"
      >
        <div className="w-8 h-[.17em] bg-white rounded-full  relative top-0 left-0 opacity-1 group-data-[active=true]:!rotate-45 group-data-[active=true]:!top-2 transition-all"></div>
        <div className="w-8 h-[.17em] bg-white rounded-full relative top-0 left-0 opacity-1 group-data-[active=true]:!opacity-0 group-data-[active=true]:!-left-10 transition-all"></div>
        <div className="w-8 h-[.17em] bg-white rounded-full relative top-0 left-0 opacity-1 group-data-[active=true]:!-rotate-45 group-data-[active=true]:!-top-[.6em] transition-all"></div>
      </button>
    </>
  );
}
