import { resolve } from "path";
import { Plugin } from "rollup";
import { createFilter } from "@rollup/pluginutils";
import { Options } from "./dts";

export default (options: Options = {}): Plugin => {
  options = Object.assign(
    {
      jsxCompatPath: resolve(__dirname, "../src/vue-jsx-compat.js"),
      jsxFactory: "vueJsxCompat",
    },
    options
  );

  const filter = createFilter(options.include, options.exclude);

  return {
    name: "vueJsx",

    transform(code, id) {
      if (!filter(id)) return;

      if (id.endsWith("x")) {
        code += `\nimport { ${options.jsxFactory} } from '${options.jsxCompatPath?.replace(/\\/g, '/')}'`;
      }

      return code;
    },
  };
};
