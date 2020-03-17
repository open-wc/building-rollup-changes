const { findModernBrowserslist } = require('./findModernBrowserslist');
const { isFalsy } = require('./utils');

const createBabelConfigRollupBuild = developmentMode => ({
  babelHelpers: 'bundled',
  plugins: [
    // rollup doesn't support optional chaining yet, so we compile it during input
    [require.resolve('@babel/plugin-proposal-optional-chaining'), { loose: true }],
    [require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'), { loose: true }],

    // plugins that aren't part of @babel/preset-env should be applied regularly in
    // the rollup build phase
    require.resolve('babel-plugin-bundled-import-meta'),
    !developmentMode && [
      require.resolve('babel-plugin-template-html-minifier'),
      {
        modules: {
          'lit-html': ['html'],
          'lit-element': ['html', { name: 'css', encapsulation: 'style' }],
        },
        logOnError: true,
        failOnError: false,
        strictCSS: true,
        htmlMinifier: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeComments: true,
          caseSensitive: true,
          minifyCSS: true,
        },
      },
    ],
  ].filter(isFalsy),
});

function createBabelConfigRollupGenerate(modern = true) {
  return {
    babelrc: false,
    configFile: false,
    presets: [
      // optimization: can be removed when https://github.com/babel/babel/pull/11083 is merged
      modern && require.resolve('@babel/preset-modules'),
      [
        require.resolve('@babel/preset-env'),
        {
          targets: modern ? findModernBrowserslist() : ['ie 11'],
          useBuiltIns: false,
          shippedProposals: true,
          modules: false,

          // optimization: in modern output, exclude some babel transforms because @babel/preset-modules
          // handles them, can be removed when https://github.com/babel/babel/pull/11083 is merged
          exclude: modern
            ? ['@babel/plugin-transform-parameters', '@babel/plugin-transform-template-literals']
            : [],
        },
      ],
    ].filter(isFalsy),

    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-syntax-import-meta'),

      // transform modules to systemjs on legacy browsers
      !modern && require.resolve('@babel/plugin-transform-modules-systemjs'),
      !modern && require.resolve('@babel/plugin-proposal-dynamic-import'),
    ].filter(isFalsy),
  };
}

const babelConfigRollupGenerate = createBabelConfigRollupGenerate();
const babelConfigLegacyRollupGenerate = createBabelConfigRollupGenerate(false);

module.exports = {
  createBabelConfigRollupBuild,
  babelConfigRollupGenerate,
  babelConfigLegacyRollupGenerate,
};
