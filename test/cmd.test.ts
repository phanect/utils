import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test, afterEach, vi } from "vitest";
import { deindent } from "../src/universal.ts";
import { cmd } from "../src/nodejs.ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

describe("Mock tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("cmd", async () => {
    let output: string = "";

    vi.spyOn(console, "info").mockImplementation((printed) => output += printed);
    vi.spyOn(console, "error").mockImplementation((printed) => output += printed);

    await cmd([
      `bash ${ join(__dirname, "fixtures/cmd/command1.sh") }`,
      `bash ${ join(__dirname, "fixtures/cmd/command2.sh") }`,
    ]);

    expect(output).toStrictEqual(deindent(`
      >>> [0] bash ${join(join(__dirname, "fixtures/cmd/command1.sh"))}

      [0] Command 1 started.
      [0] This message is printed after three seconds, but it should be shown before the output of command 2.

      >>> [1] bash ${join(__dirname, "fixtures/cmd/command2.sh")}

      [1] Command 2 executed.
    `).trim() + "\n");
  });
});
