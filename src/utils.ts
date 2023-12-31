/**
 * Remove duplicate values from array.
 * @param {T[]} arr - An array to deduplicate.
 * @returns {T[]} - The deduplicated array.
 * @template T
 */
export const deduplicate = <T>(arr: T[]): T[] => arr.filter((el, i) => arr.indexOf(el) === i);

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
 * Sort array of the objects by the same order.
 * @param {object[]} objects - Aarray of objects.
 * @returns {object[]} - Sorted array of the objects.
 */
export const sortObjects = <T extends { [key: string]: unknown }>(objects: T[]): T[] => objects.sort((obj1, obj2) => {
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
