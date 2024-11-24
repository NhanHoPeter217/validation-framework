// import globals from 'globals';
// import { eslintPlugin as typescriptPlugin } from '@typescript-eslint/eslint-plugin';
// import typescriptParser from '@typescript-eslint/parser';

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {
//     languageOptions: {
//       parser: typescriptParser, // Use TypeScript parser
//       globals: globals.browser,
//       ecmaVersion: 2020, // Support modern JavaScript features
//       sourceType: 'module', // Support ES Modules
//     },
//     plugins: [typescriptPlugin], // Add TypeScript plugin
//     rules: {
//       '@typescript-eslint/no-unused-vars': ['error'], // Example: Enforce no unused variables
//       '@typescript-eslint/explicit-module-boundary-types': 'warn', // Example: Warn on missing return types
//     },
//   },
// ];

// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory name for ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(eslint.configs.recommended, tseslint.configs.strictTypeChecked, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname
    }
  },
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
  }
});
