const { test, expect } = require('@playwright/test');

// テスト結果格納用
let results = [];

test.describe('ShadowDOM ボタン E2Eテスト', () => {
  test('ボタンをクリックし、アラートが表示されること', async ({ page }) => {
    let alertMessage = '';
    await page.goto('https://studyforwork.jp/apps/vanilla_js/shadow_dom.html');

    // アラートのハンドリング
    page.once('dialog', async (dialog) => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    // シャドウDOM内のボタンを取得してクリック
    const button = await page.locator('my-button').locator('button#inner-button'); // MCP の生成
    // const button = await page.getByRole('button', { name: 'シャドウDOMのボタン' });　// Tracking による生成
    await expect(button).toBeVisible();
    // * ↓ MCP & Tracking の両生成方法のオブジェクトで、アクションを実行できない (メソッドは実行されるけど、画面に反映されない)
    await button.click();

    // アラートが表示されたか確認
    if (alertMessage === 'シャドウDOMのボタンがクリックされました！') {
      results.push(['ボタンをクリックしアラート表示', 'OK', '']);
    } else {
      results.push(['ボタンをクリックしアラート表示', 'NG', 'アラートが表示されない、またはメッセージが異なる']);
    }
  });

  test.afterAll(async () => {
    // テスト結果をテーブルで出力
    console.log('\n| テストケース | 結果 | 備考 |');
    console.log('|---|---|---|');
    results.forEach(([name, result, reason]) => {
      console.log(`| ${name} | ${result} | ${reason} |`);
    });
  });
});
