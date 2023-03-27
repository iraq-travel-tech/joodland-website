import FlightBox from "@/components/home/core/FlightBox";
import SearchBox from "@/components/home/core/SearchBox";
import { SearchParamsProps } from "@/interfces/SearchParamsProps";

type PageProps = {
  searchParams: SearchParamsProps;
};
export default function page({ searchParams }: PageProps) {
  return (
    <div>
      {/* <SearchBox /> */}

      <div className="flex flex-col pt-10">
        <div className="text-2xl font-bold">Best departing flights</div>
        <div className="text-zinc-600">
          Ranked based on price and convenience
        </div>
      </div>
      <div className="flex py-4 flex-col">
        <FlightBox />
      </div>
    </div>
  );
}
