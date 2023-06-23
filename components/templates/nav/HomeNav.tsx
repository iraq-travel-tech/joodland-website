"use client";
import Button from "@components/elements/button/Button";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import SwitchLang from "./items/SwitchLang";

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [LeftSideBarOpen, setLeftSideBarOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  return (
    <header
      className={`sticky top-0 left-0 transition-all shadow-none  z-40 ${
        isScrolled
          ? "bg-white text-black shadpw-lg"
          : " md:text-white text-black "
      }`}
    >
      <nav className="relative flex items-center justify-between max-w-6xl px-4 py-5 mx-auto sm:px-6 lg:px-8">
        <p
          className={`text-xl font-bold ${
            isScrolled ? "text-black" : " text-white "
          }`}
        >
          JoodLand
        </p>

        <ul
          className={`flex gap-2 items-center justify-center md:static md:text-inherit transition-all fixed top-0 h-full w-3/4 md:w-max bg-white md:bg-transparent md:left-0 z-50 ${
            LeftSideBarOpen ? " left-0 " : " -left-full "
          } `}
        >
          <li className="relative z-50">
            <SwitchLang RedirectTo="/" />
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
            aria-label="menu"
            type="button"
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
