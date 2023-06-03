import TextInput from "@components/elements/textinput/TextInput";
import { StoryFn } from "@storybook/react";
import { useState } from "react";
export default {
  title: "Elements/TextInput",
  component: TextInput,
};

const Template: StoryFn<typeof TextInput> = (args) => {
  const [state, setState] = useState("");
  return (
    <TextInput
      value={state}
      onChange={setState}
      placeholder="Enter your name"
      // startIcon={<span>👋</span>}
      endIcon={<span>👋</span>}
    />
  );
};
export const Default = Template.bind({});
Default.args = {};
