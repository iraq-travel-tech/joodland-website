import Button from "@components/elements/button/Button";
import FlightsNav from "@components/templates/nav/FlightsNav";
import Link from "next/link";
import { GoChevronLeft } from "react-icons/go";
import { MdFilterListAlt } from "react-icons/md";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <FlightsNav />

      <div className="max-w-6xl pt-6 mx-auto px-4 sm:px-6 lg:px-8 flex md:flex-row flex-col md:gap-7 gap-3">
        <div className="md:w-[25em] md:bg-white md:shadow-lg transition-all md:p-3 h-max sticky md:block hidden  top-28 left-0 md:rounded-lg ">
          <div className="flex flex-col gap-1">
            <button className="capitalize py-2 px-3 rounded hover:bg-gray-100">
              non stop
            </button>
          </div>
        </div>

        <div className="w-full">
          <Link className="md:flex hidden" href="/">
            <Button bg={"ghost"} startIcon={<GoChevronLeft />}>
              Go Back
            </Button>
          </Link>
          {children}{" "}
        </div>
      </div>
    </div>
  );
}
