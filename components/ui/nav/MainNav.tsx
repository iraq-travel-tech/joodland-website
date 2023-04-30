"use client";

import { BiMenu } from "react-icons/bi";
import UiButton from "../buttons/UiButton";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Avatar from "../avatars/Avatar";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function MainNav() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="sticky z-50 top-0 left-0">
      <nav className="flex justify-between items-center bg-blue-600  text-white py-3 px-4">
        <div className="font-bold text-xl">Posts</div>

        <div className="flex items-center ">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton redirectUrl="/">Sign in</SignInButton>
          </SignedOut>

          <UiButton
            variant="ghost"
            className="!text-white"
            icon={
              !showMenu ? (
                <BiMenu className="text-white" />
              ) : (
                <IoMdClose className="text-white" />
              )
            }
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </nav>
    </header>
  );
}
