module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': 'off',
        'jsx-quotes': 'off',
        'no-restricted-syntax': [
          'error',
          {
            selector: 'FunctionExpression',
            message: 'Function expressions are not allowed.',
          },
          {
            selector:
              "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
            message: 'setTimeout must always be invoked with two arguments.',
          },
        ],
        'comma-dangle': 'off',
        'space-infix-ops': 'off',
        'keyword-spacing': 'off',
        'allowTemplateLiterals': false,
        'no-unused-vars': [
          'off',
          {vars: 'all', args: 'after-used', ignoreRestSiblings: false},
        ],
      },
    },
  ],
};
