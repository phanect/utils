import { join } from "node:path";
import rollupConfig from "./rollup.config.js";

if (!Array.isArray(rollupConfig.input)) {
  throw new Error("Expect `input` to be an object.");
}
if (!Array.isArray(rollupConfig.output)) {
  throw new Error("Expect `output` to be an object.");
}

const config = {
  entries: Object.entries(rollupConfig.input).map(([ name, entryPath ]) => ({
    filePath: entryPath.startsWith("/")
      ? entryPath
      : join(import.meta.dirname, entryPath),
    outFile: join(import.meta.dirname, `dist/${name}.d.ts`),

    output: {
      sortNodes: true,
      noBanner: true,
      exportReferencedTypes: true,
    },
  })),
};

export default config;
