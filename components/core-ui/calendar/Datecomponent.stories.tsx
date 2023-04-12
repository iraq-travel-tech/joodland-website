import { StoryFn } from "@storybook/react";
import Datecomponent from "./Datecomponent";

export default {
  title: "components/calendar",
  component: Datecomponent,
};

const Template: StoryFn<typeof Datecomponent> = (args) => {
  return <Datecomponent {...args} />;
};

export const DateComponent = Template.bind({});
DateComponent.args = {
  SelectedType: "one way trip",
  setOneWayStartDate: () => {},
  setTwoWaysTripDate: () => {},
  setShowDatePicker: () => {},
  ShowDatePicker: true,
};
