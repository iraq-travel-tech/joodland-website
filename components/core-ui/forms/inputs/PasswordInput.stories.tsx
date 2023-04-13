import React, { useState } from "react";
import { StoryFn } from "@storybook/react";
import PasswordInput from "./PasswordInput";

export default {
  title: "Forms/Inputs/PasswordInput",
  component: PasswordInput,
};

const Template: StoryFn<typeof PasswordInput> = (args) => {
  const [Value, setValue] = useState("");

  return (
    <PasswordInput
      {...args}
      value={Value}
      setValue={setValue}
      placeholder="your password"
      required
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
