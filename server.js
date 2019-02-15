// Web server

import { spawn } from 'child_process';
import express from 'express';
import http from 'http';
import https from 'https';
import bodyParser from 'body-parser';
import querystring from 'querystring';
import favicon from 'serve-favicon';
import jp from 'jsonpath';
import normalize from 'nlcst-normalize';
import masterIndex from './master-index';
import config from './config';
import fs from 'fs';

const {PORT = 8080} = process.env;

const credentials = {
  key: null,
  cert: null,
  ca: null
};
if (config.ssl) {
  try {
    credentials.key = fs.readFileSync(config.ssl.key);
    credentials.cert = fs.readFileSync(config.ssl.cert);
    credentials.ca = fs.readFileSync(config.ssl.ca);
  }
  catch (e) {}
}

const app = express();
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.enable('trust proxy');
app.set('view engine', 'ejs');

// Build the index.
console.log("Building index...");
const books = masterIndex();
jp.scope({ normalizeCompare: (a,b) => {
  return normalize(a).includes(normalize(b));
}});

function query(query) {
  if (!query || query.length < 3) return [];
  return jp.nodes(books, `$..sheets[?(normalizeCompare(@.title, '${query}'))]`).map(sheet => {
    return {
      book: books[sheet.path[1]].title,
      sheet: sheet.value.title,
      page: sheet.value.page || '(unknown)'
    }
  });
}

app.get('/', (req, res) => {
  console.log(`[${(new Date()).toISOString()}] ${req.ip} ${req.get('User-Agent')}: ${req.query.query || '(empty)'}`);
  res.render('form', { query: req.query.query, results: query(req.query.query) });
});

if (!credentials.key) {
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(`Sheetdex is listening on HTTP port ${PORT}...`);
  });
}
else {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT, () => {
    console.log(`Sheetdex is listening on HTTPS port ${PORT}...`);
  });
}
