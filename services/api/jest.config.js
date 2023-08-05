/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: [
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
  coverageThreshold: {
    global: {
      branches: 29,
      functions: 25,
      lines: 46,
      statements: 46,
    },
  },
  moduleFileExtensions: ["js", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  moduleDirectories: ["node_modules", __dirname],
  setupFilesAfterEnv: ["<rootDir>/test/setup-tests.ts"],
  testEnvironment: "node",
};
