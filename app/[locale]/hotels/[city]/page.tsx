"use client";

import Button from "@components/elements/button/Button";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { GoChevronLeft } from "react-icons/go";

export default function page() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  return (
    <div className="flex gap-3 w-full">
      <div
        className={`bg-black fixed inset-0 z-40 transition-all
        ${isFilterVisible ? "opacity-50" : "opacity-0 pointer-events-none"}

      `}
        onClick={() => setIsFilterVisible(false)}
      />
      <div
        className={`lg:w-3/12 sm:w-5/12 w-7/12 lg:p-0 px-6 lg:pt-0 pt-20 lg:sticky lg:top-24 lg:block lg:right-0 transition-all lg:bg-transparent bg-white lg:h-max h-full z-50 top-0 border-r ${
          isFilterVisible ? "fixed right-0" : "fixed -right-full"
        }`}
      >
        <div className="text-2xl font-bold underline">Filters</div>
        <hr className="my-2" />

        {/* Maximum Price Filter */}
        <div className="flex flex-col mt-4">
          <div className="font-semibold">Maximum Price /night</div>
          {[
            { label: "50 USD", checked: false },
            { label: "100 USD", checked: false },
            { label: "150 USD", checked: false },
          ].map((i) => (
            <div key={i.label} className="flex items-center mt-2">
              <input
                type="radio"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                defaultChecked={i.checked}
                name={i.label}
              />
              <label
                htmlFor={i.label}
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                {i.label}
              </label>
            </div>
          ))}
        </div>

        {/* Stars and Ratings Filter */}
        <div className="flex flex-col mt-4">
          <div className="font-semibold">Stars</div>
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="flex items-center mt-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                name={`star-${star}`}
              />
              <label
                htmlFor={`star-${star}`}
                className="ml-3 min-w-0 flex-1 text-gray-500"
              >
                {"★".repeat(star)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="w-max">
          <Link href="/">
            <Button bg={"ghost"} startIcon={<GoChevronLeft />}>
              Go Back
            </Button>
          </Link>
        </div>
        <div className="flex mt-2 justify-between items-center">
          <div className="sm:text-2xl text-lg capitalize font-bold">
            20 stays in Istanbul
          </div>
          <button
            className="lg:hidden text-blue-600 underline"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
          >
            Filters
          </button>
        </div>
        <hr className="mt-2" />
        <div className="grid gap-3 mt-2 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
          <HotelCard />
        </div>
      </div>
    </div>
  );
}

const HotelCard = () => {
  const images = [
    "https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1682695795557-17447f921f79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  ];
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            setSelectedImage(parseInt(target.dataset.index || "0", 10));
          }
        });
      },
      { threshold: 0.5 }
    );

    element.childNodes.forEach((child, index) => {
      if (child instanceof HTMLElement) {
        child.dataset.index = index.toString();
        observer.observe(child);
      }
    });

    return () => observer.disconnect();
  }, []);
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMouseDown(true);
    const element = scrollContainerRef.current;
    if (!element) return;
    setStartX(e.pageX - element.offsetLeft);
    setScrollLeft(element.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const element = scrollContainerRef.current;
    if (!element) return;
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 3;
    element.scrollLeft = scrollLeft - walk;
  };

  const handleCircleClick = (index: number) => {
    setSelectedImage(index);
    const element = scrollContainerRef.current;
    if (!element) return;

    const containerWidth = element.clientWidth; // the full width of the container
    element.scrollLeft = index * containerWidth; // scroll to the exact position of the image
  };

  return (
    <div className="flex flex-col lg:flex-row p-3 rounded-lg bg-white">
      <div className="relative rounded-lg overflow-hidden lg:w-[15em]">
        <div
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={() => setIsMouseDown(false)}
          onMouseUp={() => setIsMouseDown(false)}
          onMouseMove={onMouseMove}
          className="img flex snap-x rounded-lg overflow-x-scroll snap-mandatory h-[16em] min-w-[10em] lg:h-[12em] noscrollwheel scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {images.map((image, index) => (
            <img
              key={index}
              className="min-w-full pointer-events-none select-none h-full object-cover rounded-lg snap-start"
              src={image}
              alt=""
            />
          ))}
        </div>
        <div className="absolute flex gap-2 z-20 bottom-4 left-1/2 transform -translate-x-1/2">
          {images.map((_, index) => (
            <div
              onClick={() => handleCircleClick(index)}
              key={index}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
                selectedImage === index ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:mt-0 mt-2 lg:flex-1 lg:ml-4">
        <div className="font-bold md:text-xl text-lg lg:text-2xl text-secondary-800 capitalize">
          Marjan Hotel
        </div>
        <div className="text-zinc-400 text-sm lg:text-lg line-clamp-2 capitalize">
          Experience comfort and convenience at Marjan Hotel.
        </div>
        <div className="mt-4 lg:mt-auto flex justify-between items-end">
          <div className="flex items-center gap-2 text-xs lg:text-md">
            <AiFillStar className="text-yellow-500" size={12} />
            <div className="font-bold">4.5</div>
            <div className="text-zinc-400">(24 reviews)</div>
          </div>

          <div className="flex flex-col items-end">
            <div className="font-bold text-lg lg:text-xl">
              $212
              <span className="text-sm font-normal lg:text-lg">/night</span>
            </div>

            <div className="text-zinc-400 text-xs leading-1 lg:text-md">
              $424 for 2 nights
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
