import { BiStar } from "react-icons/bi";
import SearchBox from "./core/SearchBox";
import { LocaleInterface } from "@/dictionaries/LocaleInterface";
import UiOfferCard from "../ui/cards/offercards/UiOfferCard";
import UiImageCard from "../ui/cards/imagecards/UiImageCard";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { HiOutlineBellAlert } from "react-icons/hi2";

const icons = [
  <AiOutlineFileSearch className="text-2xl text-orange-700" />,
  <BsBookmarkCheck className="text-2xl text-orange-700" />,
  <RiCustomerService2Fill className="text-2xl text-orange-700" />,
  <HiOutlineBellAlert className="text-2xl text-orange-700" />,
];

type PageProps = {
  dictionary: LocaleInterface;
  lang: string;
};

export default function HomeMain(props: PageProps) {
  return (
    <div>
      <div className="absolute top-0 left-0 h-[21em] bg-orange-700 w-full"></div>
      <SearchBox dictionary={props.dictionary} showtexts lang={props.lang} />
      <div className="flex flex-col mt-12 sm:mt-16">
        <div className="text-2xl font-bold capitalize">
          {props.dictionary.home.whatoffers}
        </div>

        <div className="grid grid-cols-1 gap-3 mt-8 lg:grid-cols-4 md:grid-cols-2">
          {props.dictionary.home.offers.map((service, index) => (
            <UiOfferCard
              key={service.title + index}
              title={service.title}
              description={service.description}
              icon={icons[index]}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <div className="text-2xl font-bold capitalize">
          {props.dictionary.home.bookflights}
        </div>

        <div className="grid grid-cols-1 gap-3 mt-8 lg:grid-cols-4 sm:grid-cols-2">
          {props.dictionary.home.bookflightscards.map((place, index) => (
            <UiImageCard
              dictionary={props.dictionary}
              key={place + index}
              name={place}
              link={place}
              image={
                "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aXN0YW5idWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
              }
              sizes="(max-width: 615px) 90vw, (max-width: 1400px) 60vw"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
