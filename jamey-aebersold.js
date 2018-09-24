import Papa from 'papaparse';
import fs from 'fs';

export function indexJameyAebersold() {
  // Read Jamey Aebersold index.
  // http://www.jazzbooks.com/mm5/download/FREE-RAP-133.xls
  return Array.from( Papa.parse(fs.readFileSync('./books/jamey-aebersold.csv', 'utf8'), {
    skipEmptyLines: true,
    header: true
  }).data.reduce((map, sheet) => {
    // Populate a map (vol # => book struct)
    const vol = sheet['Vol #'];
    const book = map.get(vol) || {
      title: `Jamey Aebersold Play-Along Vol. ${vol}`,
      notes: [{
        type: 'publisher',
        value: 'Jamey Aebersold'
      }],
      sheets: []
    };
    book.sheets.push({
      title: sheet['Tune Title'],
      notes:[
        {
          type: 'style',
          value: sheet['Vehicle Type']
        },
        {
          type: 'key',
          value: sheet['Key']
        },
        {
          type: 'tempo',
          value: sheet['Tempo']
        },
        {
          type: 'count-choruses',
          value: sheet['# of choruses']
        },
        {
          type: 'cd-track',
          value: sheet['CD Track #']
        }
      ]
    });
    map.set(vol, book);
    return map;
  }, new Map()).values() );
}
