/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable no-undef */
import esbuild from "esbuild";
import fs from "fs";
import path from "path";

const env = process.argv[2];

let fileArray = [];
const getFilesRecursively = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath);
    } else {
      fileArray.push(filePath);
    }
  });
};
getFilesRecursively("src");

const entryPoints = fileArray.filter((file) => file.endsWith(".ts"));

esbuild.build({
  entryPoints,
  logLevel: "info",
  outdir: env === "dev" ? "dist" : "build",
  bundle: env === "dev" ? false : true,
  platform: "node",
  format: "cjs",
});
