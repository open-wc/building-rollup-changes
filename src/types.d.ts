export interface LegacyBuilds {
  nomodule?: boolean;
}

export interface BasicOptions {
  nodeResolve?: boolean | object;
  babel?: boolean | object;
  terser?: boolean | object;
  legacyBuilds?: LegacyBuilds;
  serviceWorker?: serviceWorkerOptions;
}

interface serviceWorkerOptions {
  generateSW?: boolean;
  addRegistration?: boolean;
}

export interface SpaOptions extends BasicOptions {
  html?: boolean | object;
  polyfillsLoader?: boolean | object;
  workbox?: boolean | object;
}
