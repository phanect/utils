import { AssertionError, ok } from "node:assert/strict";
import { join } from "node:path";
import { z } from "zod";

/**
 * Remove duplicate values from array.
 * @param {T[]} arr - An array to deduplicate.
 * @returns {T[]} - The deduplicated array.
 * @template T
 */
export const deduplicate = <T>(arr: T[]): T[] => arr.filter((el, i) => arr.indexOf(el) === i);

/**
 * Strip indents from multiline string. Userful for normalizing multiline strings written with template literals (strings declared with backquotes `\`\``)
 * @param str - Multiline string to strip indents.
 * @returns Multiline string which indents are stripped.
 */
export const deindent = (str: string): string => str
  .trim() // strip first and last empty lines
  .split("\n")
  .map(str => str.trim())
  .join("\n");

/**
 * @param {unknown[]} arr - The array to get the last element.
 * @returns {unknown} The last element of array.
 */
export const getLastElementOf = <T>(arr: T[]): T => arr[arr.length - 1];

export const npmPackageExists = async (pkgName: string): Promise<boolean> => {
  const res = await fetch(`https://registry.npmjs.com/${pkgName}`);

  if (res.status < 400) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else if (400 <= res.status && res.status < 500) {
    throw new Error(deindent(`
      [ERROR] Package name "${pkgName}" may be invalid.
      Could not check if npm package  exists.

      HTTP ${res.status} ${res.statusText} https://registry.npmjs.com/${pkgName}
    `));
  } else if (500 <= res.status) {
    throw new Error(deindent(`
      [ERROR] registry.npmjs.com may be down. See: https://status.npmjs.org
      Could not check if npm package "${pkgName}" exists.
      HTTP ${res.status} ${res.statusText} https://registry.npmjs.com/${pkgName}
    `));
  } else {
    throw new Error(deindent(`
      [ERROR] Unexpected HTTP Status Code ${res.status} ${res.statusText} while checking https://registry.npmjs.com/${pkgName}
    `));
  }
};

/**
 * Generates random integer number.
 * @param max - max number of the generated random number
 * @returns random number (integer)
 */
export const random = (max: number): number => Math.floor(Math.random() * max);

/**
 * Sleep for the specified time.
 * @param {number} ms - The time to wait (in milliseconds).
 * @returns {Promise<void>} A promise object.
 */
export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

/**
 * Sort array of the objects by the keys in the alphabetical order.
 * @param {object[]} objects - Aarray of objects.
 * @returns {object[]} - Sorted array of the objects.
 */
// { [key: string]: unknown } is not acceptable and we must use any here.
// See: https://github.com/microsoft/TypeScript/wiki/Breaking-Changes/83af27fca396d172b4d895d480b10c3bacf89112#-k-string-unknown--is-no-longer-a-wildcard-assignment-target
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortObjects = <T extends { [key: string]: any }>(objects: T[]): T[] => objects.sort((obj1, obj2) => {
  type Comparable = string|number|boolean|Date;

  const keys = Object.keys(obj1).sort();

  for (const key of keys) {
    if (
      (!(key in obj1) || !(key in obj2)) ||
      obj1[key] === obj2[key]
    ) {
      continue;
    } else if ((obj1[key] as Comparable) < (obj2[key] as Comparable)) { // if the values are not comparable, false is returned.
      return -1;
    } else if ((obj1[key] as Comparable) > (obj2[key] as Comparable)) { // if the values are not comparable, false is returned.
      return 1;
    } else {
      continue;
    }
  }

  return 0;
});

type AssertPackageOptions = {
  esm: boolean;
  cjs: boolean;
  ts: boolean;
};

const assertPackage = async (projectRoot: string, options?: AssertPackageOptions): Promise<void> => {
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
