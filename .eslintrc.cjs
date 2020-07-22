"use strict";

const { join } = require("path");

module.exports = {
  root: true,
  extends: "plugin:@phanect/ts",

  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    sourceType: "module",
    project: join(__dirname, "./tsconfig.eslint.json"),
  },
  plugins: [ "@phanect" ],
};
