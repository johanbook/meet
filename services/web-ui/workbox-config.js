module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.js"],
  swDest: "dist/service-worker.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
