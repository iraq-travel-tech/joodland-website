import HotelsFilters from "@components/templates/hotels/HotelsFilters";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header
        className={`sticky top-0 left-0 transition-all shadow-none z-40 bg-white`}
      >
        <nav className="relative flex items-center justify-between max-w-7xl px-4 py-5 mx-auto sm:px-6 lg:px-8">
          <p className={`text-xl font-bold text-black `}>JoodLand</p>
        </nav>
      </header>

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 pb-10 flex gap-10 py-8">
        <HotelsFilters />

        {children}
      </div>
    </div>
  );
}
