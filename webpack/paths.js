const { resolve } = require('path');

module.exports = {
  app: resolve('src'),
  appIndex: resolve('src/index.js'),
  build: resolve('build'),
  public: resolve('public'),
  html: resolve('public/index.html'),
  favicon: resolve('static/favicon.ico'),
  package: resolve('package.json'),
  nodeModules: resolve('node_modules'),
  polyfills: resolve('webpack/polyfills'),
};
