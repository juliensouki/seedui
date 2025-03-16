import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommendedTypeChecked, {
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@stylistic/js': stylisticJs,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@stylistic/js/indent': ['error', 2, { ignoredNodes: ['ConditionalExpression'] }],
    '@stylistic/js/semi': 'error',
    '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
});
