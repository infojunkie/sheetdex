import fs from 'fs';
import jp from 'jsonpath';
import Papa from 'papaparse';

const books = [];

// Read our indexes.
fs.readdirSync('./books').forEach(file => {
  books.push(JSON.parse(fs.readFileSync(`./books/${file}`)));
});

// Read book-indices.
Papa.parse(fs.readFileSync('./book-indices.csv', 'utf8')).data.map(row => {
  return {
    title: row[0],
    file: row[1]
  }
}).forEach(book => {
  books.push({
    title: book.title,
    sheets: Papa.parse(fs.readFileSync(`./book-indices/${book.file}`, 'utf8')).data.map(row => {
      return {
        title: row[0],
        page: row[1]
      }
    })
  });
})

// Perform query.
const query = process.argv[2];
const results = jp.nodes(books, `$..sheets[?(@.title == '${query}')]`).map(sheet => {
  return {
    book: books[sheet.path[1]].title,
    page: sheet.value.page
  }
});
console.log(`Searching for "${query}":\n`, results);
