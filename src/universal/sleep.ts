/**
 * Sleep for the specified time.
 * @param ms - The time to wait (in milliseconds).
 * @returns A promise object.
 */
export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
