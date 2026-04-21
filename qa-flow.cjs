const puppeteer = require('puppeteer');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3456', { waitUntil: 'networkidle0' });
  await sleep(2000);

  // Reveal GSAP-hidden elements
  await page.addStyleTag({ content: '.gsap-up { opacity: 1 !important; transform: none !important; }' });
  await sleep(500);

  const sections = [
    { name: '01-hero', y: 0 },
    { name: '02-vision', y: 900 },
    { name: '03-problem-insight', y: 1700 },
    { name: '04-opportunity-cta', y: 2600 },
    { name: '05-approccio-risultati', y: 3500 },
    { name: '06-credibilita-about', y: 5000 },
    { name: '07-come-iniziare', y: 6200 },
    { name: '08-sessione-cta', y: 7100 },
    { name: '09-perchi', y: 8000 },
    { name: '10-garanzia-cta-faq', y: 8900 },
    { name: '11-cta-finale', y: 10200 },
  ];

  for (const s of sections) {
    await page.evaluate(y => window.scrollTo(0, y), s.y);
    await sleep(600);
    await page.screenshot({ path: `screenshots/qa-${s.name}.png` });
    console.log(`✓ ${s.name}`);
  }

  await browser.close();
  process.exit(0);
})();
