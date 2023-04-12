import { StoryFn } from "@storybook/react";
import SearchFlightsInput from "./SearchFlightsInput";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";

export default {
  title: "forms/searchinput",
  component: SearchFlightsInput,
};

const Template: StoryFn<typeof SearchFlightsInput> = (args) => {
  return <SearchFlightsInput {...args} />;
};
export const From = Template.bind({});

From.args = {
  placeholder: "going from",
  startIcon: <BiSearch />,
};

export const To = Template.bind({});
To.args = {
  placeholder: "going to",
  startIcon: <BiSearch />,
};
