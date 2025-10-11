/**
 * Sort array of the objects by the keys in the alphabetical order.
 * @param objects - Array of objects.
 * @returns - Sorted array of the objects.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any --
 * `{ [key: string]: unknown }` is not acceptable and we must use `any` here.
 * See: https://github.com/microsoft/TypeScript/wiki/Breaking-Changes/83af27fca396d172b4d895d480b10c3bacf89112#-k-string-unknown--is-no-longer-a-wildcard-assignment-target
 */
export const sortObjects = <T extends Record<string, any>>(
  objects: T[],
): T[] =>
  objects.sort((obj1, obj2) => {
    type Comparable = string | number | boolean | Date;

    const keys = Object.keys(obj1).sort();

    for (const key of keys) {
      if (!(key in obj1 && key in obj2) || obj1[key] === obj2[key]) {
        // continue
      } else if ((obj1[key] as Comparable) < (obj2[key] as Comparable)) { // false if if not comparable
        return -1;
      } else if ((obj1[key] as Comparable) > (obj2[key] as Comparable)) { // false if if not comparable
        return 1;
      } else {
        // continue
      }
    }

    return 0;
  });
