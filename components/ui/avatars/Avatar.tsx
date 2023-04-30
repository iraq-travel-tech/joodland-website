"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  name?: string;
  username?: string;
  img?: string;

  size?: "sm" | "lg";

  DropDownItems?: {
    name: string;
    icon?: React.ReactNode;
    link?: string;
  }[];
};

export default function Avatar(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger className="w-max">
          <div className="flex  gap-2 items-center">
            <div
              className={`
        bg-gray-200 rounded-full 

        ${props.size === "sm" && "w-8 h-8"}
        ${!props.size && "w-10 h-10"}
        ${props.size === "lg" && "w-16 h-16"}
        
        
        `}
            >
              {props.img && (
                <img
                  src={props.img}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>
            <div className="flex flex-col">
              <div className="font-bold capitalize">{props.name}</div>
              <div className="text-gray-500 text-xs">{props.username}</div>
            </div>
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content align="end" asChild>
          <DropdownMenu.Group asChild>
            <motion.div className="bg-white rounded text-black p-2">
              <DropdownMenu.Arrow className="fill-white" />
              {props.DropDownItems?.map((item, index) => (
                <DropdownMenu.Item
                  key={index}
                  onSelect={() => setOpen(false)}
                  asChild
                >
                  <Link
                    href={item.link ? item.link : "/"}
                    className="flex py-2 px-3 rounded hover:bg-zinc-100 focus:bg-zinc-100 text-xs items-center gap-2 transition-all"
                  >
                    {item.icon && item.icon}
                    {item.name}
                  </Link>
                </DropdownMenu.Item>
              ))}
            </motion.div>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
