module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/semi': 'off',
    "template-curly-spacing": ["error", "always"],
    'import/no-extraneous-dependencies': 'off',
  },
}
