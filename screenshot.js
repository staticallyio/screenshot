const etag = require('etag');
const config = require('./config');
const { parse } = require('url');
const {
  getScreenshot,
  getScreenshotMobile,
  generatePdf,
} = require('./browser');
const { getInt, isValidUrl } = require('./validator');

/* Get desktop view */
async function getDesktop(req, res) {
  try {
    const { pathname = '/', query = {} } = parse(req.url, true);
    const { type = 'png', quality, fullPage } = query;
    const base = '/screenshot/';
    const target = pathname.replace(base, '');
    const url = 'http://' + target;
    const qual = getInt(quality);
    if (!isValidUrl(url)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=5');
      res.sendFile(config.publicDir + '/error-400.png');
    } else {
      const file = await getScreenshot(url, type, qual, fullPage);
      const filename = 'statically_' + target + `.${type}`;
      res.statusCode = 200;
      res.setHeader('Content-Disposition', `filename="` + filename + `"`);
      res.setHeader('Content-Type', `image/${type}`);
      res.setHeader('Cache-Control', 'public, max-age=2678400, immutable'); // 1 month CDN cache to save resources
      res.setHeader('ETag', etag(file));
      res.end(file);
    }
  } catch (e) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=5');
    res.sendFile(config.publicDir + '/error-500.png');
    console.error(e.message);
  }
}

/* Get mobile view */
async function getMobile(req, res) {
  try {
    const { pathname = '/', query = {} } = parse(req.url, true);
    const { type = 'png', quality, fullPage } = query;
    const base = '/screenshot/mobile/';
    const target = pathname.replace(base, '');
    const url = 'http://' + target;
    const qual = getInt(quality);
    if (!isValidUrl(url)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=5');
      res.sendFile(config.publicDir + '/error-400.png');
    } else {
      const file = await getScreenshotMobile(url, type, qual, fullPage);
      const filename = 'statically_' + target + `.${type}`;
      res.statusCode = 200;
      res.setHeader('Content-Disposition', `filename="` + filename + `"`);
      res.setHeader('Content-Type', `image/${type}`);
      res.setHeader('Cache-Control', 'public, max-age=2678400, immutable'); // 1 month CDN cache to save resources
      res.setHeader('ETag', etag(file));
      res.end(file);
    }
  } catch (e) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=5');
    res.sendFile(config.publicDir + '/error-500.png');
    console.error(e.message);
  }
}

/* Get PDF */
async function getPdf(req, res) {
  try {
    const base = '/screenshot/pdf/';
    const target = req.url.replace(base, '');
    const url = 'http://' + target;
    if (!isValidUrl(url)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=5');
      res.sendFile(config.publicDir + '/error-400.png');
    } else {
      const file = await generatePdf(url);
      const filename = 'statically_' + target + '.pdf';
      res.statusCode = 200;
      res.setHeader('Content-Disposition', `filename="` + filename + `"`);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Cache-Control', 'public, max-age=2678400, immutable'); // 1 month CDN cache to save resources
      res.setHeader('ETag', etag(file));
      res.end(file);
    }
  } catch (e) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=5');
    res.sendFile(config.publicDir + '/error-500.png');
    console.error(e.message);
  }
}

module.exports = { getDesktop, getMobile, getPdf };
