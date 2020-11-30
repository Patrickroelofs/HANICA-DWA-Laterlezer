const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = function override(config) {
  config.plugins.push(
    new MomentLocalesPlugin(),
  );
  return config;
};

// 29.18 seconden MET minimize
// 21.88 seconden ZONDER minimize
// 11.52 seconden ZONDER minimize en optimised imports
