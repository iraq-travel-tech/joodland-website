import HomeSearchContainer from "@components/templates/home/HomeSearchContainer";
import { HomeCardsContent } from "@lib/content/homeText";
import Image from "next/image";

export default function page() {
  return (
    <div className="pb-6">
      <div className="absolute top-0 left-0 sm:h-[45vh] h-[40vh] w-full">
        <Image
          src="/images/sunset-bg.jpg"
          alt="hero image of plane flying over sunset"
          className="w-full h-full object-cover pointer-events-none select-none"
          fill
          priority
        />
      </div>

      <div className=" mt-20 relative">
        <div className="flex z-10 sm:font-medium font-bold text-white flex-col ">
          <div className="sm:text-4xl text-2xl font-bold capitalize">
            Where are you flying?
          </div>
          <div className="sm:text-xl mt-2">
            Find Your Flights and Book Them with Ease with Jooland.
          </div>
        </div>
        <HomeSearchContainer />

        <div className="mt-14">
          <div className="font-bold text-2xl text-secondary-900">
            What Jooland Offers For You?
          </div>
          <div className="grid grid-cols-1 mt-6 gap-3 lg:grid-cols-4 md:grid-cols-2">
            {HomeCardsContent.map((card, index) => (
              <article
                key={index}
                className="flex flex-col p-3 transition-all bg-white border-2 rounded-lg shadow-none border-zinc-200 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-10 h-10 text-primary-700 rounded bg-primary-100">
                  {card.icon}
                </div>
                <h1 className="mt-3 font-bold capitalize text-secondary-900">
                  {card.title}
                </h1>
                <p className="mt-1 text-sm">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
