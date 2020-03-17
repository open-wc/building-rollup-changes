const deepmerge = require('deepmerge');
const { createBasicConfig } = require('../../index.js');

const baseConfig = createBasicConfig({});

module.exports = deepmerge(baseConfig, {
  input: './demo/js/demo-app.js',
});
