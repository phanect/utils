import { readFile, stat } from "node:fs/promises";
import type { ObjectEncodingOptions } from "node:fs";

export const loadJSON = async <JsonObject extends Record<string, unknown>>(
  jsonPath: string,
  options?: ObjectEncodingOptions,
): Promise<JsonObject> => {
  if (!(await stat(jsonPath)).isFile()) {
    throw new Error(`"${ jsonPath }" does not exist or not a regular file.`);
  }

  const jsonString = await readFile(jsonPath, {
    ...options,
    encoding: options?.encoding ?? "utf8",
  });
  const loadedJSON = JSON.parse(jsonString) as JsonObject;

  return loadedJSON;
};
