// todo.spec.js
// PlaywrightによるTodoリストの自動テスト

const { test, expect } = require('@playwright/test');

// Windowsローカルファイルパス
const FILE_URL = 'file:///C:/Users/ftymd/Documents/studyforwork-jp/index.html';

test('Todoリスト追加と並べ替え', async ({ page }) => {
  await page.goto(FILE_URL);

  // 1件目追加
  await page.getByRole('textbox', { name: 'タイトル' }).fill('テスト1');
  await page.getByRole('textbox', { name: '内容' }).fill('内容1');
  await page.getByRole('textbox', { name: '日付' }).fill('2025-06-23');
  await page.getByRole('button', { name: '保存' }).click();
  await page.once('dialog', dialog => dialog.accept());

  // 2件目追加
  await page.getByRole('textbox', { name: 'タイトル' }).fill('テスト2');
  await page.getByRole('textbox', { name: '内容' }).fill('内容2');
  await page.getByRole('textbox', { name: '日付' }).fill('2025-06-24');
  await page.getByRole('button', { name: '保存' }).click();
  await page.once('dialog', dialog => dialog.accept());

  // 並べ替え（2件目を1件目の上にドラッグ）
  const row1 = await page.getByRole('row', { name: 'テスト1 内容1 2025-06-23 削除' });
  const row2 = await page.getByRole('row', { name: 'テスト2 内容2 2025-06-24 削除' });
  await row2.dragTo(row1);

  // 並び順検証
  const firstRow = await page.getByRole('row', { name: /テスト2/ });
  await expect(firstRow).toContainText('テスト2');
});
