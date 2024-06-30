// @ts-check
import eslint from "@eslint/js";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    ignores: ["dist", "jest.config.js", "prettier.config.js"],
  },
  {
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      /* Use `__dirname` variable for convince */
      "unicorn/prefer-module": "off",
      /* Unnecessary */
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          ignore: ["e2e", /env/i, /fn/i, /props/i, /req/i, /res/i],
        },
      ],
    },
  },
);
