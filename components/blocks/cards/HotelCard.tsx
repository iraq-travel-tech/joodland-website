"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const HotelCard = ({
  hotelName,
  hotelDescription,
  pricePerNight,
}: {
  hotelName: string;
  hotelDescription: string;
  pricePerNight: string;
}) => {
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
  const t = useTranslations("hotels");

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

      <div className="flex flex-col lg:mt-0 mt-2 lg:flex-1 lg:ms-4">
        <div className="font-bold md:text-xl text-lg lg:text-2xl text-secondary-800 capitalize">
          {hotelName}
        </div>
        <div className="text-zinc-400 text-sm lg:text-lg line-clamp-2 capitalize">
          {hotelDescription}{" "}
        </div>
        <div className="mt-4 lg:mt-auto flex justify-between items-end">
          <div className="flex items-center gap-2 text-xs lg:text-md">
            <AiFillStar className="text-yellow-500" size={12} />
            <div className="font-bold">4.5</div>
            <div className="text-zinc-400">(24 {t("reviews")})</div>
          </div>

          <div className="flex flex-col items-end">
            <div className="font-bold text-lg lg:text-xl">
              ${pricePerNight}{" "}
              <span className="text-sm font-normal lg:text-lg">
                {t("perNight")}
              </span>
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

export default HotelCard;
