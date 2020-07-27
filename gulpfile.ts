import { dest, parallel } from "gulp";
import * as ts from "gulp-typescript";
import * as rename from "gulp-rename";

export const build = parallel(
  () => {
    const tsProject = ts.createProject("tsconfig.json", { module: "ES2015" });

    return tsProject
      .src()
      .pipe(tsProject())
      .js
      .pipe(rename({ extname: ".mjs" }))
      .pipe(dest("dist"));
  },
  () => {
    const tsProject = ts.createProject("tsconfig.json", { module: "commonjs" });

    return tsProject
      .src()
      .pipe(tsProject())
      .js
      .pipe(rename({ extname: ".cjs" }))
      .pipe(dest("dist"));
  },
);
