import { StoryFn } from "@storybook/react";
import OrangeButton from "./OrangeButton";

export default {
  title: "components/buttons/regular",
  component: OrangeButton,


};

const Template: StoryFn<typeof OrangeButton> = (args) => (
  <OrangeButton {...args} />
);

export const Orange = Template.bind({});
Orange.args = {
  children: "Orange",
  size: "md",
};
