import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "openapi.json",
  apiFile: "./src/core/redux/template-api.ts",
  apiImport: "templateApi",
  outputFile: "./src/my-api.ts",
  exportName: "meetApi",
  hooks: true,
};

export default config;
