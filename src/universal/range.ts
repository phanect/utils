/**
 * Create an array with the values of its index
 * @param length - array length to generate
 * @returns an array with the values of its index
 * @example
 * ```js
 * for (const i of range(3)) {
 *   console.log(i);
 * }
 * // 0
 * // 1
 * // 2
 * ```
 */
export const range = (length: number) => {
  if (length <= 0) {
    throw new Error(`\`length\` must be a natural number, but \`${ length }\` is given.`);
  }

  return Array.from({ length }, (_, k) => k);
};
