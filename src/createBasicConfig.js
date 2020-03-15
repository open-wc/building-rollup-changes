/** @typedef {import('./types').BasicOptions} BasicOptions */

/* eslint-disable no-param-reassign */
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const merge = require('deepmerge');
const { createBabelConfig } = require('./createBabelConfig');
const { filterFalsy, pluginWithOptions } = require('./utils');

/**
 * @param {BasicOptions} options
 */
function createBasicConfig(options = {}) {
  options = merge(
    {
      nodeResolve: true,
      babel: true,
      terser: true,
      developmentMode: !!process.env.ROLLUP_WATCH,
    },
    options,
  );
  const { developmentMode } = options;
  const fileName = `[${developmentMode ? 'name' : 'hash'}].js`;

  const config = {
    treeshake: !developmentMode,

    output: {
      entryFileNames: fileName,
      chunkFileNames: fileName,
      format: 'es',
      dir: 'dist',
      plugins: [
        babel.generated(
          merge(createBabelConfig(), {
            babelrc: false,
            configFile: false,
          }),
        ),
      ],
    },

    plugins: [
      pluginWithOptions(resolve, options.nodeResolve, {
        moduleDirectory: ['node_modules', 'web_modules'],
      }),

      pluginWithOptions(babel, options.babel, {
        babelHelpers: 'bundled',
        plugins: [
          // rollup doesn't support optional chaining yet, so we compile it here
          [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose: true }],
          require.resolve('babel-plugin-bundled-import-meta'),
          !developmentMode && [
            require.resolve('babel-plugin-template-html-minifier'),
            {
              modules: {
                'lit-html': ['html'],
                'lit-element': ['html', { name: 'css', encapsulation: 'style' }],
              },
              strictCSS: true,
              htmlMinifier: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeComments: true,
                caseSensitive: true,
              },
            },
          ],
        ].filter(filterFalsy),
      }),

      !developmentMode &&
        pluginWithOptions(terser, options.terser, { output: { comments: false } }),
    ].filter(filterFalsy),
  };

  // when we need to add an additional legacy build, we turn the output option into an array
  // of output configs
  if (options.additionalLegacyBuild) {
    config.output = [
      config.output,
      {
        ...config.output,
        entryFileNames: `legacy-${fileName}`,
        chunkFileNames: `legacy-${fileName}`,
        plugins: [
          babel.generated(
            merge(createBabelConfig(['ie 11']), {
              babelrc: false,
              configFile: false,
              plugins: [
                require.resolve('@babel/plugin-transform-modules-systemjs'),
                // necessary for systemjs to transform dynamic imports
                require.resolve('@babel/plugin-proposal-dynamic-import'),
              ],
            }),
          ),
        ],
      },
    ];
  }
  return config;
}

module.exports = { createBasicConfig };
