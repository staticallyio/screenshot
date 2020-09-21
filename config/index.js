'use strict';

const path = require('path')

module.exports = {
    // Public directory containing static files
    publicDir: path.join(__dirname, '..', 'public'),

    // Remote browser endpoint
    browserWSEndpoint: process.env.REMOTE_BROWSER || 'ws://localhost:3000'
}