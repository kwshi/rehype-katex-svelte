# rehype-katex-svelte

[rehype][rehype] plugin to transform `.math-inline` and `.math-display`
elements with [KaTeX][katex] into _Svelte-friendly_ markup nodes.

This plugin is functionally equivalent to [rehype-katex][rehype-katex] but is
specifically intended to be used with [mdsvex][mdsvex] (markdown format for
[Svelte][svelte]).

The key issue it addresses is that LaTeX curly braces (e.g. `{x}`) conflict
with Svelte's template syntax; as such, using rehype-katex to serialize a LaTeX
expression such as `\frac{x}{y}` would result in "`x` is not defined" and "`y`
is not defined" errors. This plugin fixes those errors by rendering KaTeX
content via `{@html "..."}` instead of plain HTML nodes (which is what
rehype-katex does), preventing curly-brace content from getting treated as
Svelte template expressions.

[katex]: https://katex.org
[rehype]: https://github.com/rehypejs/rehype
[rehype-katex]: https://github.com/remarkjs/remark-math/tree/HEAD/packages/rehype-katex
[mdsvex]: https://mdsvex.com
[svelte]: https://svelte.dev

## Usage

To use rehype-katex-svelte with mdsvex, you need to import rehype-katex-svelte **and** [remark-math](https://github.com/remarkjs/remark-math) and add both to mdsvex's config:

> **Note:** mdsvex uses an old remark version so you need remark-math@3.0.0
> ```bash
> npm install -D remark-math@3.0.0
> ```

```js
import rehypeKatexSvelte from "rehype-katex-svelte";
import remarkMath from 'remark-math'

mdsvex({
  remarkPlugins: [
    remarkMath,
  ],
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

Then you start writing maths in your .svx files

```svelte
<!-- blog-post.svx -->
<!-- inline -->
$f(x) = x^2$
<!-- block -->
$$
f(x) = x^2
$$
```

You might also want to add `katex.css` somewhere to style the maths properly

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous">
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

GPLv3 @ [Kye Shi](https://github.com/kwshi)
