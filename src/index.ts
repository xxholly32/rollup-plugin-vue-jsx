import { join } from "path";
import { Plugin } from "rollup";
import { createFilter } from "@rollup/pluginutils";
import { Options } from "./dts";

export default (options: Options = {}): Plugin => {
  options = Object.assign(
    {
      jsxCompatPath: join(__dirname, "../src/vue-jsx-compat.ts"),
      jsxFactory: "vueJsxCompat",
    },
    options
  );
  console.log(options.jsxCompatPath);

  const filter = createFilter(options.include, options.exclude);

  return {
    name: "vueJsx",

    transform(code, id) {
      if (!filter(id)) return;

      if (id.endsWith("x")) {
        code += `\nimport { ${options.jsxFactory} } from '${options.jsxCompatPath}'`;
      }

      return code;
    },
  };
};
