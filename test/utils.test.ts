import { deduplicate, sleep } from "../src/utils";

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

test("sleep", async () => {
  const startAt = new Date();
  await sleep(5000);
  const endAt = new Date();

  expect(+endAt - +startAt).toBeGreaterThan(4900);
  expect(+endAt - +startAt).toBeLessThan(5100);
}, 10000);
