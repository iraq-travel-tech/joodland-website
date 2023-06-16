"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Button from "../button/Button";
import { useIsScrollingDown } from "@lib/hooks/scrollDetect";

export default function ScrollToTopButton() {
  const scrolling = useIsScrollingDown();
  const [isAtTop, setIsAtTop] = useState(true);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // Event listener to detect scroll position
  useEffect(() => {
    const onScroll = () => {
      // Set isAtTop to true if scrolled to the top
      setIsAtTop(window.pageYOffset === 0);
    };

    // Add the event listener
    window.addEventListener("scroll", onScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {!isAtTop && (
        <Button
          bg={"secondary"}
          className={`fixed z-40 right-4 w-12 h-12
            transition-all
            ${!scrolling ? "bottom-16 opacity-1" : "opacity-0 bottom-0"}
            `}
          roundedFull
          iconOnly
          onClick={scrollToTop}
        >
          <IoIosArrowUp size={18} />
        </Button>
      )}
    </>
  );
}
