import Papa from 'papaparse';
import fs from 'fs';

export function indexGuitarTechniques() {
  // Read Guitar Techniques index.
  // https://docs.google.com/spreadsheets/d/1dME8bOIAJL573h4_q1RLFwHJGqG-Y4tP1jrUJZpE9mw
  return Array.from( Papa.parse(fs.readFileSync('./books/guitar-techniques.csv', 'utf8'), {
    skipEmptyLines: true,
    header: true
  }).data.reduce((map, sheet) => {
    // Skip if no page.
    if (!sheet['Pages']) return map;

    // Populate a map (key => book struct)
    const key = `${sheet['Guitar Techniques #']} ${sheet['Month']} ${sheet['Year']}`;
    const book = map.get(key) || {
      title: `Guitar Techniques ${key}`,
      notes: [
        {
          type: 'publisher',
          value: 'Guitar Techniques'
        },
        {
          type: 'date',
          value: sheet['Year']
        }
      ],
      sheets: []
    };
    book.sheets.push({
      title: sheet['Song Name'],
      page: sheet['Pages'],
      notes:[
        {
          type: 'performer',
          value: sheet['Band/ Group Name/ Performer']
        },
        {
          type: 'style',
          value: sheet['Style']
        },
        {
          type: 'type',
          value: sheet['Type']
        },
        {
          type: 'key',
          value: sheet['Key']
        },
        {
          type: 'ability',
          value: sheet['Ability Rating']
        },
        {
          type: 'tempo',
          value: sheet['Tempo']
        },
        {
          type: 'cd-track',
          value: sheet['CD']
        },
        {
          type: 'instructor',
          value: sheet['GT Tutor']
        },
        {
          type: 'comment',
          value: sheet['Comment']
        },
        {
          type: 'skill',
          value: sheet['Will Improve Your']
        }
      ]
    });
    map.set(key, book);
    return map;
  }, new Map()).values() );
}
