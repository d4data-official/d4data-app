module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/semi': 'off',
    'template-curly-spacing': ['error', 'always'],
    'react/jsx-tag-spacing': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'react/require-default-props': 'off',
    'template-curly-spacing': 'off',
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
}
