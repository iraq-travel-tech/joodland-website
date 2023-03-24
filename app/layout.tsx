import MainNavbar from "@/components/nav/MainNavbar";
import "@styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JooLand Travel",
  description:
    "Book flights effortlessly. Find the best deals from top airlines and book your next flight with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainNavbar />
        <div className="min-h-screen bg-zinc-100 pb-10 ">
          <div className="md:px-5 max-w-6xl mx-auto px-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
