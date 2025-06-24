const { test, expect } = require('@playwright/test');

// テスト結果を格納する配列
let results = [];

// テスト対象URL
const APP_URL = 'https://studyforwork.jp/apps/vue_js/dist/index.html';

test.describe('Vue.js メニュー E2Eテスト', () => {
  test('ヘッダーのメニューアイコンからメニューを開く', async ({ page }) => {
    await page.goto(APP_URL);
    // ヘッダーのメニューアイコンをクリック
    const headerMenuBtn = page.locator('header button, header .menu-icon');
    await expect(headerMenuBtn).toBeVisible();
    await headerMenuBtn.click();
    // メニューが表示されることを確認
    const menu = page.locator('.menu, nav[role="menu"]');
    try {
      await expect(menu).toBeVisible({ timeout: 2000 });
      results.push(['ヘッダーのメニューアイコンからメニューを開く', 'OK', '']);
    } catch (e) {
      results.push(['ヘッダーのメニューアイコンからメニューを開く', 'NG', 'メニューが表示されませんでした']);
      throw e;
    }
  });

  test('メニューから任意の項目をクリックする', async ({ page }) => {
    await page.goto(APP_URL);
    // ヘッダーのメニューアイコンをクリック
    const headerMenuBtn = page.locator('header button, header .menu-icon');
    await headerMenuBtn.click();
    // メニューが表示されるのを待つ
    const menu = page.locator('.menu, nav[role="menu"]');
    await expect(menu).toBeVisible({ timeout: 2000 });
    // メニュー内の最初の項目をクリック
    const menuItem = menu.locator('li, [role="menuitem"]').first();
    await expect(menuItem).toBeVisible();
    await menuItem.click();
    // クリック後の挙動を確認（例: メニューが閉じる、ページ遷移など）
    // ここではメニューが閉じることを仮定
    try {
      await expect(menu).not.toBeVisible({ timeout: 2000 });
      results.push(['メニューから任意の項目をクリックする', 'OK', '']);
    } catch (e) {
      results.push(['メニューから任意の項目をクリックする', 'NG', 'メニューが閉じませんでした']);
      throw e;
    }
  });
});

test.afterAll(async () => {
  // テスト結果をテーブル形式で出力
  console.log('\nテスト結果サマリ:');
  console.log('| テストケース | 結果 | 備考 |');
  console.log('|---|---|---|');
  results.forEach(([name, result, reason]) => {
    console.log(`| ${name} | ${result} | ${reason} |`);
  });
});
