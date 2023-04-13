import { StoryFn } from "@storybook/react";
import FlightDetailsCard from "./FlightDetailsCard";

export default {
  title: "components/cards/FlightDetailsCard",
  component: FlightDetailsCard,
};

const Template: StoryFn<typeof FlightDetailsCard> = (args) => (
  <FlightDetailsCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  // title: "Flight Details",
};
