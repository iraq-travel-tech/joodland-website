"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

type FlashProps = {
  message: string;
  type?: "success" | "error"; // for different styles of flash messages
  duration?: number; // duration for flash message to be visible
};

const flashVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export const Flash: React.FC<FlashProps> = ({
  message,
  type = "success",
  duration = 3000,
}) => {
  const [showFlash, setShowFlash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowFlash(false), duration);
    return () => clearTimeout(timer); // cleanup on unmount
  }, [duration]);

  return (
    <AnimatePresence mode="wait">
      {showFlash && (
        <motion.div
          className={`flash-message ${type}`} // Apply different styles based on type
          variants={flashVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
