const { test, expect } = require('@playwright/test');

// テスト結果格納用
let results = [];

// 1秒ディレイ
const delay = async (ms = 1000) => new Promise(res => setTimeout(res, ms));

test.describe('Angular TodoList E2E Test', () => {
  test('正常系: TodoList追加フロー', async ({ page }) => {
    // 1. Angular カテゴリの TodoList リンクをクリック
    await page.goto('https://studyforwork.jp/');
    await delay();
    try {
      const todoListLink = page.getByRole('link', { name: 'TodoList' }).nth(2);
      await todoListLink.click();
      results.push(['1', 'OK', '']);
    } catch (e) {
      results.push(['1', 'NG', 'TodoListリンククリック失敗']);
      return;
    }
    await delay();

    // 2. URLで画面遷移確認
    try {
      await expect(page).toHaveURL('https://studyforwork.jp/apps/angular/dist/angular/browser/');
      results.push(['2', 'OK', '']);
    } catch (e) {
      results.push(['2', 'NG', 'URL遷移失敗']);
      return;
    }
    await delay();

    // 3. フォーム入力
    try {
      // タイトル
      const titleInput = await page.getByPlaceholder('タイトル');
      await titleInput.fill('テストタイトル');
      // 内容
      const contentInput = await page.getByPlaceholder('内容');
      await contentInput.fill('テスト内容');
      // 日付（プレースホルダなし、input[type="date"]を特定）
      const dateInput = await page.locator('input[type="date"]');
      await dateInput.fill('2025-06-24');
      results.push(['3', 'OK', '']);
    } catch (e) {
      results.push(['3', 'NG', 'フォーム入力失敗']);
      return;
    }
    await delay();

    // 4. 保存ボタンをクリック
    try {
      const saveBtn = await page.getByRole('button', { name: '保存' });
      await saveBtn.click();
      results.push(['4', 'OK', '']);
    } catch (e) {
      results.push(['4', 'NG', '保存ボタンクリック失敗']);
      return;
    }
    await delay();

    // 5. TodoListにタスクが追加されたことを確認
    try {
      // 直近で追加された行を取得（tableのtbodyの最後のtr）
      const lastRow = await page.locator('table tbody tr').last();
      const cells = await lastRow.locator('td').allTextContents();
      expect(cells[0]).toBe('テストタイトル');
      expect(cells[1]).toBe('テスト内容');
      expect(cells[2]).toContain('2025-06-24');
      results.push(['5', 'OK', '']);
    } catch (e) {
      results.push(['5', 'NG', 'タスク追加検証失敗']);
      return;
    }
  });

  test.afterAll(async () => {
    // テスト結果サマリ出力
    console.log('\n| ケース | 結果 | 備考 |');
    console.log('|-------|------|------|');
    results.forEach(([no, res, reason]) => {
      console.log(`| ${no} | ${res} | ${reason} |`);
    });
    const okCount = results.filter(r => r[1] === 'OK').length;
    const ngCount = results.filter(r => r[1] === 'NG').length;
    console.log(`\nサマリ: OK=${okCount}, NG=${ngCount}`);
  });
});
