module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
  },
  extends: [`airbnb-base`, `prettier`],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    'import/prefer-default-export': 'off',
  },
  plugins: ['prettier'],
}
