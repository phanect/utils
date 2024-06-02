import { expect, test } from "vitest";
import { modifiable } from "../../src/universal.ts";

test("modifiable", () => {
  type Element = {
    id: number;
    msg: string;
  };

  const elements: Element[] = [
    { id: 25, msg: "a" },
    { id: 42, msg: "b" },
    { id: 98, msg: "c" },
  ];

  const results = elements.map(modifiable((el) => {
    delete el.id;
    return el;
  }));

  expect(results).toStrictEqual([
    { msg: "a" },
    { msg: "b" },
    { msg: "c" },
  ]);
});
