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
