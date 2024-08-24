/**
 * Remove duplicate values from array.
 * @param arr - An array to deduplicate.
 * @returns - The deduplicated array.
 * @template T
 */
export const deduplicate = <T>(arr: T[]): T[] =>
  arr.filter((el, i) => arr.indexOf(el) === i);
