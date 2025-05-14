import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
    sonarjs.configs.recommended,
    unicorn.configs.recommended,
  ],
  files: ["src/**/*.ts"],
  ignores: ["src/**/migrations/*.ts"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "sonarjs/no-clear-text-protocols": "off",
    "sonarjs/redundant-type-aliases": "off",
    "sonarjs/todo-tag": "off",
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
});
