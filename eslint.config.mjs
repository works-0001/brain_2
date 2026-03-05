// @ts-check

import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { flatConfigs as importXConfigs } from 'eslint-plugin-import-x';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier/flat';

export default defineConfig([
  // ──────────────────────────────────────────────
  // 1. Global ignores
  // ──────────────────────────────────────────────
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/out/**',
    '**/build/**',
    '**/*.tsbuildinfo',
    'next-env.d.ts',
    'pnpm-lock.yaml',
    '**/postcss.config.*',
    '**/next.config.*',
    '**/storybook-static/**',
  ]),

  // ──────────────────────────────────────────────
  // 2. Base: ESLint recommended (全 JS/TS 共通)
  // ──────────────────────────────────────────────
  js.configs.recommended,

  // ──────────────────────────────────────────────
  // 3. Frontend: Next.js + React + TypeScript
  //    eslint-config-next が react, react-hooks,
  //    @next/next, typescript-eslint を内包
  // ──────────────────────────────────────────────
  {
    files: ['frontend/**/*.{ts,tsx,js,jsx,mjs}'],
    extends: [...nextVitals, ...nextTs],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      next: {
        rootDir: 'frontend',
      },
    },
  },

  // ──────────────────────────────────────────────
  // 4. Backend: TypeScript (type-checked) + Node.js
  // ──────────────────────────────────────────────
  {
    files: ['backend/**/*.{ts,js}'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // ──────────────────────────────────────────────
  // 5. Shared: TypeScript (type-checked)
  //    環境固有のグローバルなし（ポータブルコードを強制）
  // ──────────────────────────────────────────────
  {
    files: ['shared/**/*.{ts,js}'],
    extends: [...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // ──────────────────────────────────────────────
  // 6. Import rules (全ワークスペース共通)
  // ──────────────────────────────────────────────
  {
    files: [
      'frontend/**/*.{ts,tsx,js,jsx}',
      'backend/**/*.{ts,js}',
      'shared/**/*.{ts,js}',
    ],
    extends: [importXConfigs.recommended, importXConfigs.typescript],
    rules: {
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@brain-1/**',
              group: 'external',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
    },
  },

  // ──────────────────────────────────────────────
  // 7. Project-wide custom rules
  //    backend は no-console: off（サーバーログは正当な使用）
  // ──────────────────────────────────────────────
  {
    files: ['frontend/src/**/*.{ts,tsx,js,jsx}', 'shared/src/**/*.{ts,js}'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // ──────────────────────────────────────────────
  // 8. Prettier 競合回避
  //    Prettier が担当するスタイルルールを無効化
  //    必ず配列の末尾に配置すること
  // ──────────────────────────────────────────────
  prettierConfig,
]);
