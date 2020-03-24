const merge = require('deepmerge');
const { createScript } = require('@open-wc/building-utils');
const { parse, serialize } = require('parse5');
const { append, predicates, query } = require('@open-wc/building-utils/dom5-fork');
const Terser = require('terser');

const isFalsy = _ => !!_;

function pluginWithOptions(plugin, userConfig, defaultConfig) {
  if (!userConfig) {
    return undefined;
  }

  const config = merge(defaultConfig, typeof userConfig === 'object' ? userConfig : {});
  return plugin(config);
}

/**
 * TODO: this could potentially be moved to @open-wc/building-utils maybe?
 * Applies the service worker registration to the index.html
 * @param {string} htmlString
 * @returns {string}
 */
function applyServiceWorkerRegistration(htmlString) {
  const documentAst = parse(htmlString);
  const body = query(documentAst, predicates.hasTagName('body'));
  const swRegistration = createScript(
    {},
    Terser.minify(`
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(() => {
          console.log('ServiceWorker registered!');
        }, (err) => {
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  `).code,
  );

  append(body, swRegistration);
  return serialize(documentAst);
}

module.exports = { isFalsy, pluginWithOptions, applyServiceWorkerRegistration };
