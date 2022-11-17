module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
      'no-underscore-dangle': 'off',
      'no-console': 'off',
      'import/extensions': 'off'
  },
};
