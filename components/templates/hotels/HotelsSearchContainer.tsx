"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/elements/button/Button";
import HomeSearchInput from "../home/HomeSearchInput";
import { motion } from "framer-motion";
import { FaHotel } from "react-icons/fa";
import { HomeAllTextsProps } from "../home/HomeSearchContainer";
import useFlashMessages from "@lib/hooks/useFlashMessages";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function HotelsSearchContainer({
  allTexts,
}: {
  allTexts: HomeAllTextsProps;
}) {
  const router = useRouter();
  const [City, setCity] = useState("");
  const [Loading, setLoading] = useState(false);
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
      <div className="flex md:flex-row flex-col mt-3 gap-2">
        <div className="flex flex-1 sm:flex-row flex-col gap-2">
          <HomeSearchInput
            placeHolder={allTexts.city}
            State={City}
            setState={setCity}
            SearchFunction={SearchFunction}
            startIcon={<FaHotel className="fill-gray-400" />}
          />
        </div>

        <div className="h-full min-w-[10em]">
          <Button
            onClick={() => {
              if (City === "") {
                addFlash(`Please set the 'City' field.`);
              } else {
                setLoading(true);
                // Navigate to hotels search results page
                router.push(`/hotels/${City}`);
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
