const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

module.exports = [
  {
    input: "src/index.ts",
    plugins: [resolve(), commonjs(), typescript()],
    output: [
      {
        file: "bin/index.js",
        format: "cjs",
      },
    ],
  },
];
