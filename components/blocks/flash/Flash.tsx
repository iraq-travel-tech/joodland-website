"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, FC } from "react";

interface FlashMessageProps {
  message: string;
  removeFlash: () => void;
}

interface FlashProps {
  messages: string[];
  removeFlash: (index: number) => void;
}

const flashVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: 50 },
};

const FlashMessage: FC<FlashMessageProps> = ({ message, removeFlash }) => {
  useEffect(() => {
    const timer = setTimeout(removeFlash, 2000);
    return () => clearTimeout(timer); // cleanup on unmount
  }, [removeFlash]);

  return (
    <motion.div
      layout
      className={`rounded-md text-white bg-blue-600 py-3 px-4`}
      variants={flashVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {message}
    </motion.div>
  );
};

const Flash: FC<FlashProps> = ({ messages, removeFlash }) => (
  <motion.div layout className="fixed flex flex-col gap-4 bottom-4 right-4">
    <AnimatePresence>
      {messages.map((message, index) => (
        <FlashMessage
          key={index}
          message={message}
          removeFlash={() => removeFlash(index)}
        />
      ))}
    </AnimatePresence>
  </motion.div>
);

export default Flash;
