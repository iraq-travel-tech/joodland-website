import { StoryFn } from "@storybook/react";
import FlightCard from "./FlightCard";

export default {
  title: "components/cards/FlightCard",
  component: FlightCard,
};

const Template: StoryFn<typeof FlightCard> = (args) => <FlightCard {...args} />;
export const Default = Template.bind({});
Default.args = {};
