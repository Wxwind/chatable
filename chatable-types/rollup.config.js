const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");

module.exports = [
  {
    input: "src/index.ts",
    plugins: [typescript()],
    output: [
      {
        dir: "./bin",
        format: "cjs",
      },
    ],
  },
];
