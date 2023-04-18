import { StoryFn } from "@storybook/react";
import UiNewDropDown from "./UiNewDropDown";
import { useState } from "react";

export default {
  title: "UiNewDropDown",
  component: UiNewDropDown,
};

const Template: StoryFn<typeof UiNewDropDown> = (args) => {
  const [State, setState] = useState("1");
  return <UiNewDropDown {...args} State={State} setState={setState} />;
};
export const Default = Template.bind({});
Default.args = {
  options: [
    { value: "1", label: "Item 1" },
    { value: "2", label: "Item 2" },
  ],
};
