const merge = require('deepmerge');
const { createSpaConfig } = require('../../index.js');

const baseConfig = createSpaConfig();

module.exports = merge(baseConfig, {
  input: 'demo/js/index.html',
});
