import { selectAll } from "hast-util-select";
import hastToString from "hast-util-to-string";
import hastFromString from "hast-util-from-string";
import type { Node } from "hast";

import { renderToString } from "katex";
import type { KatexOptions } from "katex";

export = (options: KatexOptions = {}) => (tree: Node) => {
  for (const node of selectAll(".math-inline,.math-display", tree)) {
    const displayMode = (<string[] | undefined>(
      node.properties?.className
    ))?.includes("math-display");
    const rendered = renderToString(hastToString(node), {
      ...options,
      displayMode,
    });
    hastFromString(node, `{@html ${JSON.stringify(rendered)}}`);
  }
};
