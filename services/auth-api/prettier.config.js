module.exports = {
  importOrder: ["^(?!src|\\.)", "^src", "^\\."],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
