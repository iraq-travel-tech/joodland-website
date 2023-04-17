import { StoryFn } from "@storybook/react";
import UiDropDown from "./UiDropDown";

export default {
  title: "ui/dropdowns/UiDropDown",
  component: UiDropDown,
};

const Template: StoryFn<typeof UiDropDown> = (args) => <UiDropDown {...args} />;
export const Default = Template.bind({});
Default.args = {
  StateValue: "Select",
  setStateValue: () => {},
  options: ["Option 1", "Option 2", "Option 3"],
  className: "",
};
