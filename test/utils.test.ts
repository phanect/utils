import { deduplicate, deepMerge, sleep } from "../src/utils";

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

test("deepMerge", () => {
  const result = deepMerge({
    foo: [ "a", "b" ],
    bar: {
      boo: [ "f", "g" ],
    },
  },
  {
    foo: [ "c", "d", "e" ],
    bar: {
      boo: [ "h", "i", "j" ],
    },
  });

  expect(result).toEqual({
    foo: [ "a", "b", "c", "d", "e" ],
    bar: {
      boo: [ "f", "g", "h", "i", "j" ],
    },
  });
});

test("deepMerge doesn't modify the original object", () => {
  const config1 = {
    foo: [ "a", "b" ],
    bar: {
      boo: [ "f", "g" ],
    },
  };
  const config2 = {
    foo: [ "c", "d", "e" ],
    bar: {
      boo: [ "h", "i", "j" ],
    },
  };

  deepMerge(config1, config2);

  expect(config1).toEqual({
    foo: [ "a", "b" ],
    bar: {
      boo: [ "f", "g" ],
    },
  });

  expect(config2).toEqual({
    foo: [ "c", "d", "e" ],
    bar: {
      boo: [ "h", "i", "j" ],
    },
  });
});

test("sleep", async () => {
  const startAt = new Date();
  await sleep(5000);
  const endAt = new Date();

  expect(+endAt - +startAt).toBeGreaterThan(4900);
  expect(+endAt - +startAt).toBeLessThan(5100);
});
