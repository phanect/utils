import { core, nodejs, unbundled } from "@phanect/lint";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
  {
    ignores: [
      "./**/dist/**",
    ],
  },

  ...core,
  ...unbundled,

  ...nodejs.map((config) => ({
    ...config,
    files: [ "./src/nodejs/**/*.ts" ],
  })),

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default configs;
