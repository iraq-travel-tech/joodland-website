import React from "react";
import MainNav from "../nav/MainNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <MainNav />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
