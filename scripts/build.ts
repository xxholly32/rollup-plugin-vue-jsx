import module from "module";
import { rollup } from "rollup";

import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const pkg: { [k: string]: any } = require("../package.json");
const deps = Object.keys(pkg.dependencies);

async function main() {
  const external = [...deps, ...module.builtinModules];

  async function build() {
    const bundle = await rollup({
      input: "./src/index.ts",
      external,
      plugins: [esbuild({
        include: /\.[jt]sx?$/, // default, inferred from `loaders` option
        loaders: {
          // Add .json files support
          // require @rollup/plugin-commonjs
          '.json': 'json',
          // Enable JSX in .js files too
          '.js': 'jsx',
          // Enable JSX in .js files too
          '.tsx': 'tsx',
        },
      })],
    });

    await bundle.write({ file: "./dist/index.js", format: "cjs" });
  }

  async function createDtsFile() {
    const bundle = await rollup({
      input: "./src/dts.ts",
      // https://github.com/Swatinem/rollup-plugin-dts/issues/120#issuecomment-711754551
      external,
      plugins: [dts()],
    });

    await bundle.write({ file: "./dist/index.d.ts" });
  }

  await Promise.all([build(), createDtsFile()]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
