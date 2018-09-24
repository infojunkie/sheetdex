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
        label: 'CD Track',
        content: { value: row[6]}
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

  // Populate a map (vol # => book struct)
  const key = `#${sheet['Guitar Techniques #']} ${sheet['Month']} ${sheet['Year']}`;
  const book = map.get(key) || {
    title: `Guitar Techniques ${key}`,
    publisher: {
      name: 'Guitar Techniques',
      date: sheet['Year']
    },
    sheets: []
  };
  book.sheets.push({
    title: sheet['Song Name'],
    page: sheet['Pages'],
    notes:[
      {
        label: 'Performer',
        content: { value: sheet['Band/ Group Name/ Performer']}
      },
      {
        label: 'Style',
        content: { value: sheet['Style']}
      },
      {
        label: 'Type',
        content: { value: sheet['Type']}
      },
      {
        label: 'Key',
        content: { value: sheet['Key']}
      },
      {
        label: 'Ability',
        content: { value: sheet['Ability Rating']}
      },
      {
        label: 'Tempo',
        content: { value: sheet['Tempo']}
      },
      {
        label: 'CD Track',
        content: { value: sheet['CD']}
      },
      {
        label: 'Tutor',
        content: { value: sheet['GT Tutor']}
      },
      {
        label: 'Comment',
        content: { value: sheet['Comment']}
      },
      {
        label: 'Skill',
        content: { value: sheet['Will Improve Your']}
      }
    ]
  });
  map.set(key, book);
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
