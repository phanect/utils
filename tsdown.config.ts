import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "./src/universal.ts",
    "./src/nodejs.ts",
  ],

  format: [ "esm", "cjs" ],
  dts: true,
  sourcemap: true,

  treeshake: false,
  minify: false,
  clean: true,
});
