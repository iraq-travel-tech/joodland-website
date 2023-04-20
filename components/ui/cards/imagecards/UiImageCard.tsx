import Image from "next/image";
import Link from "next/link";
import React from "react";
type CardProps = {
  name: string;
  image: string;
  link: string;

  dictionary: any;
};
export default function UiImageCard(props: CardProps) {
  return (
    <Link
      href={props.link}
      className="group active:scale-95 hover:scale-105 transition-all hover:shadow-xl flex flex-col text-white relative h-[15em]"
    >
      <Image
        src={props.image}
        className="absolute top-0 left-0 z-10 object-cover w-full h-full brightness-50 rounded-xl"
        alt={props.name + " image"}
        fill
      />
      <div className="flex flex-col absolute bottom-4 left-4 rtl:!right-5 z-20">
        <div className="text-sm transition-all group-hover:scale-105 group-hover:shadow-lg">
          {/* flights to */}
          {props.dictionary.home.flightsto}
        </div>
        <div className="text-2xl font-bold capitalize transition-all group-hover:scale-105 group-hover:shadow-lg">
          {props.name}
        </div>
      </div>
    </Link>
  );
}
