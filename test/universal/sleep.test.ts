import { expect, test } from "vitest";
import { sleep } from "../../src/universal.ts";

test("sleep", async () => {
  const startAt = new Date();
  await sleep(5000);
  const endAt = new Date();

  expect(+endAt - +startAt).toBeGreaterThan(4900);
  expect(+endAt - +startAt).toBeLessThan(5100);
}, 10000);
