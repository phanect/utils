/**
 * Generates pseudo-random non-negative integer number.
 * Don't use this function for security purpose. (e.g., generating password)
 * @param max - max number of the generated random number
 * @returns pseudo-random non-negative integer number
 */
export const pseudoRandomInt = (max: number): number => {
  if (!Number.isFinite(max) || max < 0) {
    throw new RangeError("max must be a finite, non-negative number");
  }

  return Math.floor(Math.random() * (max + 1));
};
