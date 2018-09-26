// book-indices
// https://github.com/aspiers/book-indices with our hand-made index index.

import Papa from 'papaparse';
import fs from 'fs';

export default function index() {
  return Papa.parse(fs.readFileSync('./books/book-indices.csv', 'utf8')).data.map(row => {
    return {
      title: row[0],
      file: row[1]
    }
  }).map(book => {
    return {
      title: book.title,
      sheets: Papa.parse(fs.readFileSync(`./books/book-indices/${book.file}`, 'utf8')).data.map(row => {
        return {
          title: row[0],
          page: row[2] ? `${row[1]}-${row[2]}` : row[1]
        }
      })
    };
  });
}
