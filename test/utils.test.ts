import { expect, test } from "vitest";
import { deduplicate, deindent, sleep, sortObjects } from "../src/utils";

test("deduplicate", () => {
  const deduplicated = deduplicate([
    "www.example.com",
    "www.example.org",
    "www.example.net",
    "www.example.io",

    "www.example.net",
    "www.example.com",
    "www.example.net",
    "www.example.net",
    "www.example.net",
    "www.example.org",
    "www.example.io",
    "www.example.org",
    "www.example.net",
    "www.example.org",
    "www.example.io",
  ]);

  expect(deduplicated).toStrictEqual([
    "www.example.com",
    "www.example.org",
    "www.example.net",
    "www.example.io",
  ]);
});

test("deindent", async () => {
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

test("sleep", async () => {
  const startAt = new Date();
  await sleep(5000);
  const endAt = new Date();

  expect(+endAt - +startAt).toBeGreaterThan(4900);
  expect(+endAt - +startAt).toBeLessThan(5100);
}, 10000);

test("sortObjects", async () => {
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
