const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    launchOptions: {
      slowMo: 1000,
    },
  },
});
