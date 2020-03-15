/** @typedef {import('./types').SpaOptions} SpaOptions */

const merge = require('deepmerge');
const html = require('@open-wc/rollup-plugin-html');
const polyfillsLoader = require('@open-wc/rollup-plugin-polyfills-loader');
const { createBasicConfig } = require('./createBasicConfig');

/**
 * @param {SpaOptions} options
 */
function createSpaConfig(options) {
  const basicConfig = createBasicConfig(options);

  const htmlPlugin = html({ inject: false });
  if (options.additionalLegacyBuild) {
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
          polyfills: {
            coreJs: true,
            fetch: true,
            webcomponents: true,
          },
        }),
      ],
    });
  } else {
    return merge(basicConfig, {
      plugins: [
        htmlPlugin,
        polyfillsLoader({
          polyfills: {
            coreJs: true,
            fetch: true,
            webcomponents: true,
          },
        }),
      ],
    });
  }
}

module.exports = { createSpaConfig };
