import { expect, test } from "vitest";
import { range } from "./range.ts";

test("range()", () =>
  expect(range(10)).toStrictEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
);

test("range(0)", () =>
  expect(() => range(0)).toThrowError()
);

test("range(NEGATIVE_NUMBER)", () =>
  expect(() => range(-7)).toThrowError()
);
