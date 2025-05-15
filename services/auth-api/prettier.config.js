module.exports = {
  importOrder: ["^(?!src|\\.)", "^src", "^\\.", "test"],
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
