const { findSupportedBrowsers } = require('./findSupportedBrowsers');

function createBabelConfig(targets = findSupportedBrowsers()) {
  console.log('targets', targets);
  return {
    presets: [
      // can be removed when https://github.com/babel/babel/pull/11083 is merged
      require.resolve('@babel/preset-modules'),
      [
        require.resolve('@babel/preset-env'),
        {
          targets,
          // exclude some babel transforms because @babel/preset-modules handles them, can be removed
          // when https://github.com/babel/babel/pull/11083 is merged
          exclude: [
            '@babel/plugin-transform-parameters',
            '@babel/plugin-transform-template-literals',
          ],
          useBuiltIns: false,
          shippedProposals: true,
          modules: false,
        },
      ],
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-syntax-import-meta'),
    ],
  };
}

module.exports = { createBabelConfig };
