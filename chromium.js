const puppeteer = require('puppeteer');

/* Set browser for desktop */
async function getScreenshot(url, type, quality, fullPage) {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
        referer: 'https://statically.io/screenshot/'
    });

    await page.emulate({
        'userAgent': 'Mozilla/5.0 (Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 (compatible; Statically-Screenshot; +https://statically.io/screenshot/)',
        'viewport': {
          'width': 1280,
          'height': 960,
          'deviceScaleFactor': 1,
          'isMobile': false,
          'hasTouch': false,
          'isLandscape': true
        }
    });

    await page.goto(url, /*{ waitUntil: 'networkidle0' }*/);
    const file = await page.screenshot({ type, quality, fullPage });
    await browser.close();
    console.log('HTTP ' + url);
    return file;

}

/* Set browser for mobile */
async function getScreenshotMobile(url, type, quality, fullPage) {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
        referer: 'https://statically.io/screenshot/'
    });

    await page.emulate({
        'userAgent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Mobile Safari/537.36 (compatible; Statically-Screenshot; +https://statically.io/screenshot/)',
        'viewport': {
          'width': 360,
          'height': 640,
          'deviceScaleFactor': 1,
          'isMobile': true,
          'hasTouch': true,
          'isLandscape': false
        }
    });

    await page.goto(url, /*{ waitUntil: 'networkidle0' }*/);
    console.log('HTTP ' + url);
    const file = await page.screenshot({ type, quality, fullPage });
    await browser.close();
    return file;
    
}

module.exports = { getScreenshot, getScreenshotMobile };
