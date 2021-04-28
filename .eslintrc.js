module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  rules: {
    'no-console': 'warn',
    'no-else-return': 'off',
    'no-plusplus': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    isEmpty: 'readonly',
    renderMathInElement: 'readonly'
  }
}
