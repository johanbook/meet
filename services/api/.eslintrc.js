module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended",
    "plugin:unicorn/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "unicorn/no-array-method-this-argument": "off",
    "unicorn/no-process-exit": "off",
    "unicorn/no-null": "off",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        ignore: ["e2e", /env/i, /fn/i, /props/i, /req/i, /res/i],
      },
    ],
  },
};
