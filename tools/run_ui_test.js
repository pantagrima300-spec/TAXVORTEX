const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

global.fetch = fetch;

(async function() {
  const root = path.resolve(__dirname, '..');
  const htmlPath = path.join(root, 'frontend', 'INDEX.HTML');
  const scriptPath = path.join(root, 'frontend', 'script.js');

  const html = fs.readFileSync(htmlPath, 'utf8');
  const script = fs.readFileSync(scriptPath, 'utf8');

  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable', url: 'http://127.0.0.1/' });
  const { window } = dom;

  // Provide fetch and related globals on the window BEFORE scripts execute
  window.fetch = fetch;
  if (fetch.Headers) window.Headers = fetch.Headers;
  if (fetch.Request) window.Request = fetch.Request;
  if (fetch.Response) window.Response = fetch.Response;

  // Inject script.js into DOM so it runs in that window
  const s = window.document.createElement('script');
  s.textContent = script;
  window.document.body.appendChild(s);

  // Wait for scripts to initialize (ensure global functions like prepareFormData are available)
  await new Promise(r => setTimeout(r, 600));

  // Create a real income source via the app flow so inputs and events exist
  if (typeof window.addIncomeSource === 'function') {
    window.addIncomeSource();
  } else {
    // Fallback: set taxData directly
    window.taxData = window.taxData || {};
    window.taxData.incomeSources = [{ id: Date.now(), type: 'salary', amount: 100000 }];
  }

  // Set the amount input value and dispatch change so updateIncomeSource runs
  await new Promise(r => setTimeout(r, 100));
  const amountInput = window.document.querySelector('.income-item input[type="number"]');
  if (amountInput) {
    amountInput.value = '100000';
    const evt = new window.Event('change', { bubbles: true });
    amountInput.dispatchEvent(evt);
  } else if (window.taxData && window.taxData.incomeSources && window.taxData.incomeSources[0]) {
    window.taxData.incomeSources[0].amount = 100000;
  }

  // Ensure regime select is synced
  const regimeSelect = window.document.getElementById('regimeSelect');
  if (regimeSelect) regimeSelect.value = (window.taxData && window.taxData.selectedRegime) || 'ops';

  // Call prepareFormData to set hidden fields
  if (typeof window.prepareFormData === 'function') window.prepareFormData();

  // Click calculate button
  const btn = window.document.getElementById('calculateBtn');
  if (!btn) {
    console.error('Calculate button not found');
    process.exit(2);
  }

  // Click and wait for async work
  btn.click();
  await new Promise(r => setTimeout(r, 800));

  const resultEl = window.document.getElementById('result');
  console.log('--- RENDERED RESULT ---');
  console.log(resultEl ? resultEl.textContent : '<no result>');
  process.exit(0);
})();