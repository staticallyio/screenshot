const config = require('./config');
const etag = require('etag');
const { parse } = require('url');
const { getScreenshot, getScreenshotMobile } = require('./chromium');
const { getInt, getUrlFromPath, getUrlFromPathMobile, isValidUrl } = require('./validator');

/* Get desktop view */
async function getDesktop(req, res) {
    try {
        const { pathname = '/', query = {} } = parse(req.url, true);
        const { type = 'png', quality, fullPage } = query;
        const url = getUrlFromPath(pathname);
        const qual = getInt(quality);
        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.sendFile(config.publicDir + '/errors/400.html');
        } else {
            const file = await getScreenshot(url, type, qual, fullPage);
            res.statusCode = 200;
            res.setHeader('Content-Type', `image/${type}`);
            res.setHeader('Cache-Control', 'public, max-age=2678400, immutable'); // 1 month CDN cache to save resources
            res.setHeader('ETag', etag(file));
            res.setHeader('Vary', 'Accept-Encoding');
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.sendFile(config.publicDir + '/errors/500.html');
        console.error(e.message);
    }
}

/* Get mobile view */
async function getMobile(req, res) {
    try {
        const { pathname = '/', query = {} } = parse(req.url, true);
        const { type = 'png', quality, fullPage } = query;
        const url = getUrlFromPathMobile(pathname);
        const qual = getInt(quality);
        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.sendFile(config.publicDir + '/errors/400.html');
        } else {
            const file = await getScreenshotMobile(url, type, qual, fullPage);
            res.statusCode = 200;
            res.setHeader('Content-Type', `image/${type}`);
            res.setHeader('Cache-Control', 'public, max-age=2678400, immutable'); // 1 month CDN cache to save resources
            res.setHeader('ETag', etag(file));
            res.setHeader('Vary', 'Accept-Encoding');
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.sendFile(config.publicDir + '/errors/500.html');
        console.error(e.message);
    }
}

module.exports = { getDesktop, getMobile }