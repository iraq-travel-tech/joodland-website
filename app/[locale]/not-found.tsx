import Button from "@components/elements/button/Button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-white">
      <div className="w-[30em] h-[30em] relative">
        <img
          src={
            "https://png.pngtree.com/png-vector/20220511/ourmid/pngtree-error-404-page-not-found-png-image_4584737.png"
          }
          alt="404, page not found"
          className="object-cover w-full h-full"
        />
      </div>
      <Link href="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}
