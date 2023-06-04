import FlightsNav from "@components/templates/nav/FlightsNav";
import TopNav from "@components/templates/nav/TopNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <FlightsNav />
      <div className="max-w-6xl pt-6 mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
