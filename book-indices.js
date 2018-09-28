// book-indices
// https://github.com/aspiers/book-indices with our hand-made index index.

import Papa from 'papaparse';
import fs from 'fs';

export default function index() {
  return Papa.parse(fs.readFileSync('./books/book-indices.csv', 'utf8'), {
    skipEmptyLines: true
  }).data.map(row => {
    return {
      title: row[0],
      file: row[1]
    }
  }).map(book => {
    return {
      title: book.title,
      index: 'book-indices',
      sheets: Papa.parse(fs.readFileSync(`./books/book-indices/${book.file}`, 'utf8'), {
        skipEmptyLines: true
      }).data.filter(row => !row[0].startsWith('#')).map(row => {
        return {
          title: row[0],
          page: row[2] ? `${row[1]}-${row[2]}` : row[1]
        }
      })
    };
  });
}
