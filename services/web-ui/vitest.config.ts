import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // mui-x-grid imports a CSS file which needs this
      // as it implictly turns on CSS transforms
      pool: "vmThreads",
      coverageThreshold: {
        global: {
          branches: 2,
          functions: 6,
          lines: 31,
          statements: 31,
        },
      },
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setupTests",
      include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    },
  }),
);
