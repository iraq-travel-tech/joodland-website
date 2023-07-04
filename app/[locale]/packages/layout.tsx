import HotelsNav from "@components/templates/nav/HotelsNav";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HotelsNav />
      {children}
    </div>
  );
}
