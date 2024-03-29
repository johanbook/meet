/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageThreshold: {
    global: {
      branches: 2,
      functions: 6,
      lines: 22,
      statements: 25,
    },
  },
  moduleDirectories: ["node_modules", __dirname],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules"],
};
