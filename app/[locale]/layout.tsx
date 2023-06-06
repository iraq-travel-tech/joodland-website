import ClientLayout from "@components/templates/layout/ClientLayout";
import MainLayout from "@components/templates/layout/MainLayout";
import "@styles/globals.css";
import { useLocale } from "next-intl";

import { notFound } from "next/navigation";

import { NextIntlClientProvider } from "next-intl";

// export function generateStaticParams() {
//   return [{ locale: "en" }, { locale: "ar" }];
// }

import { Cairo } from "next/font/google";

const cairo = Cairo({
  variable: "--cairo",
  style: "normal",
  subsets: ["latin", "latin-ext"],
});

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
