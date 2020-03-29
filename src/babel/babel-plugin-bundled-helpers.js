const { types } = require('@babel/core');
const { HELPER_MODULE_NAME } = require('./rollup-plugin-bundled-babel-helpers');

const caches = new WeakMap();

function addOrGetNamedImport(file, name, prefixName) {
  let cache = caches.get(file);
  if (!cache) {
    const importDeclaration = types.importDeclaration([], types.stringLiteral(HELPER_MODULE_NAME));
    file.path.node.body.unshift(importDeclaration);
    cache = { identifiers: new Map(), importDeclaration };
    caches.set(file, cache);
  }
  const { identifiers, importDeclaration } = cache;

  let identifier = identifiers.get(name);
  if (!identifier) {
    identifier = types.identifier(prefixName ? `_${name}` : name);
    const importIdentifier = types.identifier(name);
    identifiers.set(name, identifier);
    importDeclaration.specifiers.push(types.importSpecifier(identifier, importIdentifier));
  }

  return identifier;
}

/**
 * Babel plugin which imports babel helpers from a helper module.
 */
const babelPluginBundledHelpers = {
  pre(file) {
    file.set('helperGenerator', name => addOrGetNamedImport(file, name, true));
  },

  visitor: {
    ReferencedIdentifier(path) {
      const { node } = path;
      const { name } = node;

      if (name === 'regeneratorRuntime') {
        addOrGetNamedImport(path.hub.file, 'regeneratorRuntime');
      }
    },
  },
};

module.exports = { babelPluginBundledHelpers };
