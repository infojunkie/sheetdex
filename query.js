// Query command

import jp from 'jsonpath';
import normalize from 'nlcst-normalize';
import indexBooks from './index';

// Build the index.
const books = indexBooks();

// Perform query.
if (!process.argv[2]) { console.error("No query"); process.exit(0); }
const query = process.argv[2].replace("'", "\\'");
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
console.log(`Query: ${query}\n\n`, results);
