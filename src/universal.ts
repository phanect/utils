export { deduplicate } from "./universal/deduplicate.ts";
export { trimLines } from "./universal/trim-lines.ts";
export { getLastElementOf } from "./universal/get-last-element-of.ts";
export { npmPackageExists } from "./universal/npm-package-exists.ts";
export { pseudoRandomInt } from "./universal/pseudo-random-int.ts";
export { sleep } from "./universal/sleep.ts";
export { sortObjects } from "./universal/sort-objects.ts";

//
// Backward compatibility
//

/** @deprecated `deindent()` is renamed to `trimLines()` */
export { trimLines as deindent } from "./universal/trim-lines.ts";
