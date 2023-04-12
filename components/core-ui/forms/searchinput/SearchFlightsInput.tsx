import React from "react";
type SearchFlightsInputProps = {
  placeholder: string;
  startIcon: React.ReactNode;
};
export default function SearchFlightsInput(props: SearchFlightsInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        className="rounded shadow-md placeholder:capitalize pl-10 py-2 px-4 w-full placeholder-zinc-400 "
        placeholder="going from"
      />

      <div className="absolute top-3 left-3 ">{props.startIcon}</div>
    </div>
  );
}
