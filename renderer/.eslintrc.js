module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/anchor-has-content": "off",
    "react/require-default-props": "off",
    "import/no-extraneous-dependencies": [2, { devDependencies: true }]
  }
};
