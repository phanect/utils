import { deindent } from "./deindent.ts";

export const npmPackageExists = async (pkgName: string): Promise<boolean> => {
  const res = await fetch(`https://registry.npmjs.com/${pkgName}`);

  if (res.status < 400) {
    return true;
  } else if (res.status === 404) {
    return false;
  } else if (400 <= res.status && res.status < 500) {
    throw new Error(deindent(`
      [ERROR] Package name "${pkgName}" may be invalid.
      Could not check if npm package  exists.

      HTTP ${res.status} ${res.statusText} https://registry.npmjs.com/${pkgName}
    `));
  } else if (500 <= res.status) {
    throw new Error(deindent(`
      [ERROR] registry.npmjs.com may be down. See: https://status.npmjs.org
      Could not check if npm package "${pkgName}" exists.
      HTTP ${res.status} ${res.statusText} https://registry.npmjs.com/${pkgName}
    `));
  } else {
    throw new Error(deindent(`
      [ERROR] Unexpected HTTP Status Code ${res.status} ${res.statusText} while checking https://registry.npmjs.com/${pkgName}
    `));
  }
};
