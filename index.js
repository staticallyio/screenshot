#!/usr/bin/env node

'use strict';

const express = require('express');

const { getMobile, getDesktop, getPdf } = require('./screenshot');

const app = express();

// Disable `X-Powered-By` header
app.disable('x-powered-by');

app.get('/screenshot/pdf/*', getPdf);
app.get('/screenshot/mobile/*', getMobile);
app.get('/*', getDesktop);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Screenshot listen on http://localhost:${port}`),
);
