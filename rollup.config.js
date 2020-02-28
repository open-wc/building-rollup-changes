// @ts-nocheck
const { findSupportedBrowsers, defaultFileExtensions } = require('@open-wc/building-utils');
const customMinifyCss = require('@open-wc/building-utils/custom-minify-css');
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const indexHTML = require('rollup-plugin-index-html');
const { generateSW } = require('rollup-plugin-workbox');

const getWorkboxConfig = require('@open-wc/building-utils/get-workbox-config');

const production = !process.env.ROLLUP_WATCH;
const prefix = '[owc-building-rollup]';

/**
 * Function which creates a config so that we can create a modern and a legacy config
 * with small alterations.
 * @param {object} _options
 * @param {boolean} legacy
 */
function createConfig(_options, legacy) {
  const options = {
    outputDir: 'dist',
    extensions: defaultFileExtensions,
    indexHTMLPlugin: {},
    ..._options,
    plugins: {
      indexHTML: _options.input.endsWith('.html'),
      workbox: true,
      babel: true,
      ...(_options.plugins || {}),
    },
  };

  return {
    input: options.input,
    treeshake: !!production,
    output: {
      dir: path.join(options.outputDir, legacy ? '/legacy' : ''),
      format: legacy ? 'system' : 'esm',
      sourcemap: true,
      dynamicImportFunction: !legacy && 'importShim',
      entryFileNames: '[name]-[hash].js',
      chunkFileNames: '[name]-[hash].js',
    },
    plugins: [
      options.plugins.indexHTML &&
        indexHTML({
          ...(options.indexHTMLPlugin || {}),
          multiBuild: true,
          legacy,
          polyfills: {
            ...((options.indexHTMLPlugin && options.indexHTMLPlugin.polyfills) || {}),
            dynamicImport: true,
            coreJs: true,
            regeneratorRuntime: true,
            webcomponents: true,
            systemJs: true,
            fetch: true,
          },
        }),

      resolve({
        extensions: options.extensions,
        moduleDirectory: ['node_modules', 'web_modules'],
      }),

      options.plugins.babel 
      && legacy
      && babel({
        exclude: options.babelExclude,
        extensions: options.extensions,
        babelHelpers: 'bundled',
        plugins: [
          require.resolve('@babel/plugin-syntax-dynamic-import'),
          require.resolve('@babel/plugin-syntax-import-meta'),
          // rollup rewrites import.meta.url, but makes them point to the file location after bundling
          // we want the location before bundling
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

        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              targets: legacy ? ['ie 11'] : findSupportedBrowsers(),
              exclude: legacy ? undefined : ['@babel/plugin-transform-template-literals'],
              useBuiltIns: false,
              modules: false,
            },
          ],
        ],
      }),

      options.plugins.babel 
      && !legacy
      && babel.generated({
        plugins: [
          // is plugin-transform-runtime needed with preset-modules? and is this the way to do it?
          // with babel({}) you can just do `babelHelpers: 'bundled'`, but with babel.generated that doesnt seem to work
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

      production &&
        terser({
          exclude: options.terserExclude,
        }),

      production &&
        options.plugins.workbox &&
        !legacy &&
        generateSW(getWorkboxConfig(options.outputDir)),
    ],
  };
}

function createDefaultConfig(options) {
  if (!options.input) {
    throw new Error(`${prefix}: missing option 'input'.`);
  }

  return [createConfig(options, true), createConfig(options, false)];
};

module.exports = createDefaultConfig({input:'./index.html'});