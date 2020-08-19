#!/usr/bin/env node

"use strict";

const express = require('express');

const { getMobile, getDesktop } = require('./screenshot');

const app = express();

app.disable('x-powered-by');

app.get('/screenshot/mobile/*', getMobile);
app.get('/*', getDesktop);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`I listen on http://localhost:${port}`));