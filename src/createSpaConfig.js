const merge = require('deepmerge');
const html = require('@open-wc/rollup-plugin-html');
const polyfillsLoader = require('@open-wc/rollup-plugin-polyfills-loader');
const { createBasicConfig } = require('./createBasicConfig');

function createSpaConfig(options) {
  const basicConfig = createBasicConfig(options);

  const htmlPlugin = html({ inject: false });
  basicConfig.output[0].plugins.push(htmlPlugin.addOutput('legacy'));
  basicConfig.output[1].plugins.push(htmlPlugin.addOutput('modern'));

  return merge(basicConfig, {
    plugins: [
      htmlPlugin,
      polyfillsLoader({
        modernOutput: 'modern',
        legacyOutput: { name: 'legacy', test: "!('noModule' in HTMLScriptElement.prototype)" },
        polyfills: {
          coreJs: true,
          fetch: true,
          webcomponents: true,
        },
      }),
    ],
  });
}

module.exports = { createSpaConfig };
