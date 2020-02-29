const html = require('@open-wc/rollup-plugin-html');
const { findSupportedBrowsers, defaultFileExtensions } = require('@open-wc/building-utils');
const customMinifyCss = require('@open-wc/building-utils/custom-minify-css');
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const { generateSW } = require('rollup-plugin-workbox');

const getWorkboxConfig = require('@open-wc/building-utils/get-workbox-config');

const production = !process.env.ROLLUP_WATCH;
const prefix = '[owc-building-rollup]'; // this is never used?

const htmlPlugin = html({inputPath: './index.html'});


// how to add polyfills to html etc?

function createConfig(_options) {
  console.log(_options);

  const options = {
    outputDir: 'dist',
    extensions: defaultFileExtensions,
    indexHTMLPlugin: {},
    ..._options,
    plugins: {
      indexHTML: true, // check for input somehow, previously: _options.input.endsWith('.html')
      workbox: true,
      babel: true,
      ...(_options.plugins || {}),
    },
  };

  return {
    input: options.input,
    treeshake: !!production,
    output: [
      {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        format: 'es',
        dir: 'dist',
        plugins: [
          htmlPlugin.addOutput(),

          options.plugins.babel  
          && babel.generated({
            plugins: [
              // confirm that the runtime helpers are indeed added, you can try with optional chaining for example
              require.resolve('@babel/plugin-transform-runtime'),
              require.resolve('@babel/plugin-syntax-dynamic-import'),
              require.resolve('@babel/plugin-syntax-import-meta'),
    
              [require.resolve('babel-plugin-bundled-import-meta'), { importStyle: 'baseURI' }],
              production && [
                require.resolve('babel-plugin-template-html-minifier'),
                {
                  modules: {
                    'lit-html': ['html'],
                    'lit-element': ['html', { name: 'css', encapsulation: 'style' }],
                  },
                  htmlMinifier: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeComments: true,
                    caseSensitive: true,
                    minifyCSS: customMinifyCss,
                  },
                },
              ],
            ].filter(_ => !!_),
            presets: [require.resolve('@babel/preset-modules')],
          }),

          production 
          && options.plugins.workbox 
          && generateSW(getWorkboxConfig(options.outputDir)),
        ],
      },
      {
        // dynamicImportFunction: 'importShim', // <-- (!) "output.dynamicImportFunction" is ignored for formats other than "esm".
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        format: 'system',
        dir: 'dist/legacy',
        plugins: [
          htmlPlugin.addOutput(),

          // Figure out babel for legacy
          // Running babel.generated on legacy gives:
          // (!) Plugin babel: The "include", "exclude" and "extensions" options are ignored when transforming the output. 
          // [!] (plugin babel) Error: Using Babel on the generated chunks is strongly discouraged for formats other than "esm" or "cjs" as it can easily break wrapper code and lead to accidentally created global variables. Instead, you should set "output.format" to "esm" and use Babel to transform to another format, e.g. by adding "presets: [['@babel/env', { modules: 'systemjs' }]]" to your Babel options. If you still want to proceed, add "allowAllFormats: true" to your plugin options.

          // options.plugins.babel 
          // && babel({
          //   exclude: options.babelExclude,
          //   extensions: options.extensions,
          //   babelHelpers: 'bundled',
          //   plugins: [
          //     require.resolve('@babel/plugin-syntax-dynamic-import'),
          //     require.resolve('@babel/plugin-syntax-import-meta'),
          //     // rollup rewrites import.meta.url, but makes them point to the file location after bundling
          //     // we want the location before bundling
          //     [require.resolve('babel-plugin-bundled-import-meta'), { importStyle: 'baseURI' }],
          //     production && [
          //       require.resolve('babel-plugin-template-html-minifier'),
          //       {
          //         modules: {
          //           'lit-html': ['html'],
          //           'lit-element': ['html', { name: 'css', encapsulation: 'style' }],
          //         },
          //         htmlMinifier: {
          //           collapseWhitespace: true,
          //           conservativeCollapse: true,
          //           removeComments: true,
          //           caseSensitive: true,
          //           minifyCSS: customMinifyCss,
          //         },
          //       },
          //     ],
          //   ].filter(_ => !!_),

          //   presets: [
          //     [
          //       require.resolve('@babel/preset-env'),
          //       {
          //         targets: ['ie 11'],
          //         exclude: undefined,
          //         useBuiltIns: false,
          //         modules: false,
          //       },
          //     ],
          //   ],
          // }),
        ],
      },
    ],
    plugins: [
      htmlPlugin,
      resolve({
        extensions: options.extensions,
        moduleDirectory: ['node_modules', 'web_modules'],
      }),
      // which order do output plugins and these plugins run? Is terser run before the output plugins? I assume terser needs to be last, or at least after babel
      production 
      && terser({
        exclude: options.terserExclude,
      }),
    ],
  };
}

module.exports = createConfig({});