import { expect, test } from "vitest";
import { trimLines } from "../universal.ts";

test("deindent", () => {
  const before = `
  {
    "test": "JS object"
  }
`;
  const expectedAfter = `{
"test": "JS object"
}`;

  const actualAfter = trimLines(before);

  expect(actualAfter).toStrictEqual(expectedAfter);
}, 10000);
