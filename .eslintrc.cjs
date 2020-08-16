"use strict";

const { join } = require("path");

module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
  },
  plugins: [ "@phanect" ],
  overrides: [
    {
      files: [ "*.js", "**/*.js", "*.cjs", "**/*.cjs", "*.mjs", "**/*.mjs" ],
      extends: "plugin:@phanect/js",
    },
    {
      files: [ "*.cjs", "**/*.cjs" ],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: [ "*.ts", "**/*.ts" ],
      extends: "plugin:@phanect/ts",
      parserOptions: {
        project: join(__dirname, "./tsconfig.eslint.json"),
      },
    },
  ],
};
