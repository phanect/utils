import { describe, expect, test } from "vitest";
import { pseudoRandomInt } from "./pseudo-random-int.ts";
import { pseudoRandomString } from "./pseudo-random-string.ts";

describe("pseudoRandomString()", () => {
  test("returns a string with the correct length", () => {
    const generatedString = pseudoRandomString(10);

    expect(generatedString).toHaveLength(10);
    expect(typeof generatedString).toBe("string");
  });

  test("returns different strings on multiple calls", () => {
    const generatedString1 = pseudoRandomString(20);
    const generatedString2 = pseudoRandomString(20);
    const generatedString3 = pseudoRandomString(20);

    expect(generatedString1).not.toBe(generatedString2);
    expect(generatedString2).not.toBe(generatedString3);
    expect(generatedString1).not.toBe(generatedString3);
  });

  test("throws an Error when length is 0", () =>
    expect(() => pseudoRandomString(0)).toThrowError()
  );

  test("throws an Error when length is a negative number", () =>
    expect(() => pseudoRandomString(-4)).toThrowError()
  );

  test("generates string with only valid characters (alphanumeric)", () => {
    const generatedString = pseudoRandomString(100);
    expect(generatedString).toMatch(/^[A-Za-z0-9]+$/);
  });

  test("works with different length values", () => {
    for (const length of Array.from({ length: 5 }, () => pseudoRandomInt(500) + 1)) {
      const generatedString = pseudoRandomString(length);
      expect(generatedString).toHaveLength(length);
      expect(typeof generatedString).toBe("string");
    }
  });

  test("generates strings with good distribution of characters", () => {
    // Generate a long string and check that multiple different characters appear
    const generatedString = pseudoRandomString(1000);
    const uniqueChars = new Set(generatedString.split(""));

    // With 1000 characters, we should see a good variety
    // (at least 40 different characters out of 62 possible)
    expect(uniqueChars.size).toBeGreaterThan(40);
  });
});
