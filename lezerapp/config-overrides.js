const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = function override(config) {
  config.plugins.push(
    new MomentLocalesPlugin(),
    // new BundleAnalyzerPlugin(),
  );
  return config;
};

// Uncomment above comments to enable bundle analyzer
