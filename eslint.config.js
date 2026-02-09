import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default [
  {
    // Apply this to all your TypeScript files
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Rule 1: Force === instead of ==
      'eqeqeq': 'error',
      // Rule 2: Force curly braces for all control statements
      'curly': 'error',
      // Rule 3: Ban the old 'var' keyword
      'no-var': 'error',
      // Rule 4: Warn when variables are defined but not used
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];