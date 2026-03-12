import { describe, expect, it } from 'vitest';

describe('HomePage', () => {
  it('デフォルトエクスポートが存在する', async () => {
    const mod = await import('./page');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });
});
