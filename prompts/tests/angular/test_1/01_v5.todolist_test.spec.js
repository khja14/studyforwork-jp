const { test, expect } = require('@playwright/test');

// テスト結果格納用
let results = [];

// テストデータ
const testData = {
  title: 'テストタイトル',
  content: 'テスト内容',
  date: '2025-06-24'
};

test.describe('正常系E2Eテスト - TodoList追加フロー', () => {
  test('TodoList追加フロー', async ({ page }) => {
    // 1. Angular カテゴリの TodoList リンクをクリック
    try {
      await page.goto('https://studyforwork.jp/');
      await page.waitForTimeout(1000);
      const todoListLink = page.getByRole('link', { name: 'TodoList' }).nth(2);
      await todoListLink.click();
      await page.waitForTimeout(1000);
      results.push(['1. TodoListリンククリック', 'OK', '']);
    } catch (e) {
      results.push(['1. TodoListリンククリック', 'NG', e.message]);
      return reportResults();
    }

    // 2. TodoListが表示されたことを確認（URLで判定）
    try {
      await expect(page).toHaveURL('https://studyforwork.jp/apps/angular/dist/angular/browser/');
      await page.waitForTimeout(1000);
      results.push(['2. TodoList表示確認', 'OK', '']);
    } catch (e) {
      results.push(['2. TodoList表示確認', 'NG', e.message]);
      return reportResults();
    }

    // 3. フォームにデータ入力
    try {
      await page.getByLabel('タイトル').fill(testData.title);
      await page.getByLabel('内容').fill(testData.content);
      await page.getByLabel('日付').fill(testData.date);
      await page.waitForTimeout(1000);
      results.push(['3. フォーム入力', 'OK', '']);
    } catch (e) {
      results.push(['3. フォーム入力', 'NG', e.message]);
      return reportResults();
    }

    // 4. 保存ボタンをクリック
    try {
      await page.getByRole('button', { name: /保存/ }).click();
      await page.waitForTimeout(1000);
      results.push(['4. 保存ボタンクリック', 'OK', '']);
    } catch (e) {
      results.push(['4. 保存ボタンクリック', 'NG', e.message]);
      return reportResults();
    }

    // 5. TodoListにタスクが追加されたことを確認
    try {
      // 直近で追加された行を取得（仮に一番下の行とする）
      const rows = await page.locator('table tbody tr');
      const rowCount = await rows.count();
      const lastRow = rows.nth(rowCount - 1);
      // 各セルを検証
      const cells = lastRow.locator('td');
      await expect(cells.nth(0)).toHaveText(testData.title);
      await expect(cells.nth(1)).toHaveText(testData.content);
      await expect(cells.nth(2)).toHaveText(testData.date);
      results.push(['5. タスク追加確認', 'OK', '']);
    } catch (e) {
      results.push(['5. タスク追加確認', 'NG', e.message]);
      return reportResults();
    }
    reportResults();
  });
});

function reportResults() {
  console.log('\nテスト結果サマリ:');
  console.log('| ケース | 結果 | 理由 |');
  console.log('|--------|------|------|');
  for (const [caseName, result, reason] of results) {
    console.log(`| ${caseName} | ${result} | ${reason ? reason : ''} |`);
  }
}
