"use client";
import DropDown from "@components/elements/dropdown/DropDown";
import { BsTranslate } from "react-icons/bs";
import Link from "next-intl/link";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

const SwitchLang = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const pathname = usePathname()?.replace("/en", "/");

  const searchparams = useSearchParams();

  return (
    <div className="relative z-50">
      <DropDown
        align="end"
        trigger={
          <button className={`flex gap-2 items-center ${className}`}>
            <BsTranslate size={20} />
            {children}
          </button>
        }
      >
        <div className="flex flex-col gap-2">
          {[
            { locale: "en", label: "english" },
            { locale: "ar", label: "arabic" },
          ].map((i, index) => (
            <Link
              replace
              key={index}
              href={`${pathname?.replace(
                "/en/",
                "/"
              )}?${searchparams?.toString()}`}
              locale={i.locale}
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
