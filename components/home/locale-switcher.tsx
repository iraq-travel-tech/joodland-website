"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/i18n-config";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const router = pathName.split("/")[1];
  const [OpenSelect, setOpenSelect] = useState(false);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div>
      <div className="flex flex-col relative md:text-sm text-xl gap-2 rounded">
        <button
          onClick={() => setOpenSelect(!OpenSelect)}
          onBlur={() => {
            setTimeout(() => {
              setOpenSelect(false);
            }, 300);
          }}
          className="rounded md:w-max w-full md:text-center text-left py-2 hover:bg-orange-500 md:ml-3 px-4 transition-all"
        >
          {router === "en" ? "English" : "عربي"}
        </button>
        <AnimatePresence>
          {OpenSelect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex p-2 flex-col md:absolute -bottom-[5.3em] right-0 md:bg-white bg-orange-600 shadow-xl rounded md:text-black"
            >
              {i18n.locales.map((locale) => {
                return (
                  <Link
                    href={redirectedPathName(locale)}
                    className={`px-7 md:hover:bg-zinc-300 rounded py-1 transition-all
                      ${locale === router && "md:bg-zinc-200 bg-orange-500"}
                      `}
                    key={locale}
                  >
                    {locale}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
