"use client";
import { atom, useAtom } from "jotai";
import Button from "@components/elements/button/Button";
import Dialog from "@components/elements/dialog/Dialog";
import UiSelect from "@components/elements/select/Select";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaPlaneArrival, FaPlaneDeparture, FaUsers } from "react-icons/fa";
import DatePicker from "@components/elements/textinput/DatePicker";
import HomeSearchInput, {
  ElasticSearchResponse,
} from "../home/HomeSearchInput";
import Badge from "@components/elements/badge/Badge";
import { useRouter } from "next/navigation";
import Flash from "@components/blocks/flash/Flash";
import useFlashMessages from "@lib/hooks/useFlashMessages";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HomeAllTextsProps } from "../home/HomeSearchContainer";
import { motion } from "framer-motion";

export const passengersAtom = atom({
  adults: 1,
  children: 0,
  Babies: 0,
});

export default function FlightsSearchBox({
  allTexts,
}: {
  allTexts: HomeAllTextsProps;
}) {
  const [Passengers, setPassengers] = useAtom(passengersAtom);
  const router = useRouter();

  const tripdirections = [
    {
      label: allTexts.switchTexts.direction.oneway,
      value: "oneway",
    },
    {
      label: allTexts.switchTexts.direction.round,
      value: "round",
    },
  ];
  const tripClasses = [
    {
      label: allTexts.switchTexts.class.economy,
      value: "Economy",
    },
    {
      label: allTexts.switchTexts.class.business,
      value: "business",
    },
  ];

  const [tripDirection, setTripDirection] = useState("oneway");
  const [tripClass, setTripClass] = useState("Economy");
  const [TripPassengers, setTripPassengers] = useState([
    {
      label: allTexts.passengers.adults.title,
      value: 1,
      age: allTexts.passengers.adults.subTitle,
    },
    {
      label: allTexts.passengers.children.title,
      value: 0,
      age: allTexts.passengers.children.subTitle,
    },
    {
      label: allTexts.passengers.babies.title,
      value: 0,
      age: allTexts.passengers.babies.subTitle,
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

  const { addFlash } = useFlashMessages();

  const SearchFunction = async (text: string) => {
    const response = await fetch(
      `https://booking.kayak.com/mvm/smartyv2/search?f=j&s=airportonly&where=${text}`
    );
    const data = await response.json();

    return data;
  };

  return (
    <motion.div
      initial={{
        x: 10,
        opacity: 0,
      }}
      exit={{
        x: -2,
        opacity: 0,
        transition: {
          type: "just",
        },
      }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          type: "just",
        },
      }}
      className="min-w-full"
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
          <span className="sm:flex hidden">{allTexts.passengers.name}</span>
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
          allTexts={allTexts}
        />
      </div>

      <div className="flex md:flex-row flex-col mt-3 gap-2">
        <div className="flex flex-1 sm:flex-row flex-col gap-2">
          <HomeSearchInput
            startIcon={<FaPlaneDeparture className="fill-gray-400" />}
            placeHolder={allTexts.from}
            State={From}
            setState={setFrom}
            SearchFunction={SearchFunction}
          />
          <HomeSearchInput
            startIcon={<FaPlaneDeparture className="fill-gray-400" />}
            placeHolder={allTexts.from}
            State={From}
            setState={setFrom}
            SearchFunction={SearchFunction}
          />
          {/* <HomeSearchInput
            startIcon={<FaPlaneArrival className="fill-gray-400" />}
            placeHolder={allTexts.to}
            State={To}
            setState={setTo}
          /> */}
        </div>

        <DatePicker
          date={DepartureDate}
          setDate={setDepartureDate}
          title={allTexts.DepartureDate}
          months={[
            allTexts.months.january,
            allTexts.months.february,
            allTexts.months.march,
            allTexts.months.april,
            allTexts.months.may,
            allTexts.months.june,
            allTexts.months.july,
            allTexts.months.august,
            allTexts.months.september,
            allTexts.months.october,
            allTexts.months.november,
            allTexts.months.december,
          ]}
        />

        {tripDirection === "round" && (
          <DatePicker
            date={ReturnDate}
            title={allTexts.ReturnDate}
            setDate={setReturnDate}
            months={[
              allTexts.months.january,
              allTexts.months.february,
              allTexts.months.march,
              allTexts.months.april,
              allTexts.months.may,
              allTexts.months.june,
              allTexts.months.july,
              allTexts.months.august,
              allTexts.months.september,
              allTexts.months.october,
              allTexts.months.november,
              allTexts.months.december,
            ]}
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
            {!Loading && allTexts.btns.search}
            {Loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

const PassengersDialogBox = ({
  setOpenPassengersDialog,
  TripPassengers,
  setTripPassengers,
  OpenPassengersDialog,
  setPassengers,
  allTexts,
}: {
  setOpenPassengersDialog: any;
  TripPassengers: any;
  setTripPassengers: any;
  OpenPassengersDialog: boolean;
  setPassengers: any;
  allTexts: HomeAllTextsProps;
}) => {
  return (
    <Dialog open={OpenPassengersDialog} setOpen={setOpenPassengersDialog}>
      <div className="flex flex-col gap-3 p-2 sm:w-[20em]">
        <div className="text-xl font-bold">{allTexts.passengers.name}</div>
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
          {allTexts.btns.done}
        </Button>
      </div>
    </Dialog>
  );
};
