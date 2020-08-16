import { klona } from "klona/full";
import { mergeWith } from "lodash-es";

/**
 * Remove duplicate values from array.
 *
 * @param {T[]} arr - An array to deduplicate.
 * @returns {T[]} - The deduplicated array.
 * @template T
 */
export function deduplicate<T>(arr: T[]): T[] {
  return arr.filter((el, i) => arr.indexOf(el) === i);
}

export function deepMerge(obj1: object, obj2: object): object {
  const _obj1 = klona(obj1);

  return mergeWith(_obj1, obj2, (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.concat(b);
    }
  });
}

/**
 * Sleep for the specified time.
 *
 * @param {number} ms - The time to wait (in milliseconds).
 * @returns {Promise<void>} A promise object.
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
