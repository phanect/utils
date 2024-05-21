/**
 * Sleep for the specified time.
 * @param {number} ms - The time to wait (in milliseconds).
 * @returns {Promise<void>} A promise object.
 */
export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
