import { AssertionError, ok } from "node:assert/strict";
import { join } from "node:path";
import { z } from "zod";

export type AssertPackageOptions = {
  esm: boolean;
  cjs: boolean;
  ts: boolean;
};

export const assertPackage = async (projectRoot: string, options?: AssertPackageOptions): Promise<void> => {
  const esm = typeof options?.esm === "boolean" ? options.esm : true;
  const cjs = typeof options?.cjs === "boolean" ? options.cjs : true;
  const ts = typeof options?.ts === "boolean" ? options.ts : true;

  const { type, bin, module, main, types, exports } = await import(join(projectRoot, "package.json"));
  const relatedProps = { type, bin, module, main, types, exports };

  const { success, error } = z.object({
    type: z.enum([ "module" ]),
    bin: z.string(),
    module: z.string(),
    main: z.string(),
    types: z.string(),
    exports: z.union([
      z.string(),
      z.object({
        ".": z.string(),
      }), // No .strict() because arbitrary paths may be given.
    ]),
  }).strict().safeParse(relatedProps);

  if (!success) {
    for (const [ propName, unnormalizedMessages ] of Object.entries(error.format())) {
      const messages: string[] = Array.isArray(unnormalizedMessages) ? unnormalizedMessages : unnormalizedMessages._errors;

      throw new AssertionError(
        `package.json property ${propName} is invalid:\n` + messages.map(message => `  ${message}`).join("\n")
      );
    }
  }








  if (type !== "module") {
    throw AssertionError("This package is not ESM package. Set `type: \"module\"`.");
  }

  // Check if required properties are set.

  if (esm === true) {
    const exportsType = typeof exports;

    ok(!!module || !!exports, "`module` or `exports` is required. ");
    ok(module && typeof module === "string", `\`module\` has to be string and cannot be ${typeof module}`);


    ok(
      exportsType === "string" || exportsType === "object",
      `exports cannot be ${exportsType} type. It has to be string or object type.`,
    );

    if (exportsType === "object") {
      ok(exports["."] || exports.import, "`exports[\".\"]` or `exports.import` is required.");
    }
  }

  if (cjs === true) {
    const exportsType = typeof exports;

    if (exportsType === "object") {
      ok(exports["."].require || exports.require, "`exports.require` or `exports[\".\"].require` is required.");
    }
  }

  if (ts === true) {

  }
};
