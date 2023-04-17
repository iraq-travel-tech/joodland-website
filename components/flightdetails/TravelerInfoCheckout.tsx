import React, { useState } from "react";
// import OldDateInput from "../core-ui/forms/inputs/OldDateInput";

type AllProps = {
  index: number;
  i: string;
};

export default function TravelerInfoCheckout({ i, index }: AllProps) {
  const [Date, setDate] = useState("");
  const [Gender, setGender] = useState("");

  return (
    <div key={index} className="mt-4">
      <div className="text-lg font-bold">
        Traveler {index + 1} - {i}
      </div>
      <div className="flex mt-3 flex-col gap-4">
        <div className="flex gap-4">
          <input
            required
            type="text"
            className="border rounded border-zinc-300 py-2 px-3 flex-1"
            placeholder="Email Address"
            name={`traveler-${index}-email`}
          />
          <input
            required
            type="text"
            className="border rounded border-zinc-300 py-2 px-3 flex-1"
            placeholder="Phone Number"
            name={`traveler-${index}-phone`}
          />
        </div>
        <div className="flex gap-4">
          <input
            required
            type="text"
            className="border rounded border-zinc-300 py-2 px-3 flex-1"
            placeholder="First Name"
            name={`traveler-${index}-first-name`}
          />
          <input
            type="text"
            className="border rounded border-zinc-300 py-2 px-3 flex-1"
            placeholder="Middle Name"
            name={`traveler-${index}-middle-name`}
          />
          <input
            required
            type="text"
            className="border rounded border-zinc-300 py-2 px-3 flex-1"
            placeholder="Last Name"
            name={`traveler-${index}-last-name`}
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="w-max">
            {/* <OldDateInput
              name={`traveler-${index}-date-of-birth`}
              placeholder="Date of Birth"
              value={Date}
              setValue={setDate}
              required
            /> */}
          </div>
          <div className="flex gap-3">
            <p className="font-bold">Gender:</p>

            <label>
              <input
                type="radio"
                value="male"
                checked={Gender === "male"}
                onChange={() => setGender("male")}
                name={`traveler-${index}-gender`}
              />
              Male
            </label>
            <label>
              <input
                name={`traveler-${index}-gender`}
                type="radio"
                value="female"
                checked={Gender === "female"}
                onChange={() => setGender("female")}
              />
              Female
            </label>
          </div>{" "}
        </div>
      </div>{" "}
    </div>
  );
}
