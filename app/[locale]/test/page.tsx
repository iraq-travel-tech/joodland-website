"use client";

import { updateQueryParameter } from "@lib/functions/updateQueryParameter";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const router = useRouter();

  return (
    <div className="flex gap-10">
      <button
        onClick={() => {
          updateQueryParameter("color", "red", router);
        }}
      >
        change color of red
      </button>

      <button
        onClick={() => {
          updateQueryParameter("color", "blue", router);
        }}
      >
        change color of blue
      </button>
    </div>
  );
}
