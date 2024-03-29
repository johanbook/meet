const fs = require("fs");

const ALLOWED_SCOPES = [...fs.readdirSync("./services"),"console", "k8", "repo"];

const LEVEL = {
  ERROR: 2,
};

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [LEVEL.ERROR, "always", ALLOWED_SCOPES],
  },
};
