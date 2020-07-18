const { URL } = require('url');

function getInt(str) {
    return /[0-9]+/.test(str) ? parseInt(str) : undefined;
}

function getUrlFromPath(str) {
    let url = str.slice(12); // slice "/screenshot/" 13 characters
    if (!url.startsWith('https')) {
        return 'http://' + url;
    }
    return url;
}

function getUrlFromPathMobile(str) {
    let url = str.slice(19); // slice "/screenshot/mobile/" 19 characters
    if (!url.startsWith('https')) {
        return 'http://' + url;
    }
    return url;
}

function isValidUrl(str) {
    try {
        const url = new URL(str);
        return url.hostname.includes('.');
    } catch(e) {
        console.error(e.message);
        return false;
    }
}

module.exports = { getInt, getUrlFromPath, getUrlFromPathMobile, isValidUrl };