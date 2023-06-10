"use client";
import React, { useState } from "react";

import WheelPicker from "@components/elements/wheel/WheelPicker";
import Dialog from "@components/elements/dialog/Dialog";

export default {
  title: "WheelPicker",
  component: WheelPicker,
};

export const Main = () => {
  const [open, setOpen] = useState(false);
  const [SelectedNumber, setSelectedNumber] = useState(0);
  const numbers = Array.from(Array(10).keys());

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open</button>
      <Dialog open={open} setOpen={setOpen}>
        <div className="h-[10em] overflow-scroll">
          <WheelPicker
            State={SelectedNumber}
            list={numbers}
            setState={setSelectedNumber}
          />
        </div>
      </Dialog>
    </div>
  );
};
