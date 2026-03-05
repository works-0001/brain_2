import { expect, test } from '@playwright/test';

test.describe('トップページ', () => {
  test('トップページが正常に表示される', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Brain/);
  });

  test('アプリ名の見出しが表示される', async ({ page }) => {
    await page.goto('/');

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Brain');
  });
});
