import Select from "@components/elements/select/Select";
import { useState } from "react";

export default {
  title: "Elements/Select",
  component: Select,
};

export const Default = () => {
  const [Value, setValue] = useState("option1");
  return (
    <Select
      options={[
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ]}
      State={Value}
      setState={setValue}
    />
  );
};
Default.args = {};
