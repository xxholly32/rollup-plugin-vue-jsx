import { rollup } from "rollup";
import mockfs from "mock-fs";
import esbuild from "rollup-plugin-esbuild";
import vueJsx from "../src";
import { Options } from "../src/dts";

const build = async (
  options?: Options,
  { input = "./fixture/index.js" } = {}
) => {
  const bundle = await rollup({
    input,
    plugins: [
      vueJsx({
        jsxCompatPath: "./vue-jsx-compat.ts",
      }),
      esbuild({
        jsxFactory: "vueJsxCompat",
      }),
    ],
  });
  const { output } = await bundle.generate({ format: "cjs" });
  return output;
};

beforeAll(() => {
  mockfs({
    "./fixture/index.js": `
      import Foo from './foo'

      console.log(Foo)
    `,
    "./fixture/foo.tsx": `
      export default class Foo {
        render() {
          return <div className="hehe">hello there!!!</div>
        }
      }
    `,
    "./fixture/vue-jsx-compat.ts": `
      import { createVNode, isVNode, VNode } from 'vue';

      const slice = Array.prototype.slice;
      
      export function vueJsxCompat(
        tag: any,
        props = null,
        children: any = null
      ): VNode {
        if (arguments.length > 3 || isVNode(children)) {
          children = slice.call(arguments, 2);
        }
        return createVNode(tag, props, children);
      }
    `,
  });
});

afterAll(() => {
  mockfs.restore();
});

test("simple", async () => {
  const output = await build();
  expect(output[0].code).toMatchInlineSnapshot(`
    "'use strict';
    
    var vue = require('vue');

    const slice = Array.prototype.slice;
    function vueJsxCompat(tag, props = null, children = null) {
      if (arguments.length > 3 || vue.isVNode(children)) {
        children = slice.call(arguments, 2);
      }
      return vue.createVNode(tag, props, children);
    }
    
    class Foo {
      render() {
        return /* @__PURE__ */ vueJsxCompat(\\"div\\", {
          className: \\"hehe\\"
        }, \\"hello there!!!\\");
      }
    }

    console.log(Foo);
    "
  `);
});
