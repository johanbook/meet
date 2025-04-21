/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  moduleDirectories: ["node_modules", __dirname],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["node_modules"],
};
