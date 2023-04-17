"use client";

import TravelerInfoCheckout from "./TravelerInfoCheckout";

type AllProps = {
  passengers: string[];
};

export default function CheckoutFormSection(props: AllProps) {
  return (
    <form className="flex flex-col mt-2 gap-4">
      {props.passengers.map((i, index) => (
        <TravelerInfoCheckout key={index} index={index} i={i} />
      ))}

      <button
        type="submit"
        className="p-3 rounded bg-orange-600 text-white w-max mt-3"
      >
        submit
      </button>
    </form>
  );
}
