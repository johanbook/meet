/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/infrastructure/database/factories/",
    "/infrastructure/database/migrations/",
    "/infrastructure/database/seeds/",
  ],
  coverageThreshold: {
    global: {
      branches: 24,
      functions: 19,
      lines: 43,
      statements: 43,
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
