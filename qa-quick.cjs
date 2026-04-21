const puppeteer = require('puppeteer');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3456', { waitUntil: 'networkidle0' });
  await sleep(1500);
  await page.addStyleTag({ content: '.gsap-up { opacity: 1 !important; transform: none !important; }' });
  await sleep(400);

  // Scroll to .perche-qui using scrollIntoView
  await page.evaluate(() => {
    const el = document.querySelector('.perche-qui');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await sleep(600);
  await page.screenshot({ path: 'screenshots/sec-come-iniziare-3.png' });
  console.log('done');
  await browser.close();
  process.exit(0);
})();
