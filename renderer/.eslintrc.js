module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/jsx-tag-spacing': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    '@typescript-eslint/semi': 'off',
    'class-methods-use-this': 'off',
    'template-curly-spacing': ['error', 'always'],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
  },
}
