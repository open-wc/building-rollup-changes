/** @typedef {import('./types').SpaOptions} SpaOptions */
/** @typedef {import('polyfills-loader').PolyfillsLoaderConfig} PolyfillsLoaderConfig */

const merge = require('deepmerge');
const html = require('@open-wc/rollup-plugin-html');
const polyfillsLoader = require('@open-wc/rollup-plugin-polyfills-loader');
const { createBasicConfig } = require('./createBasicConfig');
const { pluginWithOptions } = require('./utils');
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
  options = merge(
    {
      html: true,
      polyfillsLoader: true,
      legacyBuilds: {
        nomodule: false,
      },
    },
    options,
  );

  const htmlPlugin = pluginWithOptions(html, options.html, { inject: false });

  if (polyfillDynamicImport(polyfillsLoader)) {
    const outputConfig = Array.isArray(basicConfig.output)
      ? basicConfig.output[0]
      : basicConfig.output;

    outputConfig.dynamicImportFunction = 'importShim';
  }

  if (options.legacyBuilds.nomodule) {
    if (!htmlPlugin) {
      throw new Error('Cannot generate multi build outputs when html plugin is disabled');
    }

    basicConfig.output[0].plugins.push(htmlPlugin.addOutput('modern'));
    basicConfig.output[1].plugins.push(htmlPlugin.addOutput('legacy'));

    return merge(basicConfig, {
      plugins: [
        htmlPlugin,
        polyfillsLoader({
          modernOutput: 'modern',
          legacyOutput: {
            name: 'legacy',
            test: "!('noModule' in HTMLScriptElement.prototype)",
          },
          polyfills: defaultLegacyPolyfills,
        }),
      ],
    });
  } else {
    return merge(basicConfig, {
      plugins: [
        htmlPlugin,
        polyfillsLoader({
          polyfills: defaultPolyfills,
        }),
      ],
    });
  }
}

module.exports = { createSpaConfig };
