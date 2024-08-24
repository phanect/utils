/**
 * Strip leading and trailing spaces from (i.e. trim) each lines of multiline string. Useful for normalizing multiline strings written with template literals (strings declared with backquotes `\`\``)
 * @param str - Multiline string to strip indents.
 * @returns Multiline string which each lines are trimmed.
 */
export const trimLines = (str: string): string =>
  str
    .trim() // strip first and last empty lines
    .split("\n")
    .map((str) => str.trim())
    .join("\n");
