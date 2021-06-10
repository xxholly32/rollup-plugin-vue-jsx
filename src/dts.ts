import { FilterPattern } from '@rollup/pluginutils';
import { Plugin } from 'rollup';

export type Options = {
  include?: FilterPattern;
  exclude?: FilterPattern;
  jsxFactory?: string;
  jsxCompatPath?: string;
};

declare function vueJsx(options: Options): Plugin;

export default vueJsx;
