/**
 * Remove duplicate values from array.
 * @param {T[]} arr - An array to deduplicate.
 * @returns {T[]} - The deduplicated array.
 * @template T
 */
export function deduplicate<T>(arr: T[]): T[] {
  return arr.filter((el, i) => arr.indexOf(el) === i);
}

/**
 * Sleep for the specified time.
 * @param {number} ms - The time to wait (in milliseconds).
 * @returns {Promise<void>} A promise object.
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
