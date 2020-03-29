/* eslint-disable no-param-reassign */
/** @typedef {import('./types').SpaOptions} SpaOptions */
/** @typedef {import('polyfills-loader').PolyfillsLoaderConfig} PolyfillsLoaderConfig */

const merge = require('deepmerge');
const html = require('@open-wc/rollup-plugin-html');
const polyfillsLoader = require('@open-wc/rollup-plugin-polyfills-loader');
const path = require('path');
const { generateSW } = require('rollup-plugin-workbox');
const { createBasicConfig } = require('./createBasicConfig');
const { pluginWithOptions, applyServiceWorkerRegistration } = require('./utils');
const { defaultPolyfills } = require('./polyfills');

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

  const htmlPlugin = pluginWithOptions(html, opts.html, {
    minify: !opts.developmentMode,
    inject: false,
  });

  if (opts.legacyBuilds.nomodule) {
    if (!htmlPlugin) {
      throw new Error('Cannot generate multi build outputs when html plugin is disabled');
    }

    basicConfig.output[0].plugins.push(htmlPlugin.addOutput('module'));
    basicConfig.output[1].plugins.push(htmlPlugin.addOutput('nomodule'));

    return merge(basicConfig, {
      plugins: [
        // create HTML file output
        htmlPlugin,

        // inject polyfills loader into HTML
        pluginWithOptions(polyfillsLoader, opts.polyfillsLoader, {
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
          minify: !opts.developmentMode,
          polyfills: defaultPolyfills,
        }),
      ],
    });
  }

  return merge(basicConfig, {
    plugins: [
      // create HTML file output
      htmlPlugin,

      // inject polyfills loader into HTML
      pluginWithOptions(polyfillsLoader, opts.polyfillsLoader, {
        polyfills: {},
        minify: !opts.developmentMode,
      }),

      // generate service worker
      opts.workbox &&
        pluginWithOptions(generateSW, opts.workbox, {
          globIgnores: ['legacy-*.js'],
          navigateFallback: '/index.html',
          // where to output the generated sw
          swDest: path.join(process.cwd(), basicConfig.output.dir, 'sw.js'),
          // directory to match patterns against to be precached
          globDirectory: path.join(process.cwd(), basicConfig.output.dir),
          // cache any html js and css by default
          globPatterns: ['**/*.{html,js,css}'],
        }),

      // inject service worker into HTML page
      opts.injectServiceWorker && {
        name: 'rollup-plugin-inject-service-worker',
        generateBundle(_, bundle) {
          const htmlFileName = htmlPlugin.getHtmlFileName();
          const htmlSource = bundle[htmlFileName].source;
          bundle[htmlFileName].source = applyServiceWorkerRegistration(htmlSource);
        },
      },
    ],
  });
}

module.exports = { createSpaConfig };
