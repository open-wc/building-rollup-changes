const merge = require('deepmerge');
const { createSpaConfig } = require('../../index.js');

const baseConfig = createSpaConfig({
  legacyBuilds: {
    nomodule: true,
  },
});

module.exports = merge(baseConfig, {
  input: 'demo/js/index.html',
});
