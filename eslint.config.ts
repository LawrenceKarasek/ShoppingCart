import js from '@eslint/js'
import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': 'error',
    },
  },
];