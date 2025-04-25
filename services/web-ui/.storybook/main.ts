import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-react-router",
  ],
  framework: "@storybook/react-vite",
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;
