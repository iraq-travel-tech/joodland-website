import TopNav from "@components/templates/nav/TopNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
