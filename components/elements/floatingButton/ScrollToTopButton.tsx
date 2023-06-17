"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Button from "../button/Button";
import { AnimatePresence, motion } from "framer-motion";
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
    <AnimatePresence>
      {!isAtTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: scrolling ? 0 : 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed z-40 right-4 bottom-[4em]"
        >
          <Button
            className="w-12 h-12"
            bg={"secondary"}
            roundedFull
            iconOnly
            onClick={scrollToTop}
          >
            <IoIosArrowUp size={18} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
