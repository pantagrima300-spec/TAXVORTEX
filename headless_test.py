import time
import pathlib
import sys
from playwright.sync_api import sync_playwright

index_path = pathlib.Path('frontend/INDEX.HTML').absolute().as_uri()

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=['--no-sandbox'])
    page = browser.new_page()
    page.goto(index_path)
    page.wait_for_selector('#calculateBtn', timeout=5000)

    # ensure an income source exists and set its amount
    try:
        page.eval_on_selector('input[placeholder="Amount"]', 'el => { el.focus(); el.value = "100000"; el.dispatchEvent(new Event("change", {bubbles:true})); }')
    except Exception as e:
        print('Warning: could not set amount input:', e, file=sys.stderr)

    # click calculate and wait for result
    page.click('#calculateBtn')
    page.wait_for_selector('#result', timeout=5000)

    # poll until result fills
    for _ in range(10):
        txt = page.locator('#result').inner_text()
        if txt.strip():
            print(txt)
            break
        time.sleep(0.5)
    else:
        print('No result captured', file=sys.stderr)

    browser.close()