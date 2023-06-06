"use client";
import Button from "@components/elements/button/Button";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/router";
import UiSelect from "@components/elements/select/Select";
import Link from "next-intl/link";
import { useParams } from "next/navigation";

const languages = [
  {
    label: "Ar",
    value: "ar",
  },
  {
    label: "En",
    value: "en",
  },
];

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [Language, setLanguage] = useState(languages[0].value);
  const [LeftSideBarOpen, setLeftSideBarOpen] = useState(false);

  useEffect(() => {
    // Add event listener to handle scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  const params = useParams() as {
    locale: "ar" | "en";
  };

  return (
    <header
      className={`sticky top-0 left-0 transition-all shadow-none  z-40 ${
        isScrolled
          ? "bg-white text-black shadpw-lg"
          : " md:text-white text-black "
      }`}
    >
      <nav className="max-w-6xl py-5 relative mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <p
          className={`text-xl font-bold ${
            isScrolled ? "text-black" : " text-white "
          }`}
        >
          JooLand
        </p>

        <ul
          className={`flex gap-2 items-center justify-center md:static md:text-inherit transition-all fixed top-0 h-full w-3/4 md:w-max bg-white md:bg-transparent md:left-0 z-50 ${
            LeftSideBarOpen ? " left-0 " : " -left-full "
          } `}
        >
          <li className="relative z-50">
            {/* <UiSelect
              options={[...languages]}
              State={Language}
              setState={setLanguage}
              noShadow
              noBg
            /> */}

            {params.locale === "ar" ? (
              <Link locale="en" href="/">
                english
              </Link>
            ) : (
              <Link locale="ar" href="/">
                arabic
              </Link>
            )}
          </li>
        </ul>
        <div
          onClick={() => setLeftSideBarOpen(!LeftSideBarOpen)}
          className={`
            fixed w-full h-full md:hidden top-0 bg-black/50 z-40 transition-all
            ${
              LeftSideBarOpen
                ? " left-0 opacity-100 "
                : " -left-full opacity-0 "
            }
            `}
        />
        <div className="md:hidden absolute top-[1em] right-2 z-50">
          <Button
            iconOnly
            bg={"ghost"}
            className={`
              ${!isScrolled && "text-white hover:text-black"}
              `}
            onClick={() => setLeftSideBarOpen(!LeftSideBarOpen)}
          >
            <AiOutlineMenu />
          </Button>
        </div>
      </nav>
    </header>
  );
}
