import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setupTests",
      include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    },
  }),
);
