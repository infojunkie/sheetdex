sheetdex
--------

An app to locate sheet music within book volumes.

# Use cases
- Find all sheets of the song "Autumn Leaves" returns the Real Book location, Jamey Aebersold versions, Guitar Techniques entries
- Find all sheets by composer "Thelonious Monk"
- Find all sheets by arranger "Nelson Faria"
- Parse existing indexes
- Support flexible metadata

# Model

```
note: {
  type: text
  value: text or json
}

volumes: [{
  title: text
  publication: {
    date: date
    publisher: text
  }
  notes: [note]
  sheets: [{
    title: text
    page: text ("page" or "page1-page2")
    credits: [{
      role: text
      name: text
    }]
    notes: [note]
  }]
}]
```

# Usage
```
$ npm run query "autumn leaves"

> sheetdex@1.0.0 query /media/kratib/data/src/infojunkie/sheetdex
> npx babel-node query.js "autumn leaves"

Query: autumn leaves

 [ { book: 'Colorado Cookbook, The',
    sheet: 'Autumn Leaves',
    page: '26' },
  { book: 'Jazz Fake Book', sheet: 'Autumn Leaves', page: '49' },
  { book: 'The New Real Book', sheet: 'Autumn Leaves', page: '25' },
  { book: 'The Real Book, Bb Edition',
    sheet: 'Autumn Leaves',
    page: '46' },
  { book: 'The Real Book', sheet: 'Autumn Leaves', page: '49' },
  { book: 'The Real Vocal Book',
    sheet: 'Autumn Leaves',
    page: '53' },
  { book: 'Jamey Aebersold Play-Along Vol. 20',
    sheet: 'Autumn Leaves**',
    page: '(unknown)' },
  { book: 'Jamey Aebersold Play-Along Vol. 44',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Jamey Aebersold Play-Along Vol. 54',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Jamey Aebersold Play-Along Vol. 67',
    sheet: 'Autumn Leaves (All Keys)',
    page: '(unknown)' },
  { book: 'Guitar Techniques 224 December 2013',
    sheet: 'Autumn Leaves',
    page: '38-43' } ]
```
