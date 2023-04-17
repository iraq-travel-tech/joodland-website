import Image from "next/image";
import Link from "next/link";
import React from "react";
type CardProps = {
  name: string;
  image: string;
  link: string;

  dictionary: any;
};
export default function ImageCard(props: CardProps) {
  return (
    <Link
      href={props.link}
      className="group active:scale-95 hover:scale-105 transition-all hover:shadow-xl flex flex-col text-white relative h-[15em]"
    >
      <Image
        src={props.image}
        className="brightness-50 z-10 absolute top-0 left-0 h-full w-full object-cover rounded-xl"
        alt={props.name + " image"}
        fill
      />
      <div className="flex flex-col absolute bottom-4 left-4 rtl:!right-5 z-20">
        <div className="group-hover:scale-105 group-hover:shadow-lg transition-all text-sm">
          {/* flights to */}
          {props.dictionary.home.flightsto}
        </div>
        <div className="group-hover:scale-105 group-hover:shadow-lg transition-all text-2xl font-bold capitalize">
          {props.name}
        </div>
      </div>
    </Link>
  );
}
