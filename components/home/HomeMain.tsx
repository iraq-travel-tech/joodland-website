"use client";
import dynamic from "next/dynamic";
import { BiStar } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./core/SearchBox";

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
          {[
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
          ].map((service) => (
            <article
              key={service.serviceTitle}
              className="border-2 border-zinc-200 p-3 flex flex-col rounded hover:scale-105  hover:shadow-xl shadow-none transition-all"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded text-orange-600 bg-orange-600/40">
                <service.icon />
              </div>

              <h1 className="font-bold capitalize mt-3">
                {service.serviceTitle}
              </h1>

              <p className="text-sm mt-1">{service.serviceDescription} </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="text-2xl font-bold capitalize">
          book flights anywhere in the world{" "}
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mt-8">
          {[
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
          ].map((place) => (
            <Link
              href={place.link}
              key={place.name}
              className="group active:scale-95 hover:scale-105 transition-all hover:shadow-xl flex flex-col text-white relative h-[15em]"
            >
              <Image
                src={place.image}
                className="brightness-50 z-10 absolute top-0 left-0 h-full w-full object-cover rounded-xl"
                alt={(place.name = " image")}
                fill
              />
              <div className="flex flex-col absolute bottom-4 left-4 z-20">
                <div className="group-hover:scale-105 group-hover:shadow-lg transition-all text-sm">
                  flights to
                </div>
                <div className="group-hover:scale-105 group-hover:shadow-lg transition-all text-2xl font-bold capitalize">
                  {place.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
