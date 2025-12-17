import { pseudoRandomInt } from "./pseudo-random-int.ts";
import { chars } from "./pseudo-random-string-chars.ts";

/**
 * Generates pseudo-random string.
 * Don't use this function for security purpose. (e.g., generating password)
 * @param length - length of the generated string
 * @returns pseudo-random string
 */
export const pseudoRandomString = (length: number): string => {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error(`\`length\` must be a natural number, but \`${ length }\` is given.`);
  }

  return Array.from({ length }, () => {
    const index = pseudoRandomInt(chars.length - 1);
    return chars[index];
  }).join("");
};
