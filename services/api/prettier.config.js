module.exports = {
  importOrder: ["^(?!src|\\.)", "^src", "^\\."],
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  importOrderSeparation: true,
  importOrderGroupNamespaceSpecifiers: true,
  // A boolean value to enable or disable sorting of the specifiers in an import declarations.
  importOrderSortSpecifiers: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
