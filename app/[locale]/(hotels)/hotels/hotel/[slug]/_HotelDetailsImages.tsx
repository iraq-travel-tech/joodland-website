"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useDisableBackButton from "@lib/functions/DisableGoingBack";

const images = [
  "https://storage.googleapis.com/v-travel-hotels-images/55355/50113833.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/7728e4f1.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/cb0f5b3d.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/e3cb4f1e.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/e3cb4f1e.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/e3cb4f1e.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/e3cb4f1e.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/e3cb4f1e.jpg",
  "https://storage.googleapis.com/v-travel-hotels-images/55355/c03952cf.jpg",
];

export default function HotelDetailsImages() {
  const [openModal, setOpenModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useDisableBackButton(openModal, setOpenModal);

  return (
    <div>
      <div className="md:hidden relative h-[20em]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={images[carouselIndex]}
          alt=""
        />

        <button
          onClick={() => setOpenModal(true)}
          className="absolute md:hidden bg-black/50 backdrop-blur-md text-white py-2 px-5 rounded bottom-2 right-2"
        >
          + {images.length - 1}
        </button>
      </div>

      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 md:gap-1 md:h-[20em] md:w-full">
        {images.slice(0, 5).map((image, index) => (
          <div
            key={index}
            className={`relative ${index === 4 ? "cursor-pointer" : ""} ${
              index === 0 ? "col-span-2 row-span-2" : ""
            }`}
            onClick={index === 4 ? () => setOpenModal(true) : () => {}}
          >
            {index === 4 && (
              <div className="absolute inset-0 flex items-center text-xl text-white justify-center z-10">
                <p>+{images.length - 4 > 0 ? images.length - 5 : 1}</p>
              </div>
            )}
            <img
              className={`w-full h-full object-cover rounded-md ${
                index === 4 ? "brightness-50" : ""
              }`}
              src={image}
              alt=""
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openModal && (
          <motion.div
            transition={{
              type: "just",
            }}
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "100%" }}
            className="fixed inset-0 flex justify-center items-end z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-black/50 fixed inset-0 z-10"
              onClick={() => setOpenModal(false)}
            />
            <div className="z-20 w-full h-[80vh] bg-white rounded-t-3xl flex flex-col overflow-y-scroll transition-transform pb-10 duration-300 ease-in-out">
              <div className="sticky top-0 pt-4 pb-3 flex justify-center bg-white">
                <div
                  className="w-10 h-1 rounded-full bg-gray-300 cursor-pointer"
                  onClick={() => setOpenModal(false)}
                ></div>
              </div>
              <div className="grid mx-auto grid-cols-2 gap-2 p-4">
                {images.map((image, index) => (
                  <div key={index} className="w-full">
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={image}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
