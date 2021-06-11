# rollup-plugin-vue-jsx

work with [rollup-plugin-esbuild](https://github.com/egoist/rollup-plugin-esbuild)， and just for vue-jsx

change `foo.tsx`

```js
export default class Foo {
  render() {
    return <div className="hehe">hello there!!!</div>;
  }
}
```

to

```js
import { createVNode, isVNode } from "vue";

const slice = Array.prototype.slice;
function vueJsxCompat(tag, props = null, children = null) {
  if (arguments.length > 3 || isVNode(children)) {
    children = slice.call(arguments, 2);
  }
  return createVNode(tag, props, children);
}

class Foo {
  render() {
    return /* @__PURE__ */ vueJsxCompat(
      "div",
      {
        className: "hehe",
      },
      "hello there!!!"
    );
  }
}
```

add [vue-jsx-compat](https://github.com/xxholly32/rollup-plugin-vue-jsx/blob/master/src/vue-jsx-compat.js) to transform vue-jsx

## how to use

```js
import vueJsx from "rollup-plugin-vue-jsx-compat"
import esbuild from "rollup-plugin-esbuild";

export default {
  ...
  plugins: [
    vueJsx(),
    esbuild({
      jsxFactory: "vueJsxCompat",
    }),
  ],
};
```

or you can add your config

```js
vueJsx({
  // it only use same function name with esbuild
  jsxFactory: "vueJsxCompat",
  // if you not use default vus-jsx-transformer, you write your own file path in here
  path: "you file path",
});
```
