import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { loadJSON } from "./load-json.ts";
import type { PackageJson } from "type-fest";

function generateNewVersion(versionStyle: "semVer", currentVersion: string): string;
function generateNewVersion(versionStyle: "date"): string;
function generateNewVersion(versionStyle: "semVer" | "date" = "semVer", currentVersion?: string): string {
  if (versionStyle === "semVer") {
    if (currentVersion?.match(/^([0-9.])+$/m)) {

    }
  } else if (versionStyle === "date") {
    const today = new Date();
    return `${ today.getFullYear() }.${ today.getMonth() + 1 }.${ today.getDate() }`;
  } else {
    throw new Error(`Unexpected versionStyle "${ versionStyle }" given to generateNewVersion()`);
  }
}

export const bumpUpVersion = async (
  workspaceDirPaths: string | string[] = [ "workspaces", "modules", "packages" ],
  versionStyle: "semVer" | "date" = "semVer",
) => {
  const projectRoot = cwd();

  const _workspCeDirPath = Array.isArray(workspaceDirPaths)
    ? workspaceDirPaths
    : [ workspaceDirPaths ];
  const absoluteWorkspaceDirPaths: string[] =
    _workspCeDirPath.map((workspaceDirPath) => join(
      projectRoot,
      workspaceDirPath,
    ));

  const pkgJsonPaths: string[] = [
    join(projectRoot, "package.json"),
  ];

  for (const absoluteWorkspaceDirPath of absoluteWorkspaceDirPaths) {
    for (const subPkgName of await readdir(absoluteWorkspaceDirPath)) {
      pkgJsonPaths.push(
        join(absoluteWorkspaceDirPath, subPkgName, "package.json")
      );
    }
  }

  for (const pkgJsonPath of pkgJsonPaths) {
    const pkgJson = await loadJSON<PackageJson>(pkgJsonPath);

    if (!pkgJson.name) {
      throw new Error(`\`name\` property is not set in ${ pkgJson.path }.`);
    }






    const newVersion = generateNewVersion(versionStyle, currentVersion);

    for (const pkgJson of pkgJsons) {
      if (pkgJson.content.version) {
        pkgJson.content.version = newVersion;
      }

      for (const pkgName of pkgNames) {
        if (pkgJson.content.dependencies?.[pkgName]) {
          pkgJson.content.dependencies[pkgName] = newVersion;
        }
        if (pkgJson.content.devDependencies?.[pkgName]) {
          pkgJson.content.devDependencies[pkgName] = newVersion;
        }
      }

      await writeFile(pkgJson.path, JSON.stringify(pkgJson.content, null, 2) + "\n");
    }
  }






  const pkgJsons = await Promise.all(
    packageJsonPaths.map(async (packageJsonPath) => ({
      path: packageJsonPath,
      content: await loadJSON<PackageJson>(packageJsonPath),
    })),
  );

  const pkgNames = pkgJsons.map((pkgJson) => {
    if (!pkgJson.content.name) {
      throw new Error(`\`name\` property is not set in ${ pkgJson.path }.`);
    }

    return pkgJson.content.name;
  });

  const today = new Date();
  const newVersion = `${ today.getFullYear() }.${ today.getMonth() + 1 }.${ today.getDate() }`;

  for (const pkgJson of pkgJsons) {
    if (pkgJson.content.version) {
      pkgJson.content.version = newVersion;
    }

    for (const pkgName of pkgNames) {
      if (pkgJson.content.dependencies?.[pkgName]) {
        pkgJson.content.dependencies[pkgName] = newVersion;
      }
      if (pkgJson.content.devDependencies?.[pkgName]) {
        pkgJson.content.devDependencies[pkgName] = newVersion;
      }
    }

    await writeFile(pkgJson.path, JSON.stringify(pkgJson.content, null, 2) + "\n");
  }

}
