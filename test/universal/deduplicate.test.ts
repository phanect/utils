import { expect, test } from "vitest";
import { deduplicate } from "../../src/universal.ts";

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
