const deepmerge = require('deepmerge');
const { createBasicConfig } = require('../../index.js');

const baseConfig = createBasicConfig({
  developmentMode: true,
});

module.exports = deepmerge(baseConfig, {
  input: './demo/js/syntax.js',
});
