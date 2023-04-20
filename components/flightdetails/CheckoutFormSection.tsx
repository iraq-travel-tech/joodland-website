"use client";

import TravelerInfoCheckout from "./TravelerInfoCheckout";

type AllProps = {
  passengers: string[];
};

export default function CheckoutFormSection(props: AllProps) {
  return (
    <form className="flex flex-col gap-4 mt-2">
      {props.passengers.map((i, index) => (
        <TravelerInfoCheckout key={index} index={index} i={i} />
      ))}

      <button
        type="submit"
        className="p-3 mt-3 text-white bg-orange-600 rounded w-max"
      >
        submit
      </button>
    </form>
  );
}
