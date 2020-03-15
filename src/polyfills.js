const defaultPolyfills = {
  fetch: true,
  abortController: true,
  dynamicImport: true,
  // this can be moved to defaultLegacyPolyfills when
  // old Edge is no longer supported
  webcomponents: true,
};

const defaultLegacyPolyfills = {
  ...defaultPolyfills,
  coreJs: true,
  regeneratorRuntime: true,
};

module.exports = { defaultPolyfills, defaultLegacyPolyfills };
