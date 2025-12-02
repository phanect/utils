import { expect, test } from "vitest";
import { getLastElementOf } from "../../src/universal.ts";

test("getLastElementOf (without index)", () => {
  const lastElement = getLastElementOf([ "a", "b", "c" ]);

  expect(lastElement).toStrictEqual("c");

  const lastElementExplicitlyWithoutIndex = getLastElementOf([ "a", "b", "c" ], {
    withIndex: false,
  });

  expect(lastElementExplicitlyWithoutIndex).toStrictEqual("c");
});

test("getLastElementOf (with index)", () => {
  const lastElement = getLastElementOf([ "a", "b", "c" ], { withIndex: true });

  expect(lastElement).toStrictEqual({ el: "c", index: 2 });
});

test("getLastElementOf (without index, empty array given)", () => {
  const lastElement = getLastElementOf([], { withIndex: false });

  expect(lastElement).toBeUndefined();
});

test("getLastElementOf (with index, empty array given)", () => {
  const lastElement = getLastElementOf([], { withIndex: true });

  expect(lastElement).toBeUndefined();
});

test("undefined element (without index)", () => {
  const lastElement = getLastElementOf([ "a", "b", undefined, "c", undefined ], { withIndex: false });

  expect(lastElement).toBeUndefined();
});

test("undefined element (with index)", () => {
  const { el, index } = getLastElementOf([ "a", "b", undefined, "c", undefined ], { withIndex: true }) ?? {};

  expect(el).toBeUndefined();
  expect(index).toBe(4);
});

test("false element (with index)", () => {
  const { el, index } = getLastElementOf([ "a", "b", false ], { withIndex: true }) ?? {};

  expect(el).toBe(false);
  expect(index).toBe(2);
});

test("empty string element (with index)", () => {
  const { el, index } = getLastElementOf([ "a", "b", "" ], { withIndex: true }) ?? {};

  expect(el).toBe("");
  expect(index).toBe(2);
});
