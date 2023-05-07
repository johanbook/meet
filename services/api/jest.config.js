/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageThreshold: {
    global: {
      branches: 30,
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
  coverageDirectory: "../coverage",
  moduleDirectories: ["node_modules", __dirname],
  setupFilesAfterEnv: ["<rootDir>/test/setup-tests.ts"],
  testEnvironment: "node",
};
