"use client";
import TabList from "@components/blocks/tabs/TabList";
import { useState } from "react";

export default {
  title: "TabList",
  component: "TabList",
};

export const TabListStory = () => {
  const [State, setState] = useState("1");
  const items = [
    {
      name: "one",
      value: "1",
    },
    {
      name: "two",
      value: "2",
    },
  ];

  return <TabList State={State} setState={setState} items={items} />;
};
