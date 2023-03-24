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
      <body>{children}</body>
    </html>
  );
}
