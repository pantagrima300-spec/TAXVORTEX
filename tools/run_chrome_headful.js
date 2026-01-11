const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const root = path.resolve(__dirname, '..');
const frontendDir = path.join(root, 'frontend');
const port = 8000;

// Simple static server
const server = http.createServer((req, res) => {
  let filePath = path.join(frontendDir, req.url === '/' ? '/INDEX.HTML' : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const map = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json' };
  if (!fs.existsSync(filePath)) {
    res.statusCode = 404; res.end('Not found'); return;
  }
  res.setHeader('Content-Type', map[ext] || 'text/plain');
  fs.createReadStream(filePath).pipe(res);
});

(async () => {
  server.listen(port, '127.0.0.1');
  console.log('Static server running at http://127.0.0.1:' + port);

  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));

  await page.goto(`http://127.0.0.1:${port}/INDEX.HTML`, { waitUntil: 'networkidle2' });

  // Check backend availability
  console.log('Checking backend at http://127.0.0.1:5000/');
  try {
    const r = await page.evaluate(async () => {
      const resp = await fetch('http://127.0.0.1:5000/');
      return resp.ok ? resp.json() : null;
    });
    console.log('Backend root response:', JSON.stringify(r));
  } catch (e) {
    console.error('Backend not reachable:', e.message);
  }

  // Add an income source via app function
  await page.evaluate(() => {
    if (typeof addIncomeSource === 'function') addIncomeSource();
  });
  // Wait for input to appear and set it
  await page.waitForSelector('.income-item input[type="number"]', { timeout: 5000 });
  await page.evaluate(() => {
    const input = document.querySelector('.income-item input[type="number"]');
    input.value = '120000';
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  // Click calculate
  await page.click('#calculateBtn');

  // Wait for #result to be populated
  await page.waitForFunction(() => {
    const el = document.getElementById('result');
    return el && el.textContent && el.textContent.trim().length > 0;
  }, { timeout: 5000 });

  const resultText = await page.$eval('#result', el => el.textContent);
  console.log('--- RESULT FROM PAGE ---');
  console.log(resultText);

  const outPath = path.join(root, 'tools', 'taxcortex_headful_result.png');
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Screenshot saved to', outPath);

  // keep browser open for a few seconds so you can view it, then close
  await new Promise(r => setTimeout(r, 4000));

  await browser.close();
  server.close();
  process.exit(0);
})();