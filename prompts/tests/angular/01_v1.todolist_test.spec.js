const { test, expect } = require('@playwright/test');

// テストデータ
const testData = {
  title: 'テストタイトル',
  content: 'テスト内容',
  date: '2025-06-24'
};

test.describe('Angular TodoList 正常系E2Eテスト', () => {
  let results = [];

  test('TodoList追加フロー', async ({ page }) => {
    // 1. Angular カテゴリの TodoList リンクをクリックする。
    await page.goto('https://studyforwork.jp/');
    try {
      await page.getByRole('link', { name: /Angular/i }).click();
      await page.getByRole('link', { name: /TodoList/i }).click();
      results.push(['1. TodoListリンククリック', 'OK', '']);
    } catch (e) {
      results.push(['1. TodoListリンククリック', 'NG', 'リンクが見つからない/クリック不可']);
      expect(false, 'TodoListリンククリック失敗').toBe(true);
    }

    // 2. TodoList が表示されたことを確認する
    try {
      await expect(page.getByRole('heading', { name: /TodoList/i })).toBeVisible();
      results.push(['2. TodoList表示確認', 'OK', '']);
    } catch (e) {
      results.push(['2. TodoList表示確認', 'NG', '見出しが表示されない']);
      expect(false, 'TodoList表示確認失敗').toBe(true);
    }

    // 3. タイトル, 内容, 日付フォームに、任意のデータを入力する
    try {
      await page.getByLabel(/タイトル/i).fill(testData.title);
      await page.getByLabel(/内容/i).fill(testData.content);
      await page.getByLabel(/日付/i).fill(testData.date);
      results.push(['3. フォーム入力', 'OK', '']);
    } catch (e) {
      results.push(['3. フォーム入力', 'NG', 'フォームが見つからない/入力不可']);
      expect(false, 'フォーム入力失敗').toBe(true);
    }

    // 4. 保存ボタンをクリックする
    try {
      await page.getByRole('button', { name: /保存/i }).click();
      results.push(['4. 保存ボタンクリック', 'OK', '']);
    } catch (e) {
      results.push(['4. 保存ボタンクリック', 'NG', '保存ボタンが見つからない/クリック不可']);
      expect(false, '保存ボタンクリック失敗').toBe(true);
    }

    // 5. TodoList にタスクが追加されたことを確認する。この際、各セルを一つずつ検証すること
    try {
      const row = await page.locator('table tbody tr').last();
      await expect(row.locator('td').nth(0)).toHaveText(testData.title);
      await expect(row.locator('td').nth(1)).toHaveText(testData.content);
      await expect(row.locator('td').nth(2)).toHaveText(testData.date);
      results.push(['5. TodoList追加確認', 'OK', '']);
    } catch (e) {
      results.push(['5. TodoList追加確認', 'NG', '追加されたタスクが正しく表示されない']);
      expect(false, 'TodoList追加確認失敗').toBe(true);
    }

    // サマリ出力
    console.log('\n--- テスト結果サマリ ---');
    console.table(results, ['0', '1', '2']);
    const allOK = results.every(r => r[1] === 'OK');
    expect(allOK, '全テストケースがOKであること').toBe(true);
  });
});
