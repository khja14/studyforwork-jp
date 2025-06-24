const { test, expect } = require('@playwright/test');

// テスト結果格納用
let results = [];

test.describe('Angular TodoList 正常系E2Eテスト', () => {
  test('TodoList追加フロー', async ({ page }) => {
    // 1. トップページへアクセス
    await page.goto('https://studyforwork.jp/');
    await page.waitForTimeout(1000);

    // 1. TodoListリンク(2番目)をクリック
    try {
      const todoListLink = page.getByRole('link', { name: 'TodoList' }).nth(2);
      await todoListLink.click();
      results.push(['1. TodoListリンククリック', 'OK', '']);
    } catch (e) {
      results.push(['1. TodoListリンククリック', 'NG', 'リンクが見つからない/クリック失敗']);
      return;
    }
    await page.waitForTimeout(1000);

    // 2. URL遷移確認
    try {
      await expect(page).toHaveURL('https://studyforwork.jp/apps/angular/dist/angular/browser/');
      results.push(['2. URL遷移確認', 'OK', '']);
    } catch (e) {
      results.push(['2. URL遷移確認', 'NG', 'URLが一致しない']);
      return;
    }
    await page.waitForTimeout(1000);

    // 3. フォーム入力
    let title = 'テストタイトル';
    let content = 'テスト内容';
    let date = '2025-06-24';
    try {
      await page.getByPlaceholder('タイトル').fill(title);
      await page.getByPlaceholder('内容').fill(content);
      await page.getByPlaceholder('日付').fill(date);
      results.push(['3. フォーム入力', 'OK', '']);
    } catch (e) {
      results.push(['3. フォーム入力', 'NG', 'フォームが見つからない/入力失敗']);
      return;
    }
    await page.waitForTimeout(1000);

    // 4. 保存ボタンをクリック
    try {
      await page.getByRole('button', { name: '保存' }).click();
      results.push(['4. 保存ボタンクリック', 'OK', '']);
    } catch (e) {
      results.push(['4. 保存ボタンクリック', 'NG', '保存ボタンが見つからない/クリック失敗']);
      return;
    }
    await page.waitForTimeout(1000);

    // 5. TodoListにタスクが追加されたことを確認
    try {
      // 直近で追加された行を取得（例: 最後のtr）
      const rows = await page.locator('table tbody tr');
      const lastRow = rows.nth(await rows.count() - 1);
      const cells = lastRow.locator('td');
      // 各セルを検証
      await expect(cells.nth(0)).toHaveText(title);
      await expect(cells.nth(1)).toHaveText(content);
      await expect(cells.nth(2)).toHaveText(date);
      results.push(['5. タスク追加確認', 'OK', '']);
    } catch (e) {
      results.push(['5. タスク追加確認', 'NG', 'タスクが追加されていない/セル内容不一致']);
      return;
    }
  });

  test.afterEach(async () => {
    // サマリ出力
    console.log('\n--- テスト結果サマリ ---');
    console.log('| ケース | 結果 | 備考 |');
    console.log('|--------|------|------|');
    results.forEach(([step, result, reason]) => {
      console.log(`| ${step} | ${result} | ${reason} |`);
    });
    console.log('-----------------------\n');
    // 結果リセット
    results = [];
  });
});
