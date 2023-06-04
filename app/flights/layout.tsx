import Button from "@components/elements/button/Button";
import FlightsNav from "@components/templates/nav/FlightsNav";
import { MdFilterListAlt } from "react-icons/md";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <FlightsNav />
      <div className="max-w-6xl pt-6 mx-auto px-4 sm:px-6 lg:px-8 flex md:flex-row flex-col md:gap-7 gap-3">
        <div className="md:w-[25em] md:bg-white md:shadow-lg transition-all md:p-3 h-max md:sticky top-28 left-0 md:rounded-lg ">
        </div>

        <div className="w-full">{children} </div>
      </div>
    </div>
  );
}
