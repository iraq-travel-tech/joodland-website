"use client";
import Button from "@components/elements/button/Button";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`sticky top-0 left-0 transition-all shadow-none text-white z-40 ${
        isScrolled ? "bg-white !text-black shadpw-lg" : ""
      }`}
    >
      <nav className="max-w-6xl py-5 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <p className="text-xl font-bold">JooLand</p>

        <ul className="flex gap-2">
          <li className="sm:hidden">
            <Button
              iconOnly
              bg={"ghost"}
              className={`
              ${!isScrolled && "text-white hover:text-black"}
              `}
            >
              <AiOutlineMenu />
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
