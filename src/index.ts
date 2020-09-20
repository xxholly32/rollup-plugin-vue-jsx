import { resolve, dirname, join } from "path";
import { Plugin } from "rollup";
import { createFilter, FilterPattern } from "@rollup/pluginutils";
import fs from "fs";

export type Options = {
  include?: FilterPattern;
  exclude?: FilterPattern;
};

export default (options: Options = {}): Plugin => {
  const vueJsxPublicPath = "vue-jsx";
  const vueJsxFilePath = "./vue-jsx-compat.ts";

  const filter = createFilter(options.include, options.exclude);

  return {
    name: "vueJsx",

    transform(code, id) {
      if (!filter(id)) return;

      if (id.endsWith("x")) {
        code += `\nimport { vueJsxCompat } from '${join(
          __dirname,
          "../src/vue-jsx-compat.ts"
        )}'`;
      }

      return {
        code: code,
        map: null,
      };
    },
  };
};
