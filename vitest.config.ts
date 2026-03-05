import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['frontend', 'backend', 'shared'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '.next/**',
        '**/*.config.{ts,mjs,js}',
        '**/*.d.ts',
        '**/test/setup.ts',
        '**/.gitkeep',
        'docs/**',
        '.claude/**',
        '.husky/**',
        '.takt/**',
      ],
    },
  },
});
