/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
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
  setupFilesAfterEnv: ["<rootDir>/core/test/setup-tests.ts"],
  testEnvironment: "node",
};
