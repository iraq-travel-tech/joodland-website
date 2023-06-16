"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@components/elements/button/Button";
import { motion } from "framer-motion";
import useFlashMessages from "@lib/hooks/useFlashMessages";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTranslations } from "next-intl";

export default function HotelsSearchContainer() {
  const router = useRouter();
  const [City, setCity] = useState("");
  const [Loading, setLoading] = useState(false);
  const { addFlash } = useFlashMessages();
  const t = useTranslations("Home");

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
      <div className="flex flex-col gap-2 mt-3 md:flex-row">
        <div className="flex flex-col flex-1 gap-2 sm:flex-row">
          
        </div>

        <div className="h-full min-w-[10em]">
          <Button
            aria-label="search hotels"
            onClick={() => {
              if (City === "") {
                addFlash(`Please set the 'City' field.`);
              } else {
                setLoading(true);
                // Navigate to hotels search results page
                router.push(`/hotels/${City}`);
              }
            }}
            className="w-full h-full py-3 rounded-lg"
          >
            {!Loading && t("btns.search")}
            {Loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
