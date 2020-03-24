/** @typedef {import('./types').SpaOptions} SpaOptions */
/** @typedef {import('polyfills-loader').PolyfillsLoaderConfig} PolyfillsLoaderConfig */

const merge = require('deepmerge');
const html = require('@open-wc/rollup-plugin-html');
const polyfillsLoader = require('@open-wc/rollup-plugin-polyfills-loader');
const fs = require('fs');
const path = require('path');
const { generateSW } = require('rollup-plugin-workbox');
const { createBasicConfig } = require('./createBasicConfig');
const { pluginWithOptions, applyServiceWorkerRegistration } = require('./utils');
const { defaultPolyfills, defaultLegacyPolyfills } = require('./polyfills');

/**
 * @param {PolyfillsLoaderConfig | boolean} userConfig
 */
function polyfillDynamicImport(userConfig) {
  if (typeof userConfig.polyfills === 'object' && 'dynamicImport' in userConfig.polyfills) {
    // user has set dynamic import option explicitly
    return userConfig.polyfills.dynamicImport;
  }
  // config is a boolean, if false no polyfills will be loaded at all, otherwise defaults will be loaded
  return !!userConfig;
}

/**
 * @param {SpaOptions} options
 */
function createSpaConfig(options) {
  const basicConfig = createBasicConfig(options);
  const opts = merge(
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

  const htmlPlugin = pluginWithOptions(html, opts.html, { inject: false });

  if (polyfillDynamicImport(polyfillsLoader)) {
    const outputConfig = Array.isArray(basicConfig.output)
      ? basicConfig.output[0]
      : basicConfig.output;

    outputConfig.dynamicImportFunction = 'importShim';
  }

  if (opts.legacyBuilds.nomodule) {
    if (!htmlPlugin) {
      throw new Error('Cannot generate multi build outputs when html plugin is disabled');
    }

    basicConfig.output[0].plugins.push(htmlPlugin.addOutput('modern'));
    basicConfig.output[1].plugins.push(htmlPlugin.addOutput('legacy'));

    return merge(basicConfig, {
      plugins: [
        htmlPlugin,
        pluginWithOptions(polyfillsLoader, opts.polyfillsLoader, {
          modernOutput: {
            name: 'modern',
            type: 'module',
          },
          legacyOutput: {
            name: 'legacy',
            type: 'systemjs',
            test: "!('noModule' in HTMLScriptElement.prototype)",
          },
          polyfills: defaultLegacyPolyfills,
        }),
      ],
    });
  }

  return merge(basicConfig, {
    plugins: [
      htmlPlugin,

      pluginWithOptions(polyfillsLoader, opts.polyfillsLoader, { polyfills: defaultPolyfills }),

      opts.workbox &&
        pluginWithOptions(generateSW, opts.workbox, {
          globIgnores: ['/legacy/*.js'],
          navigateFallback: '/index.html',
          // where to output the generated sw
          swDest: path.join(process.cwd(), basicConfig.output.dir, 'sw.js'),
          // directory to match patterns against to be precached
          globDirectory: path.join(process.cwd(), basicConfig.output.dir),
          // cache any html js and css by default
          globPatterns: ['**/*.{html,js,css}'],
        }),

      opts.injectServiceWorker && {
        name: 'rollup-plugin-inject-service-worker',
        generateBundle(_, bundle) {
          const name = htmlPlugin.getHtmlFileName();
          const htmlSource = bundle[name].source;
          bundle[name].source = applyServiceWorkerRegistration(htmlSource);
        },
      },
    ],
  });
}

module.exports = { createSpaConfig };
