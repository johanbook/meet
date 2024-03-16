module.exports = {
  ignorePatterns: ["src/api/**"],
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:sonarjs/recommended",
    "plugin:storybook/recommended",
    "plugin:unicorn/recommended",
  ],
  overrides: [
    {
      files: ["*.stories.*"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
  plugins: [
    "@tanstack/query",
    "@typescript-eslint",
    "react",
    "react-hooks",
    "sonarjs",
    "unicorn",
  ],
  rules: {
    "no-console": "error",
    "no-template-curly-in-string": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "class",
        format: ["StrictPascalCase"],
      },
      {
        selector: "function",
        /** Needed since React functional component use PascalCase */
        format: ["StrictPascalCase", "strictCamelCase"],
      },
    ],
    /** Not relevant in React v17 and later */
    "react/react-in-jsx-scope": "off",
    /** Empty interfaces are useful for later adding props */
    "@typescript-eslint/no-empty-interface": "off",
    /** We want to be able to do `obj.name` as test name */
    "jest/valid-title": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/prevent-abbreviations": "off",
  },
};
