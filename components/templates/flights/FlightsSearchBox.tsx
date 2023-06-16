"use client";
import { atom, useAtom } from "jotai";
import Button from "@components/elements/button/Button";
import Dialog from "@components/elements/dialog/Dialog";
import UiSelect from "@components/elements/select/Select";
import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaPlaneDeparture, FaUsers } from "react-icons/fa";
import DatePicker from "@components/elements/textinput/DatePicker";
import HomeSearchInput from "../home/HomeSearchInput";
import Badge from "@components/elements/badge/Badge";
import useFlashMessages from "@lib/hooks/useFlashMessages";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const passengersAtom = atom({
  adults: 1,
  children: 0,
  Babies: 0,
});

export default function FlightsSearchBox() {
  const t = useTranslations("Home");

  const [Passengers, setPassengers] = useAtom(passengersAtom);

  const tripdirections = [
    {
      label: t("switchTexts.direction.oneway"),
      value: "oneway",
    },
    {
      label: t("switchTexts.direction.round"),
      value: "round",
    },
  ];
  const tripClasses = [
    {
      label: t("switchTexts.class.economy"),
      value: "Economy",
    },
    {
      label: t("switchTexts.class.business"),
      value: "business",
    },
  ];

  const [tripDirection, setTripDirection] = useState("oneway");
  const [tripClass, setTripClass] = useState("Economy");
  const [TripPassengers, setTripPassengers] = useState([
    {
      label: t("passengers.adults.title"),
      value: 1,
      age: t("passengers.adults.subTitle"),
    },

    {
      label: t("passengers.children.title"),
      value: 0,
      age: t("passengers.children.subTitle"),
    },

    {
      label: t("passengers.babies.title"),
      value: 0,
      age: t("passengers.babies.subTitle"),
    },
  ]);
  const [OpenPassengersDialog, setOpenPassengersDialog] = useState(false);
  const [From, setFrom] = useState({ name: "", iataCode: "" });
  const [To, setTo] = useState({ name: "", iataCode: "" });
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

  const formatDateForUrl = (date: any) => {
    const year = date.year;

    const monthNames = {
      january: "01",
      february: "02",
      march: "03",
      april: "04",
      may: "05",
      june: "06",
      july: "07",
      august: "08",
      september: "09",
      october: "10",
      november: "11",
      december: "12",
    };

    // @ts-ignore
    const month = monthNames[date.month.toLowerCase()] || "01";
    const day = String(date.day).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const departureDateForUrl = formatDateForUrl(DepartureDate);
  const returnDateForUrl = ReturnDate ? formatDateForUrl(ReturnDate) : "";

  const flightSearchUrl = `/flights/${From.iataCode}-${
    To.iataCode
  }?direction=${tripDirection}&class=${tripClass}&adults=${adults}&children=${children}&babies=${Babies}&departure=${departureDateForUrl}${
    returnDateForUrl ? `&return=${returnDateForUrl}` : ""
  }`;

  const { addFlash } = useFlashMessages();

  const SearchFunction = async (text: string) => {
    // Use local API endpoint
    const response = await fetch(`/api/elasticsearch?q=${text}`);
    const data = await response.json();

    // Map the data to the ElasticSearchResponse format
    const mappedData = data.map((airport: any) => ({
      id: airport.iata, // Assuming iata can be used as an ID
      destination_images: {
        image_jpeg: "", // Put here a default image URL or dynamic image if available
      },
      name: airport.name,
      cityname: airport.city,
    }));

    return mappedData;
  };

  const AllMonths = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ];

  const [RecentSearches, setRecentSearches] = useState<
    { name: string; iata: string }[]
  >([]); // Update the type of state

  useEffect(() => {
    let recentSearches = localStorage.getItem("recentSearches")
      ? JSON.parse(localStorage.getItem("recentSearches") as string)
      : [];
    // Update the RecentSearches state
    setRecentSearches(recentSearches);

    if (From.iataCode === "" || To.iataCode === "") {
      return; // Skip adding empty values to local storage
    }

    // Add the new searches as objects to the beginning of the array
    recentSearches.unshift(
      {
        name: From.name,
        iata: From.iataCode,
      },
      {
        name: To.name,
        iata: To.iataCode,
      }
    );

    // Trim the array to only keep the last 5 searches
    recentSearches = recentSearches.slice(0, 4);

    // Store the updated recentSearches array in localStorage
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [From, To]);

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
      <div className="flex gap-1 sm:gap-3">
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
          aria-label="open passengers dialog box"
          bg={"ghost"}
          className="relative text-xs"
          endIcon={<BsChevronDown className="text-xs" />}
          onClick={() => setOpenPassengersDialog(true)}
        >
          <span className="hidden sm:flex">{t("passengers.name")}</span>
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

      <div className="flex flex-col gap-2 mt-3 md:flex-row">
        <div className="flex flex-col flex-1 gap-2 sm:flex-row">
          <HomeSearchInput
            startIcon={<FaPlaneDeparture className="fill-gray-400" />}
            placeHolder={t("from")}
            State={From}
            setState={setFrom}
            SearchFunction={SearchFunction}
            RecentSearches={RecentSearches}
          />
          <HomeSearchInput
            startIcon={<FaPlaneDeparture className="fill-gray-400" />}
            placeHolder={t("to")}
            State={To}
            setState={setTo}
            SearchFunction={SearchFunction}
            RecentSearches={RecentSearches}
          />
        </div>

        <DatePicker
          date={DepartureDate}
          setDate={setDepartureDate}
          title={t("DepartureDate")}
          months={AllMonths}
        />

        {tripDirection === "round" && (
          <DatePicker
            date={ReturnDate}
            title={t("ReturnDate")}
            setDate={setReturnDate}
            months={[AllMonths]}
          />
        )}

        <div className="h-full min-w-[10em]">
          <Link href={flightSearchUrl} passHref>
            <Button
              aria-label="search flights"
              // @ts-ignore
              onClick={(event: any) => {
                if (From.iataCode === "") {
                  event.preventDefault();
                  addFlash(t("flashfrom"));
                } else if (To.iataCode === "") {
                  event.preventDefault();
                  addFlash(t("flashto"));
                } else {
                  setLoading(true);
                }
              }}
              className="w-full h-full py-3 rounded-lg"
            >
              {!Loading && t("btns.search")}
              {Loading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
            </Button>
          </Link>
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
}: {
  setOpenPassengersDialog: any;
  TripPassengers: any;
  setTripPassengers: any;
  OpenPassengersDialog: boolean;
  setPassengers: any;
}) => {
  const t = useTranslations("Home");

  return (
    <Dialog open={OpenPassengersDialog} setOpen={setOpenPassengersDialog}>
      <div className="flex flex-col gap-3 p-2 sm:w-[20em]">
        <div className="text-xl font-bold">{t("passengers.name")}</div>
        <hr className="my-2 border border-gray-200" />
        {TripPassengers.map((passenger: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-8">
            <div className="flex flex-col">
              <div className="font-bold capitalize">{passenger.label}</div>
              <div className="text-xs text-zinc-500">{passenger.age}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="decrease passenger number"
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
                aria-label="increase passenger number"
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
          {t("btns.done")}
        </Button>
      </div>
    </Dialog>
  );
};

