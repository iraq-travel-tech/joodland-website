import { StoryFn } from "@storybook/react";
import OfferCard from "./OfferCard";
import { BiStar } from "react-icons/bi";

export default {
  title: "components/cards/OfferCard",
  component: OfferCard,
};

const Template: StoryFn<typeof OfferCard> = (args) => <OfferCard {...args} />;
export const Default = Template.bind({});
Default.args = {
  title: "search for flights",
  description:
    "we can provide a search engine that allows customers to find flights to their desired destination.",
  icon: <BiStar />,
};
