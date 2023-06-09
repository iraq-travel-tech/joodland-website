"use client";

import Button from "@components/elements/button/Button";
import DatePicker from "@components/elements/textinput/DatePicker";
import TextInput from "@components/elements/textinput/TextInput";
import { passengersAtom } from "@components/templates/flights/FlightsSearchBox";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import { RxArrowRight } from "react-icons/rx";

export default function page() {
  const [Email, setEmail] = useState("");
  const [passengers, setPassengers] = useAtom(passengersAtom);
  const [AllPassengersInfo, setAllPassengersInfo] = useState<
    {
      email: string;
      phone: string;
      firstName: string;
      middleName?: string;
      lastName: string;
      dateOfBirth: string;
    }[]
  >([]);

  const adults = passengers.adults || 0;
  const children = passengers.children || 0;
  const babies = passengers.Babies || 0;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 text-3xl font-bold">
        <p>London</p>
        <div className="mt-1">
          <RxArrowRight size={25} />
        </div>
        <p>New York</p>
      </div>

      <main className="flex flex-col gap-8 pb-6 mt-5 lg:flex-row">
        <div className="flex-1 ">
          {/* trip summary */}
          <div className="flex flex-col flex-1 p-4 bg-white rounded-lg custom-shadow">
            <div className="text-lg font-bold">Trip Summary</div>
            <hr className="mt-2" />

            <div className="flex items-center gap-4 mt-2 font-bold">
              <p>London</p>
              <div className="mt-1">
                <RxArrowRight size={25} />
              </div>
              <p>New York</p>
            </div>

            <div className="p-3 mt-2 bg-white custom-shadow">
              <div className="relative flex flex-col gap-4 pt-6">
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <div className="font-bold text-secondary-800">12:40</div>
                    <div className="text-sm text-zinc-400">3h 10m</div>
                  </div>

                  <div className="relative flex flex-col">
                    <div className="font-bold text-secondary-800">Baghdad</div>
                    <div className="text-sm text-zinc-400">
                      Baghdad International
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center w-max gap-2 h-[5em]">
                  <BsAirplaneFill className="rotate-180" />
                  <div className="h-full w-[.08em] bg-zinc-300"></div>
                  <div className="circle w-[.5em] min-h-[.5em] h-[.5em] rounded-full bg-black"></div>
                </div>

                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <div className="font-bold text-secondary-800">12:40</div>
                    <div className="text-sm text-zinc-400">3h 10m</div>
                  </div>

                  <div className="relative flex flex-col">
                    <div className="font-bold text-secondary-800">Baghdad</div>
                    <div className="text-sm text-zinc-400">
                      Baghdad International
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* trip passengers */}
          <div className="flex flex-col flex-1 p-4 bg-white rounded-lg custom-shadow">
            <div className="text-lg font-bold">Passengers</div>
            <hr />
            {Array.from(Array(adults), (_, index) => (
              <PassengerCompoent
                key={`adult-${index}`}
                passenger={AllPassengersInfo[index]}
                setPassengers={setAllPassengersInfo}
                index={index}
              />
            ))}
            {/* Render PassengerCompoent for each child */}
            {Array.from(Array(children), (_, index) => (
              <PassengerCompoent
                key={`child-${index}`}
                passenger={AllPassengersInfo[adults + index]}
                setPassengers={setAllPassengersInfo}
                index={adults + index}
              />
            ))}
            {/* Render PassengerCompoent for each baby */}
            {Array.from(Array(babies), (_, index) => (
              <PassengerCompoent
                key={`baby-${index}`}
                passenger={AllPassengersInfo[adults + children + index]}
                setPassengers={setAllPassengersInfo}
                index={adults + children + index}
              />
            ))}
          </div>
        </div>{" "}
        {/* total amount box */}
        <div className="bg-white p-4  h-max min-w-[20em] custom-shadow rounded-lg flex flex-col">
          <div className="text-lg font-bold">London to New York</div>
          <div className="text-sm text-zinc-500">One-way, Economy, 1 Adult</div>

          <div className="flex flex-col mt-4">
            <div className="flex gap-2">
              <div className="">
                <img
                  src="https://w7.pngwing.com/pngs/773/201/png-transparent-airplane-aircraft-flight-logo-airplane-blue-logo-flight-thumbnail.png"
                  alt="airline logo"
                  className="object-cover rounded-full w-7 h-7"
                />
              </div>
              <p className="font-bold">British Airways</p>
            </div>
            <div className="flex flex-col p-2 mt-2 text-sm border rounded-lg">
              <div className="flex items-center gap-4 mt-2 font-bold">
                <p>London</p>
                <div className="mt-1">
                  <RxArrowRight size={25} />
                </div>
                <p>New York</p>

                <span>sat, may 13</span>
              </div>

              <div className="text-xs text-zinc-400">1 stop 7h 45m</div>
            </div>

            <div className="flex items-center justify-between mt-5 text-lg font-bold">
              <p>Total Price</p>

              <p>$200 USD</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const PassengerCompoent = ({
  passenger,
  setPassengers,
  index,
}: {
  passenger: {
    email: string;
    phone: string;
    firstName: string;
    middleName?: string | undefined;
    lastName: string;
    dateOfBirth: string;
  };
  setPassengers: React.Dispatch<
    React.SetStateAction<
      {
        email: string;
        phone: string;
        firstName: string;
        middleName?: string | undefined;
        lastName: string;
        dateOfBirth: string;
      }[]
    >
  >;
  index: number;
}) => {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    today
  );
  const day = String(today.getDate());

  const [birth, setBirth] = useState({
    day: day,
    month: month,
    year: year,
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  console.log(passenger);

  // const [Email, setEmail] = useState(passenger.email);
  // const [Phone, setPhone] = useState(passenger.phone);
  // const [FirstName, setFirstName] = useState(passenger.firstName);
  // const [MiddleName, setMiddleName] = useState(passenger.middleName);
  // const [LastName, setLastName] = useState(passenger.lastName);
  // const [DateOfBirth, setDateOfBirth] = useState(passenger.dateOfBirth);

  return (
    <div className="mt-4">
      <div className="text-lg font-bold capitalize">
        {/* traveler {index} - {passenger.firstName} {passenger.lastName} */}
      </div>
      <div className="flex gap-2 mt-2">
        {/* <TextInput
          label="Email Address"
          type="email"
          placeholder="Email Address"
          State={Email}
          setState={setEmail}
        />
        <TextInput
          label="Phone Number"
          type="tel"
          placeholder="phone number"
          State={Phone}
          setState={setPhone}
        /> */}
      </div>
      <div className="flex gap-2 mt-2">
        {/* <TextInput
          label="first name"
          type="text"
          placeholder="first name"
          State={FirstName}
          setState={setFirstName}
        />
        <TextInput
          label="middle name"
          type="text"
          placeholder="middle name"
          State={MiddleName || ""}
          setState={setMiddleName}
        />
        <TextInput
          label="last name"
          type="text"
          placeholder="last name"
          State={LastName}
          setState={setLastName}
        /> */}
      </div>
      <div className="mt-4">
        <DatePicker
          date={birth}
          months={months}
          title="birth date"
          setDate={setBirth}
        />
      </div>
    </div>
  );
};
