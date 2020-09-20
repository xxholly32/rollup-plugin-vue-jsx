// Copy from vite/src/client/vueJsxCompat.ts
// TODO An improved JSX transform will be provided at a later stage.
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
