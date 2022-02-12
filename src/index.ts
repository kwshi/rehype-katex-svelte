import { selectAll } from "hast-util-select";
import { toString as hastToString } from "hast-util-to-string";
import { fromString as hastFromString } from "hast-util-from-string";
import type { Root } from "hast";
import type { Plugin } from "unified";

// TODO fix katex types: currently `@types/katex`'s type stubs pretend katex
// exports properties on a module level (i.e. `export const`), but actually it
// `export default`s a single object with properties.  The difference is that
// `export const renderToString` allows syntax like `import {renderToString}
// from 'katex'` to work, whereas `export default {renderToString}` doesn't and
// instead requires `import Katex` (default) and `Katex.renderToString`.
// Currently this relies on `allowSyntheticDefaultImports` to type-check, but
// it really shouldn't, because the type declaration is wrong.
import Katex from "katex";

import type { KatexOptions } from "katex";

const rehypeKatexSvelte: Plugin<[KatexOptions?], Root, Root> =
  (options: KatexOptions = {}) =>
  (tree: Root) => {
    for (const node of selectAll(".math-inline,.math-display", tree)) {
      const displayMode = (<string[] | undefined>(
        node.properties?.className
      ))?.includes("math-display");
      const rendered = Katex.renderToString(hastToString(node), {
        ...options,
        displayMode,
      });
      hastFromString(node, `{@html ${JSON.stringify(rendered)}}`);
    }
  };

export default rehypeKatexSvelte;
