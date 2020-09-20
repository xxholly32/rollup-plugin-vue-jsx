const vueJsx = require('../dist/index')
import esbuild from "rollup-plugin-esbuild";

export default {
  input: 'example/index.js',
  output: {
    file: 'example/dist/index.js',
    format: 'cjs',
  },
  plugins: [
    vueJsx(),
    esbuild({
      jsxFactory: "vueJsxCompat"
    }),
  ],
}
