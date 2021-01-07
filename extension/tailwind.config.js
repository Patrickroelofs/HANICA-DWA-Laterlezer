/* eslint-disable */

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'serif': ['\'Merriweather\'', 'serif'],
      'sans': ['\'Source Sans Pro\'', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: true,
    content: [
      './src/**/*.js',
      './src/**/*.jsx',
    ]
  },
};
