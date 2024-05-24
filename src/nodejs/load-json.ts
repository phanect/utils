import { readFile, stat } from "node:fs/promises";

type LoadJsonOptions = {
  encoding?: BufferEncoding;
};

export const loadJSON = async <LoadedJSON extends {[ key: string]: unknown }>(jsonPath: string, options?: LoadJsonOptions): Promise<LoadedJSON> => {
  const { encoding = "utf8" } = options ?? {};

  try {
    if (!(await stat(jsonPath)).isFile()) {
      throw new Error(`"${jsonPath}" does not exist of not a regular file.`);
    }

    const jsonFileContent = await readFile(jsonPath, { encoding });
    const loadedJSON: LoadedJSON = JSON.parse(jsonFileContent);

    return loadedJSON;
  } catch (err) {
    return Promise.reject(err);
  }
};
