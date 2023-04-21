"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { LocaleInterface } from "@/dictionaries/LocaleInterface";
import NavLinks from "./NavLinks";

export default function MainNavbar({
  dictionary,
}: {
  dictionary: LocaleInterface;
}) {
  const [OpenSidebar, setOpenSidebar] = useState(false);

  return (
    <nav dir="ltr" className="sticky top-0 left-0 z-40 w-full bg-orange-700">
      <div className="flex items-center justify-between max-w-6xl px-5 py-3 mx-auto text-white md:px-5">
        <div className="text-xl font-bold">jooLand</div>


        <NavLinks
          OpenSidebar={OpenSidebar}
          setOpenSidebar={setOpenSidebar}
          dictionary={dictionary}
        />
      </div>
    </nav>
  );
}
