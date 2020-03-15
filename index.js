const { createBasicConfig } = require('./src/createBasicConfig');
const { createSpaConfig } = require('./src/createSpaConfig');
const {
  createBabelConfigRollupBuild,
  babelConfigRollupGenerate,
  babelConfigLegacyRollupGenerate,
} = require('./src/babel-configs');

module.exports = {
  createBasicConfig,
  createSpaConfig,
  createBabelConfigRollupBuild,
  babelConfigRollupGenerate,
  babelConfigLegacyRollupGenerate,
};
