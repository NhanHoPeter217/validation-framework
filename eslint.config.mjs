// @ts-check

import eslint from '@eslint/js';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.stylisticTypeChecked,
  {
    ignores: ['dist/**/*.ts', 'dist/**', '**/*.mjs', 'eslint.config.mjs', '**/*.js'],
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': unusedImports
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      'no-useless-escape': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
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
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['**/*.d.ts'],
    extends: [tseslint.configs.disableTypeChecked]
  }
);
