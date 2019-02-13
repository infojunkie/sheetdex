// Query command

import jp from 'jsonpath';
import normalize from 'nlcst-normalize';
import masterIndex from './master-index';

// Build the index.
const books = masterIndex();

// Perform query.
if (process.argv.length <= 2 || !process.argv[2]) { console.error("No query"); process.exit(1); }
const query = process.argv.slice(2).join(' ').replace("'", "\\'");
jp.scope({ normalizeCompare: (a,b) => {
  return normalize(a).includes(normalize(b));
}});
const results = jp.nodes(books, `$..sheets[?(normalizeCompare(@.title, '${query}'))]`).map(sheet => {
  return {
    book: books[sheet.path[1]].title,
    sheet: sheet.value.title,
    page: sheet.value.page || '(unknown)'
  }
});
console.info(JSON.stringify(results, null, 2));
