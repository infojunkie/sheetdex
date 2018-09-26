// Bob Keller's Fakebook index
// https://docs.google.com/spreadsheet/ccc?key=0Au7yxUr1zqGNdGNidDloZ2xramV5MXB5aDg0LXlGZlE

import Papa from 'papaparse';
import fs from 'fs';

export default function index() {
  return Array.from( Papa.parse(fs.readFileSync('./books/bob-keller.csv', 'utf8'), {
    skipEmptyLines: true
  }).data.reduce((map, sheet) => {
    // Populate a map (vol # => book struct)
    const vol = sheet[0];
    const book = map.get(vol) || {
      title: vol,
      sheets: []
    };
    book.sheets.push({
      title: sheet[1]
    });
    map.set(vol, book);
    return map;
  }, new Map()).values() );
}
