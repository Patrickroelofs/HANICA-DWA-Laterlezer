module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-plusplus': 0,
    'react/prop-types': 0,
    'linebreak-style': 0, // Fixes issues with windows/linux linebreaks
    'no-param-reassign': 0, // Reducers need param-reassigns
    'max-len': 0, // Tailwindcss classes generate long strings
    'no-underscore-dangle': 0, // MongoDB adds _id to models
  },
};
