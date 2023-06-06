import Button from "@components/elements/button/Button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen overflow-hidden bg-white w-screen flex items-center justify-center flex-col">
      <div className="w-[30em] h-[30em] relative">
        <img
          src={
            "https://png.pngtree.com/png-vector/20220511/ourmid/pngtree-error-404-page-not-found-png-image_4584737.png"
          }
          alt="404, page not found"
          className="w-full h-full object-cover"
        />
      </div>
      <Link href="/">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}
