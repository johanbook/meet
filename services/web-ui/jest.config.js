/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: 2,
      functions: 6,
      lines: 31,
      statements: 31,
    },
  },
  coveragePathIgnorePatterns: ["node_modules", "src/api", "stories.tsx"],
  moduleDirectories: ["node_modules", __dirname],
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve("uuid"),
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/test/setupTests.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules"],
};
