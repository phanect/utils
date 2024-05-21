"use strict";

const { join } = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: "phanective/plain",

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
      files: [ "*.cjs" ],
      env: {
        commonjs: true,
        node: true,
      },
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: [ "**/*.config.{js,mjs,cjs,ts}" ],
      rules: {
        "node/no-unpublished-import": "off",
      },
    },
    {
      files: [ "src/universal/**/*.{js,mjs,cjs,ts,jsx,tsx}" ],
      // These libraries should work on both browser and Node.js i.e. Universal JS
      env: {
        browser: false,
        node: false,
      },
    },
    {
      files: [ "src/nodejs/**/*.{js,mjs,cjs,ts,jsx,tsx}" ],
      extends: "phanective/node",
      env: {
        browser: false,
        node: true,
      },
    },
  ],
};
