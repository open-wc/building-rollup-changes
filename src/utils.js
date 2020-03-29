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

function injectPreloadEntrypoints(html, { bundle, bundles }) {
  const { entrypoints } = bundles.module || bundle;
  let preloaded = [];
  for (const entrypoint of entrypoints) {
    preloaded.push(entrypoint.importPath);
    preloaded.push(...entrypoint.chunk.imports);
  }
  preloaded = [...new Set(preloaded)];

  return html.replace(
    '</head>',
    preloaded
      .map(
        i =>
          `<link rel="preload" href="${
            i.startsWith('./') ? i : `./${i}`
          }" as="script" crossorigin="anonymous">`,
      )
      .join(''),
  );
}

/**
 * @param {string} htmlString
 * @returns {string}
 */
function applyServiceWorkerRegistration(htmlString) {
  console.log('applyServiceWorkerRegistration', htmlString);
  const documentAst = parse(htmlString);
  const body = query(documentAst, predicates.hasTagName('body'));
  const swRegistration = createScript(
    {},
    Terser.minify(`
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker
          .register('./sw.js')
          .then(function() {
            console.log('ServiceWorker registered.');
          })
          .catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  `).code,
  );

  append(body, swRegistration);
  return serialize(documentAst);
}

module.exports = {
  isFalsy,
  pluginWithOptions,
  applyServiceWorkerRegistration,
  injectPreloadEntrypoints,
};
