module.exports = {
  ignorePatterns: ["src/api/**"],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "sonarjs", "unicorn"],
  rules: {
    /** Not relevant in React v17 and later */
    "react/react-in-jsx-scope": "off",
    "no-console": "error",
    "no-template-curly-in-string": "error",
    /** Empty interfaces are useful for later adding props */
    "@typescript-eslint/no-empty-interface": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/prevent-abbreviations": "off",
  },
};
