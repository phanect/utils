import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./src/universal.ts",
    "./src/nodejs.ts",
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
