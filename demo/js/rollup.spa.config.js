const { createSpaConfig } = require('../../index.js');

const baseConfig = createSpaConfig({
  indexHtmlPath: 'demo/js/index.html',
});

module.exports = baseConfig;
