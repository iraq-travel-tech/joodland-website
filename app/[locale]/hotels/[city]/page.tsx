"use client";
import { AiFillStar } from "react-icons/ai";
import React, { useState, useEffect, useRef } from "react";

export default function page({
  params,
}: {
  params: {
    city: string;
  };
}) {
  return (
    <div className="pt-10">
      <div className="font-semibold text-zinc-400">200+ hotels</div>
      <div className="text-3xl font-bold capitalize">hotels in kirkuk</div>

      <hr className="my-2" />

      <div className="flex flex-col gap-4">
        <HotelCard />
        <HotelCard />
        <HotelCard />
        <HotelCard />
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
    <div className="flex sm:flex-row flex-col gap-4 p-3 rounded-lg bg-white">
      <div className="relative rounded-lg overflow-hidden ">
        <div
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={() => setIsMouseDown(false)}
          onMouseUp={() => setIsMouseDown(false)}
          onMouseMove={onMouseMove}
          className="img flex snap-x rounded-lg overflow-x-scroll snap-mandatory sm:h-[14em] h-[14em] min-w-[10em] noscrollwheel scroll-smooth cursor-grab active:cursor-grabbing"
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
        <div className="absolute flex gap-2 z-20 bottom-8 left-1/2 transform -translate-x-1/2">
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

      <div className="flex flex-col">
        <div className="text-zinc-400 text-sm leading-1">
          hotel in kirkuk, iraq
        </div>
        <div className="font-bold capitalize text-2xl text-secondary-800">
          Marjan Hotel
        </div>
        <div className="text-zinc-400 text-sm sm:text-base">
          Experience comfort and convenience at Marjan Hotel. Enjoy modern
          amenities, friendly service, and a prime location for an unforgettable
          stay.
        </div>
        <div className="mt-auto flex justify-between items-end">
          <div className="flex items-center gap-2 text-xs">
            <AiFillStar className="text-yellow-500" size={12} />
            <div className="font-bold">4.5</div>
            <div className="text-zinc-400">(24 reviews)</div>
          </div>

          <div className="flex flex-col items-end">
            <div className="font-bold text-lg">
              $212
              <span className="text-sm font-normal">/night</span>
            </div>

            <div className="text-zinc-400 text-xs leading-1">
              $424 for 2 nights
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
