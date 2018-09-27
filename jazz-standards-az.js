// Jazz Standards A-Z
// https://docs.google.com/spreadsheets/d/1r73cqVcx_UrV01O7wb7rIj8h2X38ZLUKkn9Hc7bZ3Ao

import Papa from 'papaparse';
import fs from 'fs';

export default function index() {
  return Array.from(Papa.parse(fs.readFileSync('./books/jazz-standards-az.csv', 'utf8'), {
    skipEmptyLines: true,
    header: true
  }).data.reduce((map, col) => {
    Object.keys(col).filter(k => !['1', 'Title'].includes(k) && col[k]).forEach(k => {
      // Special case: "Aebersold Volume" actually refers to volume, not page.
      const { key, page } = (k === 'Aebersold Volume') ?
        {
          key: `Jamey Aebersold Play-Along Vol. ${col[k]}`,
          page: null
        } : {
          key: k,
          page: col[k]
        };
      // Populate the book map.
      const book = map.get(key) || {
        title: key,
        index: 'jazz-standards-az',
        sheets: []
      };
      book.sheets.push({
        title: col['Title'],
        page: page
      });
      map.set(key, book);
    });
    return map;
  }, new Map()).values());
}
