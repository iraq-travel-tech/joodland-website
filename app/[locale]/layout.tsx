import ClientLayout from "@components/templates/layout/ClientLayout";
import MainLayout from "@components/templates/layout/MainLayout";
import "@styles/globals.css";
import { useLocale } from "next-intl";

import { notFound } from "next/navigation";

import { NextIntlClientProvider } from "next-intl";

import { Cairo } from "next/font/google";
import { Metadata } from "next";

const cairo = Cairo({
  variable: "--cairo",
  style: "normal",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "JoodLand",
  description:
    "Experience the ultimate convenience in travel planning with Joodland's comprehensive platform. Seamlessly explore, effortlessly book, and confidently secure your flights and hotels, all in one place.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();
  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html className={cairo.className} lang={locale}>
      <body className="bg-gray-100">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>
            <MainLayout>{children}</MainLayout>
          </ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
