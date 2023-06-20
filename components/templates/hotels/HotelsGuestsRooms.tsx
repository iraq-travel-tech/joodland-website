"use client";
import React, { useState } from "react";
import Dialog from "@components/elements/dialog/Dialog";
import Button from "@components/elements/button/Button";
import { BiHotel, BiMinus, BiPlus } from "react-icons/bi";
import { useTranslations } from "next-intl";

const HotelsGuestsRoomsBox = ({
  setOpenGuestsRoomsDialog,
  GuestsRooms,
  setGuestsRooms,
  OpenGuestsRoomsDialog,
  setGuests,
}: {
  setOpenGuestsRoomsDialog: any;
  GuestsRooms: { label: string; value: number }[];
  setGuestsRooms: any;
  OpenGuestsRoomsDialog: boolean;
  setGuests: any;
}) => {
  return (
    <Dialog open={OpenGuestsRoomsDialog} setOpen={setOpenGuestsRoomsDialog}>
      <div className="flex flex-col gap-3 p-2 sm:w-[20em] w-[16em]">
        <div className="text-xl font-bold">Guests & Rooms</div>
        <hr className="my-2 border border-gray-200" />

        {GuestsRooms.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-8">
            <div className="font-bold capitalize">{item.label}</div>
            <div className="flex items-center gap-2">
              <button
                aria-label="decrease number"
                className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer active:scale-90 hover:bg-zinc-200"
                onClick={() => {
                  if (item.value > 0) {
                    const newItems = [...GuestsRooms];
                    newItems[index].value -= 1;
                    setGuestsRooms(newItems);
                  }
                }}
              >
                <BiMinus />
              </button>
              <div>{item.value}</div>
              <button
                aria-label="increase number"
                className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer active:scale-90 hover:bg-zinc-200"
                onClick={() => {
                  const newItems = [...GuestsRooms];
                  newItems[index].value += 1;
                  setGuestsRooms(newItems);
                }}
              >
                <BiPlus />
              </button>
            </div>
          </div>
        ))}

        <Button
          className="mt-2"
          onClick={() => {
            setOpenGuestsRoomsDialog(false);
            setGuests({
              adults: GuestsRooms[0].value,
              children: GuestsRooms[1].value,
              rooms: GuestsRooms[2].value,
            });
          }}
        >
          Done
        </Button>
      </div>
    </Dialog>
  );
};

export default function HotelsGuestsRooms() {
  const [GuestsRooms, setGuestsRooms] = useState([
    { label: "Adults", value: 1 },
    { label: "Children", value: 0 },
    { label: "Rooms", value: 1 },
  ]);

  const [ShowContainer, setShowContainer] = useState(false);

  const [Guests, setGuests] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  });

  const t = useTranslations("Home");

  return (
    <div>
      <div
        onClick={() => setShowContainer(!ShowContainer)}
        className="flex w-full items-center gap-3 h-14 min-w-[14em] cursor-pointer border bg-gray-100 rounded-lg px-3 py-2 border-gray-300  relative"
      >
        <span className="text-zinc-400">
          <BiHotel size={22} />
        </span>
        <div className="min-w-max">
          <span className="text-xs leading-1 text-zinc-400">
            {t("guests&rooms")}
          </span>
          <div className="text-sm font-semibold">
            {Guests.adults} {t("passengers.adults.title")}, {Guests.children}{" "}
            {t("passengers.children.title")}, {Guests.rooms}{" "}
            {t("passengers.rooms")}
          </div>
        </div>
      </div>

      {/* {ShowContainer && (
        <div className="absolute top-16 mt-2 bg-white shadow-md border border-gray-200 rounded-lg w-[16em] p-3 z-10">
          
        </div>
      )} */}
      <HotelsGuestsRoomsBox
        OpenGuestsRoomsDialog={ShowContainer}
        setOpenGuestsRoomsDialog={setShowContainer}
        GuestsRooms={GuestsRooms}
        setGuestsRooms={setGuestsRooms}
        setGuests={setGuests}
      />
    </div>
  );
}
