import type { ObjectEncodingOptions } from "node:fs";
import { readFile, stat } from "node:fs/promises";

export const loadJSON = async <JsonObject extends { [key: string]: unknown }>(
  jsonPath: string,
  options?: ObjectEncodingOptions,
): Promise<JsonObject> => {
  try {
    if (!(await stat(jsonPath)).isFile()) {
      throw new Error(`"${jsonPath}" does not exist of not a regular file.`);
    }

    const jsonString = await readFile(jsonPath, {
      ...options,
      encoding: options?.encoding ?? "utf8",
    });
    const loadedJSON: JsonObject = JSON.parse(jsonString);

    return loadedJSON;
  } catch (err) {
    return Promise.reject(err);
  }
};
