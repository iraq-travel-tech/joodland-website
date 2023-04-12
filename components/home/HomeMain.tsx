"use client";
import dynamic from "next/dynamic";
import { BiStar } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./core/SearchBox";
import OfferCard from "../core-ui/cards/offercards/OfferCard";
import ImageCard from "../core-ui/cards/imagecards/ImageCard";

const offers = [
  {
    serviceTitle: "search for flights",
    serviceDescription:
      "we can provide a search engine that allows customers to find flights to their desired destination.",
    icon: BiStar,
  },
  {
    serviceTitle: "book flights online or offline",
    serviceDescription:
      "we help customers to book flights directly through our website with our e-payment system.",
    icon: BiStar,
  },
  {
    serviceTitle: "Customer support",
    serviceDescription:
      "we provide customer support to assist customers with any issues or questions they may have before, during, or after their trip.",
    icon: BiStar,
  },
  {
    serviceTitle: "Flight alerts",
    serviceDescription:
      "our website can provide alerts for flight changes or delays, ensuring customers are up-to-date on their flight status.",
    icon: BiStar,
  },
];

const places = [
  {
    name: "istanbul",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXN0YW5idWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "cairo",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fpcm98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "tahran",
    link: "/",
    image:
      "https://media.istockphoto.com/id/157435266/photo/view-on-city-of-tehran-iran.jpg?b=1&s=170667a&w=0&k=20&c=hFC8awYNU13c6y358bAmQ01YTZgFh5Qh5Mgk_1T1CgY=",
  },
  {
    name: "beirut",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1496823407868-80f47c7453b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVpcnV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

export default function HomeMain() {
  return (
    <div>
      <div className="absolute top-0 left-0 h-[21em] bg-orange-700 w-full"></div>
      <SearchBox showtexts />
      <div className="flex flex-col sm:mt-16 mt-12">
        <div className="text-2xl font-bold capitalize">
          what jooLand offers for you
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 mt-8">
          {offers.map((service) => (
            <OfferCard
              key={service.serviceTitle}
              title={service.serviceTitle}
              description={service.serviceDescription}
              icon={<service.icon />}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="text-2xl font-bold capitalize">
          book flights anywhere in the world{" "}
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-8">
          {places.map((place) => (
            <ImageCard
              key={place.name}
              name={place.name}
              link={place.link}
              image={place.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
