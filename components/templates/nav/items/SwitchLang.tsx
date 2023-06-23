"use client";
import DropDown from "@components/elements/dropdown/DropDown";
import Link from "next-intl/link";
import { useParams } from "next/navigation";
import { BsTranslate } from "react-icons/bs";

const SwitchLang = ({ RedirectTo }: { RedirectTo: string }) => {
  const params = useParams() as { locale: "ar" | "en" };
  const currentLocale = params.locale;

  return (
    <div className="relative z-50">
      <DropDown
        align="end"
        trigger={
          <button className="flex gap-2 items-center">
            <BsTranslate size={20} />
          </button>
        }
      >
        <div className="flex flex-col gap-2">
          {[
            { locale: "en", label: "english" },
            { locale: "ar", label: "arabic" },
          ].map((i, index) => (
            <Link
              locale={currentLocale === "ar" ? "en" : "ar"}
              href={RedirectTo}
              key={index}
            >
              {i.label}
            </Link>
          ))}
        </div>
      </DropDown>
    </div>
  );
};

export default SwitchLang;
