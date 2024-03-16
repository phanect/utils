"use strict";

const { join } = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: "phanective/node",

  env: {
    browser: true,
    node: false, // This project should work on both browser and Node.js i.e. Universal JS
  },
  parserOptions: {
    project: join(__dirname, "tsconfig.json"),
  },
  ignorePatterns: [ "dist/*" ],
  overrides: [
    {
      files: [ "*.js" ],
      parserOptions: {
        sourceType: "module",
      },
    },
    {
      files: [ "test/**/*.test.*" ],
      extends: "phanective/jest",
    },
    {
      files: [ "**/*.config.{js,mjs,cjs,ts}" ],
      rules: {
        "node/no-unpublished-import": "off",
      },
    },
  ],
};
