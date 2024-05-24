"use strict";

const { join } = require("node:path");

/** @type { import("dts-bundle-generator").OutputOptions } */
const outputOptions = {
  sortNodes: true,
  noBanner: true,
  exportReferencedTypes: true,
};

/** @type { import("dts-bundle-generator/config-schema").BundlerConfig } */
const config = {
  compilationOptions: {
    preferredConfigPath: join(__dirname, "tsconfig.json"),
  },
  entries: [
    {
      filePath: join(__dirname, "src/universal.ts"),
      outFile: join(__dirname, "dist/universal.d.ts"),
      output: outputOptions,
    },
    {
      filePath: join(__dirname, "src/nodejs.ts"),
      outFile: join(__dirname, "dist/nodejs.d.ts"),
      output: outputOptions,
    },
  ],
};

module.exports = config;
