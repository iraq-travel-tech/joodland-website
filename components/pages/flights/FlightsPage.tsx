"use client";
import { motion } from "framer-motion";
import FlightTicketCard from "@components/blocks/cards/FlightTicketCard";
import Button from "@components/elements/button/Button";
import React from "react";
import { MdFilterListAlt } from "react-icons/md";

const ticketVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: -50, opacity: 0, transition: { duration: 0.2 } },
};

export default function FlightsPage() {
  return (
    <div>
      <motion.div
        initial={{
          y: -20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className="flex justify-between items-center"
      >
        <div className="text-2xl font-bold text-secondary-900">
          Select outbound
        </div>
        <Button startIcon={<MdFilterListAlt />} roundedFull bg={"ghost"}>
          sort filters
        </Button>
      </motion.div>

      <motion.div layout className="flex flex-col gap-4 pt-6 pb-10">
        {[1, 2, 3, 4, 5].map((i, index) => (
          <motion.div
            key={index}
            variants={ticketVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FlightTicketCard />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
