const { test, expect } = require('@playwright/test');

// テストデータ
const testData = {
  title: 'テストタイトル',
  content: 'テスト内容',
  date: '2025-06-24'
};

test.describe('Angular TodoList 正常系E2Eテスト v3', () => {
  let results = [];

  test('TodoList追加フロー', async ({ page }) => {
    await page.goto('https://studyforwork.jp/');

    // 1. Angular カテゴリの TodoList リンクをクリック（Angularより後ろの最初のTodoList）
    try {
      const angularText = await page.getByText('Angular');
      const angularHandle = await angularText.elementHandle();
      const todoLinks = await page.locator('a', { hasText: 'TodoList' }).elementHandles();
      let targetLink = null;
      for (const link of todoLinks) {
        const linkBox = await link.boundingBox();
        const angularBox = await angularHandle.boundingBox();
        if (linkBox && angularBox && linkBox.y > angularBox.y) {
          targetLink = link;
          break;
        }
      }
      if (!targetLink) throw new Error('リンク特定失敗');
      await targetLink.click();
      results.push(['1. TodoListリンククリック', 'OK', '']);
    } catch (e) {
      results.push(['1. TodoListリンククリック', 'NG', 'Angularより後ろのTodoListリンクが見つからない']);
      expect(false, 'TodoListリンククリック失敗').toBe(true);
    }

    // 2. TodoList が表示されたことを確認
    try {
      await expect(page.getByRole('heading', { name: /TodoList/i })).toBeVisible();
      results.push(['2. TodoList表示確認', 'OK', '']);
    } catch (e) {
      results.push(['2. TodoList表示確認', 'NG', '見出しが表示されない']);
      expect(false, 'TodoList表示確認失敗').toBe(true);
    }

    // 3. タイトル, 内容, 日付フォームにデータ入力（ラベルとの距離関係で特定）
    try {
      // ラベルの直後のinput/textareaを取得
      const getInputByLabel = async (labelText) => {
        const label = await page.getByText(labelText, { exact: true });
        const labelHandle = await label.elementHandle();
        const input = await labelHandle.evaluateHandle(label => {
          let el = label.nextElementSibling;
          while (el && !(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
            el = el.nextElementSibling;
          }
          return el;
        });
        return input;
      };
      await (await getInputByLabel('タイトル')).type(testData.title);
      await (await getInputByLabel('内容')).type(testData.content);
      await (await getInputByLabel('日付')).type(testData.date);
      results.push(['3. フォーム入力', 'OK', '']);
    } catch (e) {
      results.push(['3. フォーム入力', 'NG', 'ラベル直後のフォームが見つからない/入力不可']);
      expect(false, 'フォーム入力失敗').toBe(true);
    }

    // 4. 保存ボタンをクリック
    try {
      await page.getByRole('button', { name: /保存/i }).click();
      results.push(['4. 保存ボタンクリック', 'OK', '']);
    } catch (e) {
      results.push(['4. 保存ボタンクリック', 'NG', '保存ボタンが見つからない/クリック不可']);
      expect(false, '保存ボタンクリック失敗').toBe(true);
    }

    // 5. TodoList にタスクが追加されたことを確認（各セル検証）
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
