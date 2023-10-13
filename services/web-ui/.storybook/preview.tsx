import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import type { Preview } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";

export const decorators = [
  withRouter,
  (Story: ReactElement) => {
    const client = new QueryClient();

    return (
      <QueryClientProvider client={client}>
        <Story />
      </QueryClientProvider>
    );
  },
];

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
