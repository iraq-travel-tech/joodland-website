"use client";
import { motion } from "framer-motion";

export default function TabsList({
  State,
  setState,
  items,
  className,
}: {
  items: {
    name: string;
    value: string;
  }[];
  State: string;
  setState: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {items.map((i) => (
        <TabItem key={i.value} item={i} setState={setState} State={State} />
      ))}
    </div>
  );
}

const TabItem = ({
  item,
  setState,
  State,
}: {
  item: {
    name: string;
    value: string;
  };
  setState: (value: string) => void;
  State: string;
}) => {
  return (
    <div
      onClick={() => setState(item.value)}
      className={`text-zinc-400 relative font-semibold cursor-pointer hover:bg-gray-100 transition-all
      ${State === item.value && "!text-black"}`}
    >
      <p className="px-6 py-2">{item.name}</p>
      {State === item.value && (
        <motion.div
          layoutId="konrepitbiibhqernou2ihb"
          className="absolute bottom-0 w-full border-black border-b"
        ></motion.div>
      )}
    </div>
  );
};
