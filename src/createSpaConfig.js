/** @typedef {import('./types').SpaOptions} SpaOptions */
/** @typedef {import('polyfills-loader').PolyfillsLoaderConfig} PolyfillsLoaderConfig */

const merge = require('deepmerge');
const html = require('@open-wc/rollup-plugin-html');
const polyfillsLoader = require('@open-wc/rollup-plugin-polyfills-loader');
const getWorkboxConfig = require('@open-wc/building-utils/get-workbox-config');
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
  options = merge(
    {
      html: true,
      polyfillsLoader: true,
      legacyBuilds: {
        nomodule: false,
      },
      serviceWorker: {
        addRegistration: false,
        generateSW: true
      }
    },
    options,
  );
  const { serviceWorker } = options;

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
      polyfillsLoader({
        polyfills: defaultPolyfills,
      }),
      serviceWorker.generateSW &&
      generateSW(getWorkboxConfig(basicConfig.output.dir)),
      serviceWorker.addRegistration &&
      serviceWorker.generateSW &&
      {
        name: 'rollup-plugin-register-sw',
        writeBundle(_, bundle) {
          const htmlFileName = htmlPlugin.getHtmlFileName();
          const outputPath = path.join(basicConfig.output.dir, htmlFileName);
          let htmlSource = bundle[htmlFileName].source;

          htmlSource = applyServiceWorkerRegistration(htmlSource)

          fs.writeFileSync(outputPath, htmlSource, { encoding: 'utf8', flag: 'w' });
        }
      },
    ],
  });
}

module.exports = { createSpaConfig };
