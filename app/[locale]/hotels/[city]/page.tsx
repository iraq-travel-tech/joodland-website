import React from "react";

export default function page({
  params,
}: {
  params: {
    city: string;
  };
}) {
  return (
    <div>
      <div className="text-3xl font-bold">all hotels in {params.city}</div>
    </div>
  );
}
