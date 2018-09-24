import jp from 'jsonpath';
import { indexBookIndices } from './book-indices';
import { indexJameyAebersold } from './jamey-aebersold';
import { indexGuitarTechniques } from './guitar-techniques';

// Build our index.
const books = indexBookIndices()
  .concat(indexJameyAebersold())
  .concat(indexGuitarTechniques());

// Perform query.
if (!process.argv[2]) { console.error("No query"); process.exit(0); }
const query = process.argv[2].replace("'", "\\'");
jp.scope({ normalizeCompare: (a,b) => {
  return a.toLowerCase().includes(b.toLowerCase());
}});
const results = jp.nodes(books, `$..sheets[?(normalizeCompare(@.title, '${query}'))]`).map(sheet => {
  return {
    book: books[sheet.path[1]].title,
    sheet: sheet.value.title,
    page: sheet.value.page || '(unknown)'
  }
});
console.log(`Query: ${query}\n\n`, results);
