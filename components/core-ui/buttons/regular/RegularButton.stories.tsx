import { StoryFn } from "@storybook/react";
import RegularButton from "./RegularButton";
import { RiArrowDropDownFill } from "react-icons/ri";

export default {
  title: "components/buttons/regular",
  component: RegularButton,
};

const Template: StoryFn<typeof RegularButton> = (args) => (
  <RegularButton {...args} />
);

export const Orange = Template.bind({});
Orange.args = {
  children: "Orange",
  size: "md",
  bg: "orange",
};

export const White = Template.bind({});
White.args = {
  children: "White",
  size: "md",
  bg: "white",
  endIcon: <RiArrowDropDownFill size={30} />,
};
