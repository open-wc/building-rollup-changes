/* eslint-disable no-param-reassign */
/** @typedef {import('./types').SpaOptions} SpaOptions */
/** @typedef {import('polyfills-loader').PolyfillsLoaderConfig} PolyfillsLoaderConfig */

const merge = require('deepmerge');
const html = require('@open-wc/rollup-plugin-html');
const polyfillsLoader = require('@open-wc/rollup-plugin-polyfills-loader');
const path = require('path');
const { generateSW } = require('rollup-plugin-workbox');
const { createBasicConfig } = require('./createBasicConfig');
const {
  pluginWithOptions,
  applyServiceWorkerRegistration,
  injectPreloadEntrypoints,
  isFalsy,
} = require('./utils');
const { defaultPolyfills } = require('./polyfills');

/**
 * @param {SpaOptions} options
 */
function createSpaConfig(options) {
  const basicConfig = createBasicConfig(options);
  const userOptions = merge(
    {
      html: true,
      polyfillsLoader: true,
      workbox: true,
      injectServiceWorker: false,
      legacyBuilds: {
        nomodule: false,
      },
    },
    options,
  );
  let outputDir = basicConfig.output.dir;

  const htmlPlugin = pluginWithOptions(html, userOptions.html, {
    minify: !userOptions.developmentMode,
    transform: [
      injectPreloadEntrypoints,
      userOptions.injectServiceWorker && applyServiceWorkerRegistration,
    ].filter(isFalsy),
    inject: false,
  });

  let polyfillsLoaderConfig = {
    polyfills: {},
    minify: !userOptions.developmentMode,
  };

  if (userOptions.legacyBuilds.nomodule) {
    if (!htmlPlugin) {
      throw new Error('Cannot generate multi build outputs when html plugin is disabled');
    }
    outputDir = basicConfig.output[0].dir;

    basicConfig.output[0].plugins.push(htmlPlugin.addOutput('module'));
    basicConfig.output[1].plugins.push(htmlPlugin.addOutput('nomodule'));
    polyfillsLoaderConfig = {
      modernOutput: {
        name: 'module',
        type: 'module',
      },
      legacyOutput: {
        name: 'nomodule',
        type: 'systemjs',
        test:
          // test if browser supports dynamic imports (and thus modules). import.meta.url cannot be tested
          "(function(){try{Function('!function(){import(_)}').call();return false;}catch(_){return true}})()",
      },
      minify: !userOptions.developmentMode,
      polyfills: defaultPolyfills,
    };
  }

  return merge(basicConfig, {
    plugins: [
      // create HTML file output
      htmlPlugin,

      // inject polyfills loader into HTML
      pluginWithOptions(polyfillsLoader, userOptions.polyfillsLoader, polyfillsLoaderConfig),

      // generate service worker
      userOptions.workbox &&
        pluginWithOptions(generateSW, userOptions.workbox, {
          globIgnores: ['legacy-*.js'],
          navigateFallback: '/index.html',
          // where to output the generated sw
          swDest: path.join(process.cwd(), outputDir, 'sw.js'),
          // directory to match patterns against to be precached
          globDirectory: path.join(process.cwd(), outputDir),
          // cache any html js and css by default
          globPatterns: ['**/*.{html,js,css}'],
        }),
    ],
  });
}

module.exports = { createSpaConfig };
