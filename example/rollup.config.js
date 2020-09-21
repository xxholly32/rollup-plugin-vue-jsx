const vueJsx = require("../dist/index");
const esbuild = require("rollup-plugin-esbuild");

export default {
  input: "example/index.js",
  output: {
    file: "example/dist/index.js",
    format: "esm",
  },
  plugins: [
    vueJsx(),
    esbuild({
      jsxFactory: "vueJsxCompat",
    }),
  ],
};
