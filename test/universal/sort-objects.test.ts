import { expect, test } from "vitest";
import { sortObjects } from "../../src/universal.ts";

test("sortObjects", () => {
  const result = sortObjects([
    { a: 5 },
    { a: 1 },
    { a: 4 },
    { a: 3 },
    { a: 2 },
  ]);

  expect(result).toStrictEqual([
    { a: 1 },
    { a: 2 },
    { a: 3 },
    { a: 4 },
    { a: 5 },
  ]);
}, 10000);
