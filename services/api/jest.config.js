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
      branches: 25,
      functions: 23,
      lines: 50,
      statements: 50,
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
