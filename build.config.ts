import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./src/utils.ts",
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
