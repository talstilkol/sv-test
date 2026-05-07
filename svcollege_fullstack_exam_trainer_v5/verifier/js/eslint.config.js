import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.property.name='forEach'] > ArrowFunctionExpression[async=true]",
          message: 'Avoid async/await inside forEach. Use for...of or Promise.all.'
        }
      ]
    }
  }
];
