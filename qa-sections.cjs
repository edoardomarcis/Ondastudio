const puppeteer = require('puppeteer');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3456', { waitUntil: 'networkidle0' });
  await sleep(2000);
  await page.addStyleTag({ content: '.gsap-up { opacity: 1 !important; transform: none !important; }' });
  await sleep(400);

  // Get actual Y positions of key sections
  const positions = await page.evaluate(() => {
    const getTop = sel => {
      const el = document.querySelector(sel);
      return el ? Math.round(el.getBoundingClientRect().top + window.scrollY) : null;
    };
    return {
      comeFunziona: getTop('#sessione'),
      perchi: getTop('.perchi'),
      garanzia: getTop('.garanzia'),
      percheQui: getTop('.perche-qui'),
      about: getTop('.about-me'),
    };
  });
  console.log('Section positions:', JSON.stringify(positions, null, 2));

  const shots = [
    { name: 'come-iniziare', y: positions.percheQui - 50 },
    { name: 'sessione', y: positions.comeFunziona - 50 },
    { name: 'sessione-bottom-cta', y: positions.comeFunziona + 800 },
    { name: 'perchi', y: positions.perchi - 50 },
    { name: 'garanzia', y: positions.garanzia - 50 },
    { name: 'garanzia-cta', y: positions.garanzia + 600 },
  ];

  for (const s of shots) {
    if (s.y < 0) s.y = 0;
    await page.evaluate(y => window.scrollTo(0, y), s.y);
    await sleep(600);
    await page.screenshot({ path: `screenshots/sec-${s.name}.png` });
    console.log(`✓ ${s.name} @ y=${s.y}`);
  }

  await browser.close();
  process.exit(0);
})();
