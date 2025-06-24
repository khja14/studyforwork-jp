// npx playwright test prompts/test/02.vue_menu.spec.js

// vue_menu.spec.js
// PlaywrightによるVueメニューの自動テスト

import { test, expect } from '@playwright/test';


// デプロイ先のURL
const URL = 'https://studyforwork.jp/apps/vue_js/dist/index.html';

test('メニューアイコンから項目を選択', async ({ page }) => {
  await page.goto(URL);

  // メニューアイコンボタンをクリック（mdi-appsアイコンを持つボタン）
  const menuIconBtn = await page.locator('.menu-btn__overwrite');
  await expect(menuIconBtn).toBeVisible();
  await menuIconBtn.click();

  // メニューリストが表示されるのを待つ
  const menuItem = await page.locator('.v-list-item').first();
  await expect(menuItem).toBeVisible();

  // 任意の項目（例：アクション2）をクリック
  const action2 = await page.getByText('アクション2').first();
  await action2.click();

  // ランダムな文字列が表示されることを確認
  const result = await page.locator('div.mt-3');
  await expect(result).toBeVisible();
  await expect(result).not.toBeEmpty();
});

