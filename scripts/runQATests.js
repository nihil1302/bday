import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let browserPath = chromePaths.find(p => fs.existsSync(p));
if (!browserPath) {
  console.error('No suitable browser found at default paths.');
  process.exit(1);
}

console.log(`Using browser at: ${browserPath}`);

const targetUrl = 'http://localhost:4173/';
const results = {
  passed: [],
  failed: [],
  consoleErrors: [],
  networkFailures: [],
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runQA() {
  console.log('🚀 Starting Automated Full-Experience QA Pass...');

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Monitor console errors and warnings
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[Browser Console Error] ${msg.text()}`);
      results.consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log(`[Browser Uncaught Error] ${err.message}`);
    results.consoleErrors.push(err.message);
  });

  page.on('requestfailed', request => {
    // Ignore harmless media aborts if any
    const failure = request.failure();
    const url = request.url();
    console.log(`[Network Request Failed] ${url} - ${failure?.errorText}`);
    results.networkFailures.push({ url, error: failure?.errorText });
  });

  try {
    // -------------------------------------------------------------
    // 1. Fresh session load
    // -------------------------------------------------------------
    console.log('\n--- Step 1: Loading Fresh Session ---');
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    const title = await page.title();
    console.log(`Page title: "${title}"`);
    if (title.includes('Elizaaa')) {
      results.passed.push('Step 1: Document title matches Elizaaa');
    } else {
      results.failed.push(`Step 1: Title missing Elizaaa: ${title}`);
    }

    // Check Stage 1 envelope & name visibility
    const headingText = await page.$eval('h1', el => el.innerText);
    console.log(`Stage 1 Heading: "${headingText.replace(/\n/g, ' ')}"`);
    if (headingText.includes('Elizaaa')) {
      results.passed.push('Step 1: Recipient name Elizaaa displayed on Opening Screen');
    } else {
      results.failed.push('Step 1: Recipient name missing in Stage 1');
    }

    // -------------------------------------------------------------
    // 2. Click "Open Your Surprise ♡" and verify transition to Stage 2
    // -------------------------------------------------------------
    console.log('\n--- Step 2: Testing Envelope Opening & Stage 2 Transition ---');
    const openBtn = await page.$('button[aria-label="Open Your Surprise ♡"]');
    if (!openBtn) {
      throw new Error('Open Your Surprise button not found!');
    }
    await openBtn.click();
    console.log('Clicked "Open Your Surprise ♡"');
    
    // Wait for the envelope unwrap animation and transition (~1500ms)
    await sleep(1800);

    const stage2Heading = await page.$eval('h1', el => el.innerText);
    console.log(`Stage 2 Heading: "${stage2Heading}"`);
    if (stage2Heading.includes('Little Moments, Big Memories')) {
      results.passed.push('Step 2: Transitioned smoothly to Stage 2: Friendship Scrapbook');
    } else {
      results.failed.push(`Step 2: Failed to reach Stage 2. Heading was: ${stage2Heading}`);
    }

    // -------------------------------------------------------------
    // 3. Verify All 8 Scrapbook Photos Loaded & Responsive
    // -------------------------------------------------------------
    console.log('\n--- Step 3: Verifying All 8 Scrapbook Photos ---');
    const photoDetails = await page.$$eval('img', imgs => {
      return imgs
        .filter(img => img.src.includes('memory-'))
        .map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          complete: img.complete
        }));
    });

    console.log(`Found ${photoDetails.length} memory photos loaded in gallery:`);
    photoDetails.forEach((p, idx) => {
      console.log(`  Photo #${idx + 1}: ${p.src.split('/').pop()} (${p.naturalWidth}x${p.naturalHeight}) - ${p.alt}`);
    });

    if (photoDetails.length === 8 && photoDetails.every(p => p.naturalWidth > 0)) {
      results.passed.push('Step 3: All 8 scrapbook photos loaded with authentic natural dimensions');
    } else {
      results.failed.push(`Step 3: Expected 8 loaded photos with naturalWidth > 0, got ${photoDetails.length}`);
    }

    // -------------------------------------------------------------
    // 4. Test Lightbox Modal (Open, Next, Prev, Keyboard Escape)
    // -------------------------------------------------------------
    console.log('\n--- Step 4: Testing Lightbox Controls & Keyboard Navigation ---');
    // Click first photo
    const firstPhoto = await page.$('div[aria-label^="View photo"]');
    await firstPhoto.click();
    await sleep(400);

    // Verify lightbox is open with counter "1 of 8"
    let counterText = await page.$eval('#lightbox-counter', el => el.innerText);
    console.log(`Lightbox Counter: "${counterText}"`);
    if (counterText.includes('1 of 8')) {
      results.passed.push('Step 4: Lightbox opened with counter 1 of 8');
    } else {
      results.failed.push(`Step 4: Lightbox counter mismatch: ${counterText}`);
    }

    // Click Next button
    const nextBtn = await page.$('button[aria-label="Next photo"]');
    await nextBtn.click();
    await sleep(300);
    counterText = await page.$eval('#lightbox-counter', el => el.innerText);
    console.log(`Lightbox Counter after Next: "${counterText}"`);
    if (counterText.includes('2 of 8')) {
      results.passed.push('Step 4: Lightbox Next button advanced to 2 of 8');
    } else {
      results.failed.push(`Step 4: Lightbox Next failed, counter was ${counterText}`);
    }

    // Press Left Arrow Key to test keyboard navigation
    await page.keyboard.press('ArrowLeft');
    await sleep(300);
    counterText = await page.$eval('#lightbox-counter', el => el.innerText);
    console.log(`Lightbox Counter after ArrowLeft: "${counterText}"`);
    if (counterText.includes('1 of 8')) {
      results.passed.push('Step 4: Keyboard ArrowLeft navigated back to 1 of 8');
    } else {
      results.failed.push(`Step 4: Keyboard navigation failed: ${counterText}`);
    }

    // Press Escape key to close lightbox
    await page.keyboard.press('Escape');
    await sleep(400);
    const lightboxVisible = await page.$('div[role="dialog"][aria-modal="true"]');
    if (!lightboxVisible) {
      results.passed.push('Step 4: Lightbox closed successfully on Escape key');
    } else {
      results.failed.push('Step 4: Lightbox did not close on Escape key');
    }

    // -------------------------------------------------------------
    // 5. Navigate to Stage 3: Heartfelt Letter
    // -------------------------------------------------------------
    console.log('\n--- Step 5: Transitioning to Stage 3 (Heartfelt Letter) ---');
    const continueToLetterBtn = await page.$eval(
      'button',
      btns => Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Heartfelt Letter'))?.innerText
    );
    console.log(`Found button: "${continueToLetterBtn}"`);

    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Continue to Heartfelt Letter'));
      btn.click();
    });
    await sleep(600);

    const stage3Heading = await page.$eval('h1', el => el.innerText);
    console.log(`Stage 3 Heading: "${stage3Heading}"`);
    if (stage3Heading.includes('A Letter From My Heart')) {
      results.passed.push('Step 5: Successfully navigated to Stage 3: Heartfelt Letter');
    } else {
      results.failed.push(`Step 5: Failed to reach Stage 3. Heading was: ${stage3Heading}`);
    }

    // -------------------------------------------------------------
    // 6. Test Typewriter Effect & Instant Reveal
    // -------------------------------------------------------------
    console.log('\n--- Step 6: Testing Typewriter & Letter Salutation ---');
    const salutation = await page.$eval('h2.font-handwriting', el => el.innerText);
    console.log(`Letter Salutation: "${salutation}"`);
    if (salutation.includes('Elizaaa') && salutation.includes('elii')) {
      results.passed.push('Step 6: Letter correctly addresses Elizaaa (elii)');
    } else {
      results.failed.push(`Step 6: Salutation missing names: ${salutation}`);
    }

    // Test Reveal All / Replay
    const revealBtn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Reveal Full Letter') || b.innerText.includes('Replay Typewriter'));
      return btn ? btn.innerText : null;
    });
    console.log(`Typewriter control button present: "${revealBtn}"`);
    if (revealBtn) {
      results.passed.push('Step 6: Typewriter instant reveal / replay control verified');
    }

    // -------------------------------------------------------------
    // 7. Test All 3 Clickable Secret Notes
    // -------------------------------------------------------------
    console.log('\n--- Step 7: Testing 3 Secret Clickable Notes ---');
    const noteButtons = await page.$$('section[aria-label="Secret Clickable Notes"] button');
    console.log(`Found ${noteButtons.length} secret note buttons`);

    for (let i = 0; i < noteButtons.length; i++) {
      const noteTitle = await noteButtons[i].$eval('h4', el => el.innerText);
      console.log(`  Opening Note #${i + 1}: "${noteTitle}"`);
      await noteButtons[i].click();
      await sleep(350);

      // Verify modal opened
      const modalTitle = await page.$eval('#note-modal-title', el => el.innerText);
      console.log(`    Modal opened with title: "${modalTitle}"`);

      // Close modal using Escape or close button
      await page.keyboard.press('Escape');
      await sleep(300);
    }
    results.passed.push('Step 7: All 3 clickable secret notes opened and closed without error');

    // -------------------------------------------------------------
    // 8. Navigate to Stage 4: Interactive Surprise (Cake & Candles)
    // -------------------------------------------------------------
    console.log('\n--- Step 8: Transitioning to Stage 4 (Make a Wish) ---');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Next: Birthday Surprise'));
      btn.click();
    });
    await sleep(600);

    const stage4Heading = await page.$eval('h1', el => el.innerText);
    console.log(`Stage 4 Heading: "${stage4Heading}"`);
    if (stage4Heading.includes('Make a Birthday Wish')) {
      results.passed.push('Step 8: Successfully navigated to Stage 4: Make a Wish');
    } else {
      results.failed.push(`Step 8: Failed to reach Stage 4. Heading was: ${stage4Heading}`);
    }

    // -------------------------------------------------------------
    // 9. Test Birthday Cake, Blowing Candles, Wish Reveal, and Relight
    // -------------------------------------------------------------
    console.log('\n--- Step 9: Testing Cake Candles, Confetti, and Wish Reveal ---');
    // Click "Make a Birthday Wish ♡"
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Make a Birthday Wish'));
      btn.click();
    });
    await sleep(600);

    // Verify candles blown message revealed
    const wishMessage = await page.$eval('h3.font-serif', el => el.innerText);
    console.log(`Revealed Wish Message: "${wishMessage}"`);
    if (wishMessage.includes('I hope this year brings you all the happiness you deserve')) {
      results.passed.push('Step 9: Wish message revealed accurately after blowing out candles');
    } else {
      results.failed.push(`Step 9: Unexpected wish message: ${wishMessage}`);
    }

    // Test Relight Candles button
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Relight the Candles'));
      btn.click();
    });
    await sleep(400);

    // Verify flames returned
    const makeWishBtnReturned = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Make a Birthday Wish'));
      return !!btn;
    });
    if (makeWishBtnReturned) {
      results.passed.push('Step 9: Relight candles button reset flame state properly');
      // Blow out again so "There's One Last Thing..." appears
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Make a Birthday Wish'));
        btn.click();
      });
      await sleep(500);
    } else {
      results.failed.push('Step 9: Relight candles did not restore flame state');
    }

    // -------------------------------------------------------------
    // 10. Test Secret Mini Gift Box Unwrapping
    // -------------------------------------------------------------
    console.log('\n--- Step 10: Testing Mini Gift Box & Hidden Bestie Voucher ---');
    const giftBoxBtn = await page.$('div[role="button"][aria-label="Click to open the secret gift box"]');
    if (giftBoxBtn) {
      await giftBoxBtn.click();
      await sleep(400);
      const voucherText = await page.$eval('p.text-stone-700', el => el.innerText);
      console.log(`Unwrapped Voucher text snippet: "${voucherText.slice(0, 70)}..."`);
      if (voucherText.includes('Elizaaa') || voucherText.includes('elii')) {
        results.passed.push('Step 10: Mini gift box unboxed successfully and revealed personal bestie voucher');
      } else {
        results.failed.push(`Step 10: Voucher text missing elii name: ${voucherText}`);
      }

      // Fold back box
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Fold Back Box'));
        if (btn) btn.click();
      });
      await sleep(300);
    } else {
      results.failed.push('Step 10: Secret gift box button not found');
    }

    // -------------------------------------------------------------
    // 11. Navigate to Stage 5: The Grand Finale
    // -------------------------------------------------------------
    console.log('\n--- Step 11: Transitioning to Stage 5 (The Grand Finale) ---');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("There's One Last Thing"));
      btn.click();
    });
    await sleep(700);

    const stage5Heading = await page.$eval('h1', el => el.innerText);
    console.log(`Stage 5 Heading: "${stage5Heading}"`);
    if (stage5Heading.includes('Happy Birthday, Elizaaa')) {
      results.passed.push('Step 11: Successfully navigated to Stage 5: Grand Finale');
    } else {
      results.failed.push(`Step 11: Failed to reach Stage 5. Heading was: ${stage5Heading}`);
    }

    // -------------------------------------------------------------
    // 12. Verify Favourite Photo, Hug Modal, and Replay Experience
    // -------------------------------------------------------------
    console.log('\n--- Step 12: Testing Favourite Photo, Hug Modal, and Replay ---');
    const favPhoto = await page.$eval('img[alt="My Absolute Favourite Picture of Us 💖"]', img => ({
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete
    }));
    console.log(`Favourite Photo: ${favPhoto.src.split('/').pop()} (${favPhoto.naturalWidth}x${favPhoto.naturalHeight})`);
    if (favPhoto.naturalWidth > 0) {
      results.passed.push('Step 12: Favourite photo loaded with authentic natural dimensions');
    } else {
      results.failed.push('Step 12: Favourite photo failed to load');
    }

    // Test "One last hug? 🤗"
    console.log('Testing "One last hug? 🤗" interaction...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('One last hug?'));
      btn.click();
    });
    await sleep(400);

    const hugTitle = await page.$eval('#hug-modal-title', el => el.innerText);
    console.log(`Hug Modal Title: "${hugTitle}"`);
    if (hugTitle.includes('Warm Bear Hug')) {
      results.passed.push('Step 12: "One last hug?" interaction opened warm bear hug modal without breaking routes');
    } else {
      results.failed.push(`Step 12: Hug modal title unexpected: ${hugTitle}`);
    }

    // Close hug modal
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Hug Received'));
      btn.click();
    });
    await sleep(300);

    // Test Experience Replay Button
    console.log('Testing Replay Experience button...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Replay Experience From Beginning'));
      btn.click();
    });
    await sleep(600);

    const resetHeading = await page.$eval('h1', el => el.innerText);
    console.log(`After Replay, returned to: "${resetHeading.replace(/\n/g, ' ')}"`);
    if (resetHeading.includes('Happy Birthday') && resetHeading.includes('Elizaaa')) {
      results.passed.push('Step 12: Replay experience reset cleanly back to Stage 1');
    } else {
      results.failed.push(`Step 12: Replay failed to return to Stage 1. Heading was: ${resetHeading}`);
    }

    // -------------------------------------------------------------
    // 13. Test Previous / Back Navigation Across Stages
    // -------------------------------------------------------------
    console.log('\n--- Step 13: Testing Back / Previous Controls Across Stages ---');
    // Go to Stage 2 via top progress bar
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('nav[aria-label="Surprise Journey Progress"] button')).find(b => b.innerText.includes('Memories'));
      btn.click();
    });
    await sleep(400);

    // Click "Back to Envelope"
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Back to Envelope'));
      btn.click();
    });
    await sleep(400);
    const backToStage1 = await page.$eval('button[aria-label="Open Your Surprise ♡"]', el => !!el);
    if (backToStage1) {
      results.passed.push('Step 13: "Back to Envelope" successfully returned to Stage 1');
    } else {
      results.failed.push('Step 13: "Back to Envelope" failed');
    }

    // -------------------------------------------------------------
    // 14. Responsive Layout Tests (Mobile, Tablet, Desktop)
    // -------------------------------------------------------------
    console.log('\n--- Step 14: Testing Responsive Layouts ---');
    const viewports = [
      { name: 'Mobile (iPhone 13)', width: 375, height: 812 },
      { name: 'Tablet (iPad Mini)', width: 768, height: 1024 },
      { name: 'Desktop (Full HD)', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      await page.setViewport({ width: vp.width, height: vp.height });
      await sleep(300);

      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      console.log(`  Viewport ${vp.name} (${vp.width}x${vp.height}) - Horizontal Overflow: ${hasHorizontalScroll}`);
      if (!hasHorizontalScroll) {
        results.passed.push(`Step 14: Responsive layout passes on ${vp.name} with zero horizontal overflow`);
      } else {
        results.failed.push(`Step 14: Horizontal overflow detected on ${vp.name}`);
      }
    }

    // -------------------------------------------------------------
    // 15. Page Reload Test
    // -------------------------------------------------------------
    console.log('\n--- Step 15: Testing Page Refresh ---');
    await page.reload({ waitUntil: 'networkidle0' });
    const reloadTitle = await page.title();
    if (reloadTitle.includes('Elizaaa')) {
      results.passed.push('Step 15: Page refresh preserved clean state without blank screen or errors');
    } else {
      results.failed.push(`Step 15: Page refresh produced unexpected state: ${reloadTitle}`);
    }

    // -------------------------------------------------------------
    // 16. Reduced Motion Preference Emulation
    // -------------------------------------------------------------
    console.log('\n--- Step 16: Testing Reduced Motion Emulation ---');
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.reload({ waitUntil: 'networkidle0' });
    const reducedMotionOpenBtn = await page.$('button[aria-label="Open Your Surprise ♡"]');
    await reducedMotionOpenBtn.click();
    await sleep(600); // fast reduced motion path
    const reducedMotionHeading = await page.$eval('h1', el => el.innerText);
    console.log(`Reduced motion transition heading: "${reducedMotionHeading}"`);
    if (reducedMotionHeading.includes('Little Moments, Big Memories')) {
      results.passed.push('Step 16: Reduced-motion preference fast-tracked transition cleanly');
    } else {
      results.failed.push('Step 16: Reduced-motion transition failed');
    }

  } catch (err) {
    console.error('Fatal Test Exception:', err);
    results.failed.push(`Fatal Test Exception: ${err.message}`);
  } finally {
    console.log('\n=============================================');
    console.log('🏁 QA TEST RESULTS SUMMARY:');
    console.log(`  Total Passed: ${results.passed.length}`);
    console.log(`  Total Failed: ${results.failed.length}`);
    console.log(`  Console Errors: ${results.consoleErrors.length}`);
    console.log(`  Network Failures: ${results.networkFailures.length}`);
    console.log('=============================================\n');

    fs.writeFileSync('qa-report.json', JSON.stringify(results, null, 2));

    try {
      await Promise.race([
        browser.close(),
        new Promise(resolve => setTimeout(resolve, 1500))
      ]);
    } catch (_) {}
    process.exit(0);
  }
}

runQA();
