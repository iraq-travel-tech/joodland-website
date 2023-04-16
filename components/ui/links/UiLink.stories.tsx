import { StoryFn } from "@storybook/react";
import UiLink from "./UiLink";

export default {
  title: "ui/links/UiLink",
  component: UiLink,
};

const Template: StoryFn<typeof UiLink> = (args) => <UiLink {...args} />;
export const Primary = Template.bind({});
Primary.args = {};

export const White = Template.bind({});
White.args = {
  children: "White",
  variant: "white",
  startIcon: (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 1024 1024"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
    </svg>
  ),
};
