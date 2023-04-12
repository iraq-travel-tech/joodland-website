import { StoryFn } from "@storybook/react";
import OrangeButtonLink from "./OrangeButtonLink";
import { AiFillHome } from "react-icons/ai";

export default {
  title: "components/links/buttonlink",
  component: OrangeButtonLink,
};

const Template: StoryFn<typeof OrangeButtonLink> = (args) => (
  <OrangeButtonLink {...args} />
);

export const Orange = Template.bind({});
Orange.args = {
  children: "Orange",
  size: "md",

  startIcon: <AiFillHome />,
};
