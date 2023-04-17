import { StoryFn } from "@storybook/react";
import UiLink from "./UiLink";

export default {
  title: "ui/buttons/UiLink",
  component: UiLink,
};

const Template: StoryFn<typeof UiLink> = (args) => <UiLink {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: "UiLink",
};
