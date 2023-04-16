import { StoryFn } from "@storybook/react";
import UiDateButton from "./UiDateButton";

export default {
  title: "ui/buttons/DateButton",
  component: UiDateButton,
};

const Template: StoryFn<typeof UiDateButton> = (args) => <UiDateButton {...args} />;
export const OneWay = Template.bind({});
OneWay.args = {
  isRange: true,
};
