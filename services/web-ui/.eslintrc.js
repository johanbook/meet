module.exports = {
  ignorePatterns: ["src/api/**"],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
    "react-app",
    "react-app/jest",
    "plugin:storybook/recommended",
  ],
  overrides: [
    {
      files: ["*.stories.*"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  plugins: ["@typescript-eslint", "sonarjs", "unicorn"],
  rules: {
    "no-console": "error",
    "no-template-curly-in-string": "error",
    "unicorn/filename-case": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/prevent-abbreviations": "off",
  },
};
