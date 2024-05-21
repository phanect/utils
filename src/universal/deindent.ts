/**
 * Strip indents from multiline string. Userful for normalizing multiline strings written with template literals (strings declared with backquotes `\`\``)
 * @param str - Multiline string to strip indents.
 * @returns Multiline string which indents are stripped.
 */
export const deindent = (str: string): string => str
  .trim() // strip first and last empty lines
  .split("\n")
  .map(str => str.trim())
  .join("\n");
