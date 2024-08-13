import pluginQuery from '@tanstack/eslint-plugin-query';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vitest from 'eslint-plugin-vitest';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  { files: ['**/*.{ts,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/*.d.ts',
      '**/*.config.ts',
      '**/*.js',
      '**/*.cjs',
    ],
  },
  ...pluginQuery.configs['flat/recommended'],
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintPluginPrettierRecommended,
  {
    plugins: { vitest, 'simple-import-sort': simpleImportSort },

    rules: {
      ...vitest.configs.recommended.rules,
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@)(/.*|$)'],
            // Absolute imports, starting with ~
            ['^~.*(?:/|$)'],
            // Parent imports. Put `..` last.
            ["^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\.\\.(?!/?$)"],
            // Style imports.
            ['^.+\\.?(scss|css)?inline$', '^.+\\.?(scss|css)$'],
          ],
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': [
        'error',
        {
          forbidDefaultForRequired: true,
          functions: 'defaultArguments',
        },
      ],
    },
  },
];
