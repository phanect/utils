/**
 * Generates random integer number.
 * @param max - max number of the generated random number
 * @returns random number (integer)
 */
export const pseudoRandomInt = (max: number): number => {
  if (!Number.isFinite(max) || max < 0) {
    throw new RangeError("max must be a finite, non-negative number");
  }

  return Math.floor(Math.random() * (max + 1));
};
