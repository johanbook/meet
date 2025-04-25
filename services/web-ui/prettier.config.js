module.exports = {
  importOrder: ["^react", "^(?!src|\\.)", "^src", "^\\."],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
