module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0, // Fixes issues with windows/linux linebreaks
    'no-underscore-dangle': 0, // Mocking needs depency injection
    'func-names': 0, // Mongoose models need es5 nameless functions
    'max-len': 0,
  },
};
