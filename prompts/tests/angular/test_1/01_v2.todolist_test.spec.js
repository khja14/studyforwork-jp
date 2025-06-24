const { test, expect } = require('@playwright/test');

test.describe('Angular TodoList E2E Test', () => {
  test('正常系: TodoListの追加', async ({ page }) => {
    // 1. Angular カテゴリの TodoList リンクをクリックする
    await page.goto('https://studyforwork.jp/');
    // 「Angular」というテキストよりも後ろの最初の「TodoList」リンクをクリック
    const angularElement = await page.getByText('Angular', { exact: false });
    await expect(angularElement).toBeVisible();
    // Angular要素の親要素から次の「TodoList」リンクを探す
    const todoLinks = await page.locator('a', { hasText: 'TodoList' }).all();
    let found = false;
    for (const link of todoLinks) {
      const html = await link.evaluate(node => node.outerHTML);
      const angularIndex = html.indexOf('Angular');
      if (angularIndex >= 0) {
        // Angularテキストより後ろの最初のTodoListリンク
        await link.click();
        found = true;
        break;
      }
    }
    if (!found) {
      // fallback: 最初のTodoListリンク
      await todoLinks[0].click();
    }

    // 2. TodoListが表示されたことを確認する
    await expect(page.getByPlaceholder('タイトル')).toBeVisible();
    await expect(page.getByPlaceholder('内容')).toBeVisible();
    await expect(page.getByPlaceholder('日付')).toBeVisible();

    // 3. タイトル, 内容, 日付フォームに、任意のデータを入力する
    const title = 'E2Eテストタイトル';
    const content = 'E2Eテスト内容';
    const date = '2025-06-24';
    await page.getByPlaceholder('タイトル').fill(title);
    await page.getByPlaceholder('内容').fill(content);
    await page.getByPlaceholder('日付').fill(date);

    // 4. 保存ボタンをクリックする
    await page.getByRole('button', { name: /保存/ }).click();

    // 5. TodoListにタスクが追加されたことを確認する
    const row = page.locator('table.todo-table tbody tr').last();
    await expect(row.locator('td').nth(0)).toHaveText(title);
    await expect(row.locator('td').nth(1)).toHaveText(content);
    await expect(row.locator('td').nth(2)).toHaveText(date);
  });
});
