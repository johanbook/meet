/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules", "src/api"],
};
