import { StoryFn } from "@storybook/react";
import ImageCard from "./ImageCard";

export default {
  title: "components/cards/ImageCard",
  component: ImageCard,
};

const Template: StoryFn<typeof ImageCard> = (args) => <ImageCard {...args} />;

export const Default: StoryFn<typeof ImageCard> = Template.bind({});
Default.args = {
  name: "paris",
  image:
    "https://images.unsplash.com/photo-1616480461419-8e1b5e1b5b1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  link: "/",
};
