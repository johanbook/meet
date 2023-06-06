import type { Preview } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

export const decorators = [withRouter];

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
