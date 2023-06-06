import HomeSearchContainer from "@components/templates/home/HomeSearchContainer";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function page({ params }: { params: { locale: string } }) {
  const t = useTranslations("Home");

  const HomeCardsContent = [
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 1024 1024"
          className="text-2xl text-orange-700"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm144 452H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm445.7 51.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176 78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31a7.9 7.9 0 0 0 0-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
        </svg>
      ),
      title: t("offers.search.title"),
      description: t("offers.search.subTitle"),
    },
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          className="text-2xl text-orange-700"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
          ></path>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
        </svg>
      ),
      title: t("offers.book.title"),
      description: t("offers.book.subTitle"),
    },
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="text-2xl text-orange-700"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M21 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.062A8.001 8.001 0 0 1 12 23v-2a6 6 0 0 0 6-6V9A6 6 0 1 0 6 9v7H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.062a8.001 8.001 0 0 1 15.876 0H21zM7.76 15.785l1.06-1.696A5.972 5.972 0 0 0 12 15a5.972 5.972 0 0 0 3.18-.911l1.06 1.696A7.963 7.963 0 0 1 12 17a7.963 7.963 0 0 1-4.24-1.215z"></path>
          </g>
        </svg>
      ),
      title: t("offers.support.title"),
      description: t("offers.support.subTitle"),
    },
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="text-2xl text-orange-700"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
          ></path>
        </svg>
      ),
      title: t("offers.alerts.title"),
      description: t("offers.alerts.subTitle"),
    },
  ];

  const allTexts = {
    switchTexts: {
      direction: {
        oneway: t("switchTexts.direction.oneway"),
        round: t("switchTexts.direction.round"),
      },
      class: {
        economy: t("switchTexts.class.economy"),
        business: t("switchTexts.class.business"),
      },
    },
    passengers: {
      name: t("passengers.name"),
      adults: {
        title: t("passengers.adults.title"),
        subTitle: t("passengers.adults.subTitle"),
      },
      children: {
        title: t("passengers.children.title"),
        subTitle: t("passengers.children.subTitle"),
      },
      babies: {
        title: t("passengers.babies.title"),
        subTitle: t("passengers.babies.subTitle"),
      },
    },
    btns: {
      done: t("btns.done"),
      search: t("btns.search"),
    },
    from: t("from"),
    to: t("to"),
    months: {
      january: t("months.january"),
      february: t("months.february"),
      march: t("months.march"),
      april: t("months.april"),
      may: t("months.may"),
      june: t("months.june"),
      july: t("months.july"),
      august: t("months.august"),
      september: t("months.september"),
      october: t("months.october"),
      november: t("months.november"),
      december: t("months.december"),
    },
    DepartureDate: t("DepartureDate"),
    ReturnDate: t("ReturnDate"),
  };

  return (
    <div dir={params.locale === "ar" ? "rtl" : "ltr"} className="pb-6">
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
            {t("heroTitle")}
          </div>
          <div className="sm:text-xl mt-2">{t("heroBody")}</div>
        </div>
        <HomeSearchContainer allTexts={allTexts} />

        <div className="mt-14">
          <div className="font-bold text-2xl text-secondary-900">
            {t("offers.title")}
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
