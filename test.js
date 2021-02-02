const Tape = require("tape-modern");
const Katex = require("katex");

const unified = require("unified");
const rehypeParse = require("rehype-parse");
const rehypeStringify = require("rehype-stringify");

const rehypeKatexSvelte = require("./dist");

Tape.test("macros work", (t) => {
  t.ok(
    unified()
      .use(rehypeParse)
      .use(rehypeKatexSvelte, { macros: { "\\CC": "\\mathbb C" } })
      .use(rehypeStringify)
      .processSync('<span class="math-inline">\\CC</span>')
      .toString()
  );
});
