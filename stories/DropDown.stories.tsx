import Button from "@components/elements/button/Button";
import DropDown from "@components/elements/dropdown/DropDown";
import { useState } from "react";

export default {
  title: "Elements/DropDown",
  component: DropDown,
};

export const Default = () => {
  const [State, setState] = useState("");
  return (
    <DropDown trigger={<Button>opened</Button>}>
      <div className="w-[20em]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
        voluptates labore iste neque! Fuga placeat repellat provident ab quidem,
        culpa dolorum aliquid veritatis, cum quis labore est assumenda et quas.
      </div>
    </DropDown>
  );
};
