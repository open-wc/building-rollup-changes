const modernBrowsers = [
  'last 2 Chrome major versions',
  'last 2 ChromeAndroid major versions',
  'last 2 Firefox major versions',
  'last 2 Edge major versions',
  // Last 2 edge no longer matches legacy EdgeHTML,
  // we should still support it for the time being
  'edge 18',
  'last 2 Safari major versions',
  'last 2 iOS major versions',
];

module.exports = { modernBrowsers };
