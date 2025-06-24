// playwright test for TodoList input and save
const { test, expect } = require('@playwright/test');

test.describe('Vue.js TodoList E2E', () => {
  let results = [];

  test('TodoListに任意のデータを入力し、保存する', async ({ page }) => {
    let caseResult = { case: 'TodoListに任意のデータを入力し、保存する', result: 'OK', reason: '' };
    try {
      await page.goto('https://studyforwork.jp/apps/vue_js/dist/index.html');
      // 入力欄を特定し、テキストを入力
      await page.fill('input[type="text"]', 'Playwrightで追加');
      // 保存ボタンをクリック（button, またはinput[type="submit"]等、適宜調整）
      await page.click('button, input[type="submit"]');
    } catch (e) {
      caseResult.result = 'NG';
      caseResult.reason = e.message;
    }
    results.push(caseResult);
  });

  test('ToDoリストにデータが追加されたことを確認する', async ({ page }) => {
    let caseResult = { case: 'ToDoリストにデータが追加されたことを確認する', result: 'OK', reason: '' };
    try {
      await page.goto('https://studyforwork.jp/apps/vue_js/dist/index.html');
      // 先にデータを追加
      await page.fill('input[type="text"]', 'Playwrightで追加');
      await page.click('button, input[type="submit"]');
      // リストに追加されたか確認
      const todo = await page.locator('li', { hasText: 'Playwrightで追加' });
      await expect(todo).toBeVisible();
    } catch (e) {
      caseResult.result = 'NG';
      caseResult.reason = e.message;
    }
    results.push(caseResult);
  });

  test.afterAll(async () => {
    // テーブル形式でサマリ出力
    console.log('\n| テストケース | 結果 | 理由 |');
    console.log('|---|---|---|');
    results.forEach(r => {
      console.log(`| ${r.case} | ${r.result} | ${r.reason} |`);
    });
  });
});
