"use client";
import Button from "@components/elements/button/Button";
import Dialog from "@components/elements/dialog/Dialog";
import UiSelect from "@components/elements/select/Select";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaPlaneArrival, FaPlaneDeparture, FaUsers } from "react-icons/fa";
import DatePicker from "@components/elements/textinput/DatePicker";
import HomeSearchInput from "./HomeSearchInput";
import Link from "next/link";
import Badge from "@components/elements/badge/Badge";
import { useRouter } from "next/navigation";
import Flash from "@components/blocks/flash/Flash";
import useFlashMessages from "@lib/hooks/useFlashMessages";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const tripdirections = [
  {
    label: "One Way",
    value: "One Way",
  },
  {
    label: "Round Trip",
    value: "Round Trip",
  },
];
const tripClasses = [
  {
    label: "Economy",
    value: "Economy",
  },
  {
    label: "business",
    value: "business",
  },
];

export default function HomeSearchContainer({
  noShadow,
  noMarginTop,
}: {
  noShadow?: boolean;
  noMarginTop?: boolean;
}) {
  const [Passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    Babies: 0,
  });
  const router = useRouter();

  const [tripDirection, setTripDirection] = useState("One Way");
  const [tripClass, setTripClass] = useState("Economy");
  const [TripPassengers, setTripPassengers] = useState([
    {
      label: "Adults",
      value: 1,
      age: "more than 12 years old",
    },
    {
      label: "Children",
      value: 0,
      age: "2-12 years old",
    },
    {
      label: "Babies",
      value: 0,
      age: "less than 2 years old",
    },
  ]);
  const [OpenPassengersDialog, setOpenPassengersDialog] = useState(false);
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [Loading, setLoading] = useState(false);

  const today = new Date();
  const year = String(today.getFullYear());
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    today
  );
  const day = String(today.getDate());

  const [DepartureDate, setDepartureDate] = useState({
    year: year,
    month: month,
    day: day,
  });
  const [ReturnDate, setReturnDate] = useState({
    year: year,
    month: month,
    day: day,
  });

  const { adults, children, Babies } = Passengers;
  const departureDate = `${DepartureDate.year}${DepartureDate.month}${DepartureDate.day}`;
  const returnDate = ReturnDate
    ? `${ReturnDate.year}${ReturnDate.month}${ReturnDate.day}`
    : "";

  const flightSearchUrl = `/flights/${From}-${To}?direction=${tripDirection}&class=${tripClass}&adults=${adults}&children=${children}&babies=${Babies}&departure=${departureDate}${
    returnDate ? `&return=${returnDate}` : ""
  }`;

  const { messages, addFlash, removeFlash } = useFlashMessages();

  return (
    <div
      className={`flex z-10 w-full ${
        !noMarginTop && "sm:mt-16 mt-10"
      } flex-col bg-white p-4 rounded-lg ${!noShadow && "shadow-xl"}`}
    >
      <div className="flex sm:gap-3 gap-1">
        <UiSelect
          State={tripDirection}
          setState={setTripDirection}
          options={tripdirections}
          noShadow
        />

        <UiSelect
          State={tripClass}
          setState={setTripClass}
          options={tripClasses}
          noShadow
        />

        <Button
          bg={"ghost"}
          className="text-xs relative"
          endIcon={<BsChevronDown className="text-xs" />}
          onClick={() => setOpenPassengersDialog(true)}
        >
          <span className="sm:flex hidden">Passengers</span>
          <span className="sm:hidden">
            <FaUsers />
          </span>

          <Badge variant={"primary"}>
            {Passengers.adults + Passengers.children + Passengers.Babies}
          </Badge>
        </Button>
        <PassengersDialogBox
          setOpenPassengersDialog={setOpenPassengersDialog}
          TripPassengers={TripPassengers}
          setTripPassengers={setTripPassengers}
          OpenPassengersDialog={OpenPassengersDialog}
          setPassengers={setPassengers}
        />
      </div>

      <div className="flex md:flex-row flex-col mt-3 gap-2">
        <div className="flex flex-1 sm:flex-row flex-col gap-2">
          <HomeSearchInput
            startIcon={<FaPlaneDeparture className="fill-gray-400" />}
            placeHolder="From"
            State={From}
            setState={setFrom}
          />
          <HomeSearchInput
            startIcon={<FaPlaneArrival className="fill-gray-400" />}
            placeHolder="To"
            State={To}
            setState={setTo}
          />
        </div>

        <DatePicker
          date={DepartureDate}
          setDate={setDepartureDate}
          title="DepartureDate"
        />

        {tripDirection === "Round Trip" && (
          <DatePicker
            date={ReturnDate}
            title="ReturnDate"
            setDate={setReturnDate}
          />
        )}

        <div className="h-full min-w-[10em]">
          <Button
            onClick={() => {
              if (From === "") {
                addFlash(`Please set the 'From' field.`);
              } else if (To === "") {
                addFlash(`Please set the 'To' field.`);
              } else {
                setLoading(true);
                router.push(flightSearchUrl);
              }
            }}
            className="h-full py-3 w-full rounded-lg"
          >
            {!Loading && "Search"}
            {Loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          </Button>
        </div>
      </div>
      <Flash messages={messages} removeFlash={removeFlash} />
    </div>
  );
}

const PassengersDialogBox = ({
  setOpenPassengersDialog,
  TripPassengers,
  setTripPassengers,
  OpenPassengersDialog,
  setPassengers,
}: {
  setOpenPassengersDialog: any;
  TripPassengers: any;
  setTripPassengers: any;
  OpenPassengersDialog: boolean;
  setPassengers: any;
}) => {
  return (
    <Dialog open={OpenPassengersDialog} setOpen={setOpenPassengersDialog}>
      <div className="flex flex-col gap-3 p-2 sm:w-[20em]">
        <div className="text-xl font-bold">Passengers</div>
        <hr className="border my-2 border-gray-200" />
        {TripPassengers.map((passenger: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-8">
            <div className="flex flex-col">
              <div className="font-bold capitalize">{passenger.label}</div>
              <div className="text-xs text-zinc-500">{passenger.age}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer active:scale-90 hover:bg-zinc-200"
                onClick={() => {
                  if (passenger.value > 0) {
                    const newPassengers = [...TripPassengers];
                    newPassengers[index].value -= 1;
                    setTripPassengers(newPassengers);
                  }
                }}
              >
                <BiMinus />
              </button>
              <div className="relative w-5 h-6">
                <div className="absolute !left-1.5" data-projection-id="10">
                  {passenger.value}
                </div>
              </div>
              <button
                className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer active:scale-90 hover:bg-zinc-200"
                onClick={() => {
                  const newPassengers = [...TripPassengers];
                  newPassengers[index].value += 1;
                  setTripPassengers(newPassengers);
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
            setOpenPassengersDialog(false);
            setPassengers({
              adults: TripPassengers[0].value,
              children: TripPassengers[1].value,
              Babies: TripPassengers[2].value,
            });
          }}
        >
          Done
        </Button>
      </div>
    </Dialog>
  );
};
