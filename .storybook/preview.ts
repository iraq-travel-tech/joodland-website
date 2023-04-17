import type { Preview } from "@storybook/react";
import "../styles/globals.css";
// import "../styles/daterange.css";

// test
import "react-dates/lib/css/_datepicker.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
