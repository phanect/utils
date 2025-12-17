/**
 * Generates random integer number.
 * @param max - max number of the generated random number
 * @returns random number (integer)
 */
export const pseudoRandomInt = (max: number): number => Math.floor(Math.random() * (max + 1));
