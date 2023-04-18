import MainNavbar from "@/components/ui/navbar/MainNavbar/MainNavbar";
import "@styles/globals.css";
import { Metadata } from "next";
import { i18n } from "../../i18n-config";
import { getDictionary } from "@/get-dictionary";

import { Cairo } from "@next/font/google";

const cairo = Cairo({
  variable: "--cairo",
  style: "normal",
  subsets: ["latin", "latin-ext"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "JoodLand Travel",
  description:
    "Book flights effortlessly. Find the best deals from top airlines and book your next flight with ease.",
  keywords: ["book flights", "travel", "flight tickets"],
  // twitter: {
  //   card: "summary",
  //   title: "JoodLand Travel",

  //   description:
  //     "Book flights effortlessly. Find the best deals from top airlines and book your next flight with ease.",
  // },
  openGraph: {
    title: "JoodLand Travel",
    description:
      "Book flights effortlessly. Find the best deals from top airlines and book your next flight with ease.",
    images: ["/images/metadata_bg.jpg"],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary: any = await getDictionary(params.lang as "en" | "ar");
  return (
    <html
      className={cairo.className}
      lang={params.lang}
      dir={params.lang === "ar" ? "rtl" : "ltr"}
    >
      <body>
        <MainNavbar dictionary={dictionary} />
        <div className="min-h-screen bg-zinc-100 pb-10 ">
          <div className="px-5 max-w-6xl mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
