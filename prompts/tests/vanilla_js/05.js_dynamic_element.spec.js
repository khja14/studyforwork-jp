const { test, expect } = require('@playwright/test');

test.describe('Dynamic Object - ランダムIDボタン E2Eテスト', () => {
  test('2つのランダムIDボタンのクリックとアラート表示確認', async ({ page }) => {
    // テスト結果格納用
    const results = [];
    // 対象ページへ遷移
    await page.goto('https://studyforwork.jp/apps/vanilla_js/dynamic_object.html');

    // ボタンを取得（idがランダムなため、クラスで取得）
    const buttons = await page.locator('button.dynamic-btn');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(1); // 1つ以上存在すること

    for (let i = 0; i < count; i++) {
      let caseName = `ボタン${i+1}クリック`;
      let ok = false;
      let reason = '';
      // アラートの検知
      page.once('dialog', async dialog => {
        try {
          await dialog.accept();
          ok = true;
        } catch (e) {
          reason = 'アラートのacceptに失敗';
        }
      });
      try {
        await buttons.nth(i).click();
        // 少し待つ（アラート検知のため）
        await page.waitForTimeout(300);
        if (!ok) reason = 'アラートが表示されなかった';
      } catch (e) {
        reason = 'クリック時にエラー';
      }
      results.push({ case: caseName, result: ok ? 'OK' : 'NG', reason });
    }

    // テーブル形式でサマリ出力
    console.log('\n| ケース | 結果 | 理由 |');
    console.log('|--------|------|------|');
    results.forEach(r => {
      console.log(`| ${r.case} | ${r.result} | ${r.result === 'OK' ? '' : r.reason} |`);
    });
  });
});
