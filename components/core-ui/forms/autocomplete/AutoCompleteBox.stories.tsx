import { StoryFn } from "@storybook/react";
import AutoCompleteBox from "./AutoCompleteBox";

export default {
  title: "forms/autocomplete",
  component: AutoCompleteBox,
};

const Template: StoryFn<typeof AutoCompleteBox> = (args) => (
  <AutoCompleteBox {...args} />
);
export const Default = Template.bind({});
Default.args = {};
