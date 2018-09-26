// Real Book Songfinder
// https://www.halleonard.com/search/search.action?seriesfeature=REALBK
// https://www.halleonard.com/bin/MiscRealbksongfndr2018.pdf
//
// Convert to text and cleanup
// `pdftotext MiscRealbksongfndr2018.pdf books/readbook-songfinder.txt`
// `sed 's/[\x01-\x7F]//g' -i books/realbook-songfinder.txt`

import fs from 'fs';

export default function index() {
  // Read file.
  const file = fs.readFileSync('./books/realbook-songfinder.txt', 'utf8');

  // Get the list of books
  const books = new Map();
  let match = null;
  const rebooks = /(\d{2})\. (.*?)( • \d*)?$/gm;
  while (match = rebooks.exec(file)) {
    books.set(match[1], {
      title: match[2],
      sheets: []
    });
  }

  // Get the list of sheets.
  const resheets = /(.+?|.{2,}?[\s].*?)\(([\d, ]+)\)/g;
  while (match = resheets.exec(file)) {
    // Iterate on each book found.
    match[2].match(/\d+/g).forEach(vol => {
      const book = books.get(vol);
      if (!book) {
        console.error(`Real Book Songfinder: Book ${vol} not found in index. Skipping tune ${match[1]}.`);
        return;
      }
      book.sheets.push({
        title: match[1].trim().replace(/(\r\n\t|\n|\r\t)/gm, '')
      });
      books.set(vol, book);
    })
  }
  return [...books.values()];
}
