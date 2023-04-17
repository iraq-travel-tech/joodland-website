import { StoryFn } from "@storybook/react";
import UiFlightCard from "./UiFlightCard";

export default {
  title: "components/cards/UiFlightCard",
  component: UiFlightCard,
};

const Template: StoryFn<typeof UiFlightCard> = (args) => (
  <UiFlightCard {...args} />
);
export const Default = Template.bind({});
Default.args = {};
