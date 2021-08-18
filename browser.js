const puppeteer = require('puppeteer-core');
const config = require('./config');

const disableTransitionDelayCSS = `*,::after,::before{transition-delay:0s!important;transition-duration:0s!important;animation-delay:-.1ms!important;animation-duration:0s!important;animation-play-state:paused!important;caret-color:transparent!important;color-adjust:exact!important}`;

/* Set browser for desktop */
async function getScreenshot(url, type, quality, fullPage) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: config.browserWSEndpoint,
  });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    referer: 'https://statically.io/screenshot/',
  });
  await page.emulate({
    userAgent:
      'Mozilla/5.0 (Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Statically-Screenshot/1.0 (+https://statically.io/screenshot/)',
    viewport: {
      width: 1280,
      height: 960,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    },
  });

  await page.goto(url /*{ waitUntil: 'networkidle0' }*/);
  await page.addStyleTag({ content: disableTransitionDelayCSS });

  const file = await page.screenshot({ type, quality, fullPage });
  await browser.close();
  console.log('HTTP ' + url);
  return file;
}

/* Set browser for mobile */
async function getScreenshotMobile(url, type, quality, fullPage) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: config.browserWSEndpoint,
  });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    referer: 'https://statically.io/screenshot/',
  });
  await page.emulate({
    userAgent:
      'Mozilla/5.0 (Linux Android 5.0 SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36 Statically-Screenshot-Mobile/1.0 (+https://statically.io/screenshot/)',
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false,
    },
  });

  await page.goto(url /*{ waitUntil: 'networkidle0' }*/);
  await page.addStyleTag({ content: disableTransitionDelayCSS });
  
  console.log('HTTP ' + url);
  const file = await page.screenshot({ type, quality, fullPage });
  await browser.close();
  return file;
}

/* Set browser for PDF */
async function generatePdf(url) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: config.browserWSEndpoint,
  });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    referer: 'https://statically.io/screenshot/',
  });
  await page.emulate({
    userAgent:
      'Mozilla/5.0 (Linux Android 5.0 SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Mobile Safari/537.36 Statically-Screenshot-PDF/1.0 (+https://statically.io/screenshot/)',
    viewport: {
      width: 360,
      height: 640,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false,
    },
  });

  await page.goto(url /*{ waitUntil: 'networkidle0' }*/);
  const file = await page.pdf({ format: 'A4' });
  await browser.close();
  console.log('HTTP ' + url);
  return file;
}

module.exports = { getScreenshot, getScreenshotMobile, generatePdf };
