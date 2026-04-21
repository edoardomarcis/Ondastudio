const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport to desktop size
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:8000/direct.html', { waitUntil: 'networkidle2' });

  // Create screenshots directory if needed
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  // Full page screenshot
  await page.screenshot({ path: 'screenshots/direct-01-hero.png', fullPage: false });

  // Scroll and take more sections
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.screenshot({ path: 'screenshots/direct-02-pain.png', fullPage: false });

  await page.evaluate(() => window.scrollBy(0, 800));
  await page.screenshot({ path: 'screenshots/direct-03-cases.png', fullPage: false });

  await page.evaluate(() => window.scrollBy(0, 800));
  await page.screenshot({ path: 'screenshots/direct-04-howitworks.png', fullPage: false });

  await page.evaluate(() => window.scrollBy(0, 800));
  await page.screenshot({ path: 'screenshots/direct-05-risk.png', fullPage: false });

  await page.evaluate(() => window.scrollBy(0, 800));
  await page.screenshot({ path: 'screenshots/direct-06-criteria.png', fullPage: false });

  console.log('✓ Screenshots saved');

  await browser.close();
})();
