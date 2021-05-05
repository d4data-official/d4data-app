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
    'react/jsx-curly-spacing': ['error', { 'when': 'always' }],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { 'code': 120 }],
    'class-methods-use-this': 'off',
    'template-curly-spacing': ['error', 'always'],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'no-console': 'off',
    'no-restricted-syntax': [
      'warn',
      {
        'selector': 'CallExpression[callee.object.name=\'console\'][callee.property.name!=/^(info|warn|error)$/]',
        'message': 'Unexpected console log. If you want to print message/warning/error during run time use console.[info|warn|error].',
      },
    ],
  },
}
