import { StoryFn } from "@storybook/react";
import SimpleDropDown from "./DropDown";

export default {
  title: "components/dropdown/SimpleDropDown",
  component: SimpleDropDown,
};

const Template: StoryFn<typeof SimpleDropDown> = (args) => (
  <SimpleDropDown {...args} />
);
export const Default = Template.bind({});

Default.args = {
  StateValue: "Select",
  setStateValue: () => {},
  options: ["Option 1", "Option 2", "Option 3"],
};
