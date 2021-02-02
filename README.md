# rehype-katex-svelte

[rehype][rehype] plugin to transform `.math-inline` and `.math-display`
elements with [KaTeX][katex] into _Svelte-friendly_ markup nodes.

This plugin is functionally equivalent to [rehype-katex][rehype-katex] but is
specifically intended to be used with [mdsvex][mdsvex] (markdown format for
[Svelte][svelte]).

The key issue it addresses is that curly braces in LaTeX, e.g. `{x}`, conflict
with Svelte's template syntax; as such, using rehype-katex to serialize a LaTeX
expression such as `\frac{x}{y}` would result in "`x` is not defined" and "`y`
is not defined" errors. This plugin fixes those errors by rendering KaTeX
content via `{@html "..."}` instead of directly as HTML nodes (which is what
rehype-katex does), preventing curly-brace content from getting treated as
Svelte template expressions.

[katex]: https://katex.org
[rehype]: https://github.com/rehypejs/rehype
[rehype-katex]: https://github.com/remarkjs/remark-math/tree/HEAD/packages/rehype-katex
[mdsvex]: https://mdsvex.com
[svelte]: https://svelte.dev

## Usage

To use rehype-katex-svelte with mdsvex, import rehype-katex-svelte as you would
any other rehype plugin, and add it to your mdsvex config:

```js
import rehypeKatexSvelte from "rehype-katex-svelte";

mdsvex({
  rehypePlugins: [
    rehypeKatexSvelte,
    /* other rehype plugins... */
  ],
  /* other mdsvex config options... */
});
```

Options passed to the rehype-katex-svelte plugin are relayed directly to KaTeX:

```js
mdsvex({
  rehypePlugins: [
    [
      rehypeKatexSvelte,
      {
        macros: {
          "\\CC": "\\mathbb{C}",
          "\\vec": "\\mathbf",
        },
      },
    ],
    /* etc. */
  ],
  /* etc. */
});
```

> This plugin is not really _intended_ to be used directly with the rehype API,
> but nothing stops you from doing so if that's what gets you going:
>
> ```js
> rehype().use(rehypeKatexSvelte[, katexOptions])
> ```

## Caveats

- I didn't bother implementing some of rehype-katex's other features, e.g.
  `options.throwOnError`, because I didn't personally find a need for it.

- My code might not be following rehype "best practices"—this is literally my
  first attempt at a rehype plugin. If you'd like to help me improve my code,
  by all means go ahead! (Please open a PR.)

## Security

I haven't given _any_ thought to sanitizing inputs & protecting against XSS, so
beware! Make sure you only use rehype-katex-svelte on inputs you trust, i.e.
your own source code.

If you care about improving the security of this plugin, please open a PR, and
I'd be happy to merge it!

## Contributing

Feel free to open an issue, make a PR, email me, whatever. Code of conduct:
don't be a jerk.

## License

MIT @ [Kye Shi](https://github.com/kwshi)
