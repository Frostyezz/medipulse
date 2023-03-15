const { readdirSync, writeFile } = require("fs");
const watchr = require("watchr");

const TARGET_DIR = "./src/pages";
const DEST_DIR = "./src/common/utils/routes.ts";

function listener(changeType) {
  if (changeType === "update") return;
  const getFileList = (dirName) => {
    let files = [];
    const items = readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        files = [
          ...files,
          `${dirName.substring(TARGET_DIR.length)}/${item.name}`,
          ...getFileList(`${dirName}/${item.name}`),
        ];
      } else {
        if (
          item.name[0] === "_" ||
          item.name.includes("index") ||
          item.name.includes("404")
        )
          continue;
        files.push(`${dirName.substring(TARGET_DIR.length)}/${item.name}`);
      }
    }

    return files;
  };

  const filePaths = getFileList(TARGET_DIR);
  const params = filePaths.map((item) => item.match(/\[(.*?)\]/g));

  const routes = filePaths.map((item) =>
    item
      .substring(0, item.includes(".tsx") ? item.length - 4 : item.length)
      .substring(0, item.includes(".ts") ? item.length - 3 : item.length)
      .replace(/\[/g, ":")
      .replace(/]/g, "")
  );
  const routeKeys = filePaths.map((item) =>
    item
      .substring(0, item.includes(".tsx") ? item.length - 4 : item.length)
      .substring(0, item.includes(".ts") ? item.length - 3 : item.length)
      .slice(1)
      .replace(/\[/g, "")
      .replace(/]/g, "")
      .replace(/\//g, "_")
      .replace(/-/g, "_")
      .toUpperCase()
  );

  const _enum = `export enum ROUTES {
  ROOT = '/', \r
  NOT_FOUND = '/404',
  ${routeKeys.map((key, i) => `${i ? "\r  " : ""}${key} = '${routes[i]}'`)}
}`;

  const _type = `export type TArgs =\r| [ROUTES.ROOT]${routeKeys.map(
    (key, i) =>
      `\r| [ROUTES.${key}${
        params[i]
          ? `, {${params[i].map((param) => ` ${param.slice(1, -1)}: string`)}}`
          : ""
      }]`
  )};`.replace(/],/g, "]");

  writeFile(DEST_DIR, `${_enum}\r\r${_type}\r`, (err) => {
    if (err) return console.log("ROUTE GENERATION FAILED WITH ERROR", err);
    console.log("ROUTES GENERATED SUCCESFULLY!");
  });
}

function next(err) {
  if (err)
    return console.log(
      "ROUTE GENERATION WATCH FAILED AT",
      TARGET_DIR,
      "WITH ERROR",
      err
    );
  console.log("ROUTE GENERATION WATCHING", TARGET_DIR);
}

watchr.open(TARGET_DIR, listener, next);
