import HotelsFilters from "@components/templates/hotels/HotelsFilters";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 pb-10 flex gap-10 py-8">
        <HotelsFilters />

        {children}
      </div>
    </div>
  );
}
