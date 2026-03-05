import { APP_NAME, APP_VERSION } from './index.ts';

describe('shared constants', () => {
  it('APP_NAME は "Brain" である', () => {
    expect(APP_NAME).toBe('Brain');
  });

  it('APP_VERSION は semver 形式の文字列である', () => {
    expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
