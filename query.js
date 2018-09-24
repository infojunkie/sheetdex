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

// Read Jamey Aebersold index.
// http://www.jazzbooks.com/mm5/download/FREE-RAP-133.xls
books = books.concat(Array.from( Papa.parse(fs.readFileSync('./books/jamey-aebersold.csv', 'utf8'), {
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
}, new Map()).values() ));

// Read Guitar Techniques index.
// https://docs.google.com/spreadsheets/d/1dME8bOIAJL573h4_q1RLFwHJGqG-Y4tP1jrUJZpE9mw
books = books.concat(Array.from( Papa.parse(fs.readFileSync('./books/guitar-techniques.csv', 'utf8'), {
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
}, new Map()).values() ));

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

// Print results.
console.log(`Query: ${query}\n\n`, results);
