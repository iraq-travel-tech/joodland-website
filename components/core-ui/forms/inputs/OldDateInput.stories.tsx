import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import OldDateInput from "./OldDateInput";

export default {
  title: "Forms/Inputs/OldDateInput",
  component: OldDateInput,
} as Meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState("");

  return (
    <OldDateInput
      {...args}
      value={value}
      setValue={setValue}
      placeholder="date"
      required
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
