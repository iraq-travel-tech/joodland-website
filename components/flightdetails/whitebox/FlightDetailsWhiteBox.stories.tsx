import { StoryFn } from "@storybook/react";
import WhiteBoxTitle from "./FlightDetails-WhiteBox";

export default {
  title: "flightdetails/WhiteBoxTitle",
  component: WhiteBoxTitle,
};

const Template: StoryFn<typeof WhiteBoxTitle> = (args) => (
  <WhiteBoxTitle {...args} />
);
export const Default = Template.bind({});
Default.args = {
  title: "Flight Details",
};
