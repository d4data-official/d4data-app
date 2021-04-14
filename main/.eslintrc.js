module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    "template-curly-spacing": ["error", "always"],
    'import/no-extraneous-dependencies': 'off',
  },
}
