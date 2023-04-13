import { StoryFn } from "@storybook/react";
import EmailInput from "./EmailInput";
import { useState } from "react";

export default {
  title: "Forms/Inputs/EmailInput",
  component: EmailInput,
};

const Template: StoryFn<typeof EmailInput> = (args) => {
  const [Value, setValue] = useState("");

  return (
    <EmailInput
      {...args}
      value={Value}
      setValue={setValue}
      placeholder="your email"
      required
    />
  );
};
export const Default = Template.bind({});
Default.args = {};
