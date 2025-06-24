const { test, expect } = require('@playwright/test');

test.describe('Vue.js ToDoList E2E Test', () => {
  const appUrl = 'https://studyforwork.jp/apps/vue_js/dist/index.html';
  const testTodo = 'Playwrightで追加したタスク';

  test('TodoListに任意のデータを入力し、保存し、リストに追加されることを確認', async ({ page }) => {
    await page.goto(appUrl);

    // ToDo入力欄を特定（placeholderやlabelで特定するのが理想）
    const input = await page.locator('input[placeholder="新しいタスクを入力"]');
    await expect(input).toBeVisible();
    await input.fill(testTodo);

    // 追加ボタンをクリック（buttonのテキストやaria-labelで特定）
    const addButton = await page.locator('button', { hasText: '追加' });
    await expect(addButton).toBeVisible();
    await addButton.click();

    // ToDoリストに追加されたか確認
    const todoItem = await page.locator('li', { hasText: testTodo });
    await expect(todoItem).toBeVisible();
  });
});
