import rpSwc from "@rollup/plugin-swc";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { nodeExternals } from "rollup-plugin-node-externals";

/** @type {{ dependencies?: object, devDependencies?: object }} */
const { dependencies, devDependencies } = JSON.parse(
  (await readFile(
    join(import.meta.dirname, "package.json"),
    { encoding: "utf-8" },
  ))
);

/** @type { import("rollup").RollupOptions } */
const config = {
  input: {
    universal: "src/universal.ts",
    nodejs: "src/nodejs.ts",
  },
  output: [
    {
      dir: "dist",
      entryFileNames: "[name].mjs",
      format: "es",
      generatedCode: "es2015",
    },
    {
      dir: "dist",
      entryFileNames: "[name].cjs",
      format: "cjs",
      generatedCode: "es2015",
    },
  ],
  external: [
    ...Object.keys(dependencies ?? {}),
    ...Object.keys(devDependencies ?? {}),
  ],
  plugins: [
    rpSwc({
      swc: {
        env: {
          targets: [
            "last 2 Chrome versions",
            "last 2 Edge versions",
            "last 2 Firefox versions",
            "last 2 Safari versions",
            "last 2 Android versions",
            "last 2 ChromeAndroid versions",
            "last 2 FirefoxAndroid versions",
            "maintained Node versions",
            "last 1 Electron version",
          ],
        },
      },
    }),
    nodeExternals(),
  ],
};

export default config;
