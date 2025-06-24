import { ReactElement } from "react";

import type { Preview } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "../src/core/theme";

export const decorators = [
  (Story: ReactElement) => {
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
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
