const merge = require('deepmerge');

const filterFalsy = _ => !!_;

function pluginWithOptions(plugin, userConfig, defaultConfig) {
  if (!userConfig) {
    return undefined;
  }

  const config = merge(defaultConfig, typeof userConfig === 'object' ? userConfig : {});
  return plugin(config);
}

module.exports = { filterFalsy, pluginWithOptions };