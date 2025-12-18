import { expect, test } from "vitest";
import { deindent } from "../universal.ts";

test("deindent", () => {
  const before = `
  {
    "test": "JS object"
  }
`;
  const expectedAfter = `{
"test": "JS object"
}`;

  const actualAfter = deindent(before);

  expect(actualAfter).toStrictEqual(expectedAfter);
}, 10000);
