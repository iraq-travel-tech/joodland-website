import { StoryFn } from "@storybook/react";
import UiOfferCard from "./UiOfferCard";
import { BiStar } from "react-icons/bi";

export default {
  title: "components/cards/UiOfferCard",
  component: UiOfferCard,
};

const Template: StoryFn<typeof UiOfferCard> = (args) => (
  <UiOfferCard {...args} />
);
export const Default = Template.bind({});
Default.args = {
  title: "search for flights",
  description:
    "we can provide a search engine that allows customers to find flights to their desired destination.",
  icon: <BiStar />,
};
