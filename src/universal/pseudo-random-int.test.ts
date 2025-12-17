import { ok } from "node:assert";
import { describe, expect, test } from "vitest";
import { pseudoRandomInt } from "./pseudo-random-int.ts";

describe("pseudoRandomInt()", () => {
  test("returns a number within valid range", () => {
    const generatedNumber = pseudoRandomInt(100);

    expect(generatedNumber).toBeLessThanOrEqual(100);
    expect(generatedNumber).toBeGreaterThanOrEqual(0);
    expect(typeof generatedNumber).toBe("number");
  });

  test("returns an integer (no decimals)", () => {
    const generatedNumber = pseudoRandomInt(100);
    ok(Number.isInteger(generatedNumber));
  });

  test("handles max value of 0 (returns 0)", () => {
    const generatedNumber = pseudoRandomInt(0);
    expect(generatedNumber).toBe(0);
  });

  test("returns 0 or 1 for max value of 1", () => {
    const generatedNumber = pseudoRandomInt(1);
    expect([ 0, 1 ]).toContain(generatedNumber);
  });

  test("returns values in expected range for small max", () => {
    const max = 10;
    const results = new Set<number>();

    // Generate multiple random numbers to test distribution
    for (let i = 0; i < 100; i++) {
      const generatedNumber = pseudoRandomInt(max);
      results.add(generatedNumber);
      expect(generatedNumber).toBeGreaterThanOrEqual(0);
      expect(generatedNumber).toBeLessThanOrEqual(max);
      expect(Number.isInteger(generatedNumber)).toBe(true);
    }

    // Should generate at least some variety in 100 attempts
    expect(results.size).toBeGreaterThan(1);
  });

  test("returns values in expected range for large max", () => {
    const max = 1000000;

    for (let i = 0; i < 100; i++) {
      const generatedNumber = pseudoRandomInt(max);
      expect(generatedNumber).toBeGreaterThanOrEqual(0);
      expect(generatedNumber).toBeLessThanOrEqual(max);
      expect(Number.isInteger(generatedNumber)).toBe(true);
    }
  });
});
