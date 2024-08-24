export function getLastElementOf<T>(
  arr: T[],
  options?: { withIndex?: false },
): T | undefined;
export function getLastElementOf<T>(
  arr: T[],
  options: { withIndex: true },
): { el: T; index: number } | undefined;

/**
 * @param arr - The array to get the last element.
 * @param options - Options
 * @param options.withIndex - Set `true` if you need the index of the last element. `false` by default.
 * @returns The last element of array. If `withIndex = true`, this function returns an object
 * with the element and index. `undefined` if empty array is given.
 */
export function getLastElementOf<T>(
  arr: T[],
  options: {
    withIndex?: boolean;
  } = {},
): T | { el: T; index: number } | undefined {
  if (arr.length <= 0) {
    return undefined;
  }

  const { withIndex = false } = options ?? {};

  if (withIndex === true) {
    const index = arr.length - 1;

    return {
      el: arr[index],
      index,
    };
  } else {
    return arr[arr.length - 1];
  }
}
