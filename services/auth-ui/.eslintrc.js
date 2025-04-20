module.exports = {
  ignorePatterns: ["src/api/**"],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
  ],
  plugins: ["@typescript-eslint", "sonarjs", "unicorn"],
  rules: {
    "no-console": "error",
    "no-template-curly-in-string": "error",
    "react/react-in-jsx-scope": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/prevent-abbreviations": "off",
  },
};
