module.exports = {
  extends: ['eslint-config-airbnb'],
  rules: {
    'semi': 'off',
    'max-len': ['error', { 'code': 120 }],
    'template-curly-spacing': ['error', 'always'],
  },
}
