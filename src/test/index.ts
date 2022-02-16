import * as Tape from "tape-modern";

import * as Unified from "unified";

//const unified = import("unified");
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

import rehypeKatexSvelte from "../";

Tape.test("macros work", (t) => {
  t.ok(
    Unified.unified()
      .use(rehypeParse)
      .use(rehypeKatexSvelte, { macros: { "\\CC": "\\mathbb C" } })
      .use(rehypeStringify)
      .processSync('<span class="math-inline">\\CC</span>')
      .toString()
  );
});
