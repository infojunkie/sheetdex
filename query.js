import fs from 'fs';
import jp from 'jsonpath';
import Papa from 'papaparse';
import glob from 'glob';

// Build our index.
let books = [];
glob.sync('./books/*.json').forEach(file => {
  books.push(JSON.parse(fs.readFileSync(file)));
});

// Read book-indices.
// https://github.com/aspiers/book-indices with our hand-made index index.
Papa.parse(fs.readFileSync('./books/book-indices.csv', 'utf8')).data.map(row => {
  return {
    title: row[0],
    file: row[1]
  }
}).forEach(book => {
  books.push({
    title: book.title,
    sheets: Papa.parse(fs.readFileSync(`./books/book-indices/${book.file}`, 'utf8')).data.map(row => {
      return {
        title: row[0],
        page: row[2] ? `${row[1]}-${row[2]}` : row[1]
      }
    })
  });
});

// Read Jamey Aebersold.
// http://www.jazzbooks.com/mm5/download/FREE-RAP-133.xls
books = books.concat(Array.from( Papa.parse(fs.readFileSync('./books/jamey-aebersold.csv', 'utf8'), {
  skipEmptyLines: true,
  header: true
}).data.reduce((map, row) => {
  // Populate a map (vol # => book struct)
  const vol = row[1];
  const book = map.get(vol) || {
    title: `Jamey Aebersold Play-Along Vol. ${vol}`,
    publisher: {
      name: 'Jamey Aebersold'
    },
    sheets: []
  };
  book.sheets.push({
    title: row[0],
    notes:[
      {
        label: 'Style',
        content: { value: row[2]}
      },
      {
        label: 'Key',
        content: { value: row[3]}
      },
      {
        label: 'Tempo',
        content: { value: row[4]}
      },
      {
        label: 'Choruses',
        content: { value: row[5]}
      },
      {
        label: 'Track',
        content: { value: row[6]}
      }
    ]
  });
  map.set(vol, book);
  return map;
}, new Map()).values() ));

// Perform query.
const query = process.argv[2];
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
console.log(results);
