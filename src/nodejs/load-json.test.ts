import { join } from "node:path";
import { expect, test } from "vitest";
import { loadJSON } from "../nodejs.ts";

test("loadJSON", async () => {
  const obj = await loadJSON(
    join(import.meta.dirname, "../../test/fixtures/load-json/fixture.json"),
  );

  expect(obj).toStrictEqual({
    foo: "bar",
    boo: [ "a", "b", "c" ],
  });
});
