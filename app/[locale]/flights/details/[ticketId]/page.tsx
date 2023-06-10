"use client";

import Button from "@components/elements/button/Button";
import TextInput from "@components/elements/textinput/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import { RxArrowRight } from "react-icons/rx";

export default function page() {
  const [Email, setEmail] = useState("");

  return (
    <div className="mt-6">
      <div className="text-3xl font-bold flex gap-4 items-center">
        <p>London</p>
        <div className="mt-1">
          <RxArrowRight size={25} />
        </div>
        <p>New York</p>
      </div>

      <main className="flex lg:flex-row flex-col gap-8 mt-5 pb-6">
        <div className="flex flex-col gap-5">
          {/* trip summary */}
          <div className="bg-white flex-1 p-4 rounded-lg custom-shadow flex flex-col">
            <div className="font-bold text-lg">Trip Summary</div>
            <hr className="mt-2" />

            <div className="mt-2 font-bold flex gap-4 items-center">
              <p>London</p>
              <div className="mt-1">
                <RxArrowRight size={25} />
              </div>
              <p>New York</p>
            </div>

            <div className="bg-white mt-2 custom-shadow p-3">
              <div className="flex pt-6 flex-col relative gap-4">
                <div className="flex gap-10">
                  <div className="flex flex-col">
                    <div className="font-bold text-secondary-800">12:40</div>
                    <div className="text-zinc-400 text-sm">3h 10m</div>
                  </div>

                  <div className="flex flex-col relative">
                    <div className="font-bold text-secondary-800">Baghdad</div>
                    <div className="text-zinc-400 text-sm">
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
                    <div className="text-zinc-400 text-sm">3h 10m</div>
                  </div>

                  <div className="flex flex-col relative">
                    <div className="font-bold text-secondary-800">Baghdad</div>
                    <div className="text-zinc-400 text-sm">
                      Baghdad International
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* trip passengers */}
          <div className="bg-white flex-1 p-4 rounded-lg custom-shadow flex flex-col">
            <div className="font-bold text-lg">Passengers</div>
            <hr />

            {/* passenger 1 */}
            <div className="mt-4">
              <div className="text-lg font-bold capitalize">
                traveler 1 - adult
              </div>

              <div className="flex mt-2 gap-2">
                <TextInput
                  label="Email"
                  State={Email}
                  setState={setEmail}
                  type="email"
                  placeholder="Enter your email"
                />
                <TextInput
                  label="Email"
                  State={Email}
                  setState={setEmail}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <TextInput
                  label="first name"
                  State={Email}
                  setState={setEmail}
                  type="text"
                  placeholder="first name"
                />
                <TextInput
                  label="middle name"
                  State={Email}
                  setState={setEmail}
                  type="text"
                  placeholder="middle name"
                />
                <TextInput
                  label="last name"
                  State={Email}
                  setState={setEmail}
                  type="text"
                  placeholder="last name"
                />
              </div>
            </div>

            {/* passenger 2 */}
            <div className="mt-4">
              <div className="text-lg font-bold capitalize">
                traveler 1 - adult
              </div>

              <PassengerCompoent />
            </div>
          </div>
        </div>{" "}
        {/* total amount box */}
        <div className="bg-white p-4  h-max min-w-[20em] custom-shadow rounded-lg flex flex-col">
          <div className="font-bold text-lg">London to New York</div>
          <div className="text-zinc-500 text-sm">One-way, Economy, 1 Adult</div>

          <div className="flex flex-col mt-4">
            <div className="flex gap-2">
              <div className="">
                <img
                  src="https://w7.pngwing.com/pngs/773/201/png-transparent-airplane-aircraft-flight-logo-airplane-blue-logo-flight-thumbnail.png"
                  alt=""
                  className="w-7 h-7 rounded-full object-cover"
                />
              </div>
              <p className="font-bold">British Airways</p>
            </div>
            <div className="border mt-2 p-2 rounded-lg text-sm flex flex-col">
              <div className="mt-2 font-bold flex gap-4 items-center">
                <p>London</p>
                <div className="mt-1">
                  <RxArrowRight size={25} />
                </div>
                <p>New York</p>

                <span>sat, may 13</span>
              </div>

              <div className="text-zinc-400 text-xs">1 stop 7h 45m</div>
            </div>

            <div className="mt-5 font-bold text-lg flex justify-between items-center">
              <p>Total Price</p>

              <p>$200 USD</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const PassengerCompoent = () => {
  const [Email, setEmail] = useState("");
  const [Email2, setEmail2] = useState("");
  return (
    <div className="flex gap-2 mt-2">
      <TextInput
        label="first name"
        State={Email}
        setState={setEmail}
        type="text"
        placeholder="first name"
      />
      <TextInput
        label="middle name"
        State={Email}
        setState={setEmail}
        type="text"
        placeholder="middle name"
      />
      <TextInput
        label="last name"
        State={Email}
        setState={setEmail}
        type="text"
        placeholder="last name"
      />
    </div>
  );
};
