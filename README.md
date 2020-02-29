TODO:

- how to add polyfills to html etc?

- We used to check for `_options.input.endsWith('html')`, sfind a way to implement that somehow
```js
    plugins: {
      indexHTML: true,
      workbox: true,
      babel: true,
      ...(_options.plugins || {}),
    },
```

- confirm that the runtime helpers are indeed added, you can try with optional chaining for example

- Figure out babel for legacy. See comments in rollup.config.js

- which order do output plugins and 'global' plugins run? Is terser run before the output plugins? I assume terser needs to be last, or at least after babel


