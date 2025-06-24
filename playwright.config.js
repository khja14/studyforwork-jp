// playwright.config.js
// Playwrightテスト用の設定ファイル

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    headless: false,
    locale: 'ja-JP',
  },
};

module.exports = config;
