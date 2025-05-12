import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        branches: 27,
        functions: 25,
        lines: 46,
        statements: 45,
      },
    },
    exclude: [
      // Incorrectly configured modules should be detected
      ".module.ts",
      // Index files only contains imports/re-exports which should be caught in linting
      "index.ts",
      // Redundant to create tests for CLI tools
      "/cli/",
      // Redundant to create tests for factories
      "/factories/",
      // Redundant to create tests for migrations
      "/migrations/",
      // Should always be ignored
      "/node_modules/",
      // Redundant to create tests for seeds
      "/seeds/",
      // No need to test testing tools
      "/test/",
    ],
    globals: true,
    setupFiles: "./src/test/setup-tests",
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
