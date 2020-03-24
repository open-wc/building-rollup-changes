/** @typedef {import('./types').BasicOptions} BasicOptions */

/* eslint-disable no-param-reassign */
const resolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const merge = require('deepmerge');
const {
  createBabelConfigRollupBuild,
  babelConfigRollupGenerate,
  babelConfigLegacyRollupGenerate,
} = require('./babel-configs');
const { isFalsy, pluginWithOptions } = require('./utils');

/**
 * @param {BasicOptions} options
 */
function createBasicConfig(options = {}) {
  options = merge(
    {
      developmentMode: !!process.env.ROLLUP_WATCH,
      nodeResolve: true,
      babel: true,
      terser: true,
      legacyBuilds: {
        nomodule: false,
      },
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
      plugins: [babel.generated(babelConfigRollupGenerate)],
    },

    plugins: [
      pluginWithOptions(resolve, options.nodeResolve, {
        moduleDirectory: ['node_modules', 'web_modules'],
      }),

      pluginWithOptions(babel, options.babel, createBabelConfigRollupBuild(developmentMode)),

      !developmentMode &&
        pluginWithOptions(terser, options.terser, { output: { comments: false } }),
    ].filter(isFalsy),
  };

  // when we need to add an additional legacy build, we turn the output option into an array
  // of output configs
  if (options.legacyBuilds.nomodule) {
    config.output = [
      config.output,
      {
        ...config.output,
        entryFileNames: `nomodule-${fileName}`,
        chunkFileNames: `nomodule-${fileName}`,
        plugins: [babel.generated(babelConfigLegacyRollupGenerate)],
      },
    ];
  }
  return config;
}

module.exports = { createBasicConfig };
