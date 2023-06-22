"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";

const HotelCard = ({
  hotelName,
  hotelDescription,
  pricePerNight,
  hotelId,
  images,
}: {
  hotelName: string;
  hotelDescription: string;
  pricePerNight: string;
  hotelId: string;
  images: string[];
}) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const searchparams = useSearchParams();
  const checkin = searchparams?.get("checkin") || "";
  const checkout = searchparams?.get("checkout") || "";

  function calculateDaysBetween(checkin: string, checkout: string) {
    // Parse the date strings into Date objects
    const checkinDate: any = new Date(checkin);
    const checkoutDate: any = new Date(checkout);

    // Calculate the difference in time
    const timeDifference = checkoutDate - checkinDate;

    // Convert the difference in time to a difference in days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference;
  }

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
    <div className="flex flex-col group lg:flex-row p-3 rounded-lg bg-white">
      <div className="relative rounded-lg overflow-hidden lg:w-[15em]">
        <div
          ref={scrollContainerRef}
          onMouseDown={onMouseDown}
          onMouseLeave={() => setIsMouseDown(false)}
          onMouseUp={() => setIsMouseDown(false)}
          onMouseMove={onMouseMove}
          className="img flex snap-x rounded-lg overflow-x-scroll snap-mandatory h-[16em] min-w-[10em] lg:h-[12em] noscrollwheel scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {images.map((image, index) => {
            if (image) {
              return (
                <img
                  key={index}
                  className="min-w-full pointer-events-none select-none h-full object-cover rounded-lg snap-start"
                  src={image}
                  alt={hotelName}
                />
              );
            }
          })}
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

      <Link
        href={`/hotels/hotel/${hotelId}`}
        className="flex  flex-col lg:mt-0 mt-2 lg:flex-1 lg:ms-4"
      >
        <div className="font-bold md:text-xl text-lg lg:text-2xl text-secondary-800  transition-all capitalize">
          {hotelName}
        </div>
        <div className="text-zinc-400  transition-all text-sm lg:text-lg line-clamp-2 capitalize">
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
              {t("pricePerNights", {
                count: calculateDaysBetween(checkin, checkout),
                price:
                  parseInt(pricePerNight) *
                  calculateDaysBetween(checkin, checkout),
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
