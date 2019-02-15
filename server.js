// Web server

import { spawn } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import querystring from 'querystring';
import favicon from 'serve-favicon';
import jp from 'jsonpath';
import normalize from 'nlcst-normalize';
import masterIndex from './master-index';

const {PORT = 8080} = process.env;

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

const server = app.listen(PORT, function() {
  console.log(`Sheetdex is listening on port ${PORT}...`);
});
