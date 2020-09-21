import { createFilter, FilterPattern } from "@rollup/pluginutils";

export type Options = {
  include?: FilterPattern;
  exclude?: FilterPattern;
  jsxFactory?: string;
  jsxCompatPath?: string;
};