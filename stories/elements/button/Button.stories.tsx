import Button from "@components/elements/button/Button";
import { StoryFn } from "@storybook/react";
import { FaPlus } from "react-icons/fa";

export default {
  title: "Elements/Button",
  component: Button,
};

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Def = Template.bind({});
Def.args = {
  children: "lorem",
  startIcon: <FaPlus />,
};
