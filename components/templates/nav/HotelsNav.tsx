import React from "react";
import SwitchLang from "./items/SwitchLang";
import Link from "next/link";

export default function HotelsNav() {
  return (
    <header
      className={`sticky top-0 left-0 transition-all shadow-none z-40 bg-white`}
    >
      <nav className="relative flex items-center justify-between max-w-7xl px-4 py-5 mx-auto sm:px-6 lg:px-8">
        <Link href="/" className={`text-xl font-bold text-black `}>
          JoodLand
        </Link>

        <SwitchLang />
      </nav>
    </header>
  );
}
