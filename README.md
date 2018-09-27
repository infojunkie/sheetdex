sheetdex
--------

An app to locate sheet music within book volumes.

# Use cases
- [x] Find all sheets of the song "Autumn Leaves" returns the Real Book location, Jamey Aebersold versions, Guitar Techniques entries
- [ ] Find all sheets by composer "Thelonious Monk"
- [ ] Find all sheets by arranger "Nelson Faria"
- [x] Parse existing indexes
- [x] Support flexible metadata

# Usage
```
$ git clone --recurse-submodules git@github.com:infojunkie/sheetdex.git && cd sheetdex && npm i
$ npm run query "autumn leaves"

> sheetdex@1.0.0 query /media/kratib/data/src/infojunkie/sheetdex
> npx babel-node query.js "autumn leaves"

Query: autumn leaves

 [ { book: 'Colorado Cookbook, The',
    sheet: 'Autumn Leaves',
    page: '26' },
  { book: 'Jazz Fake Book', sheet: 'Autumn Leaves', page: '49' },
  { book: 'The New Real Book', sheet: 'Autumn Leaves', page: '25' },
  { book: 'The Real Book – Volume I',
    sheet: 'Autumn Leaves',
    page: '49' },
  { book: 'The Real Vocal Book – Volume I',
    sheet: 'Autumn Leaves',
    page: '53' },
  { book: 'The Real Book – Volume I',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'The Real Jazz Solos Book',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'The Real Vocal Book – Volume I',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Real Vocal Book, Vol. 1',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Performer\'s Fake Book',
    sheet: 'Autumn Leaves (Les Feuilles Mortes)',
    page: '(unknown)' },
  { book: 'Best Fake Book Ever',
    sheet: 'Autumn Leaves (Les Feuilles Mortes)',
    page: '(unknown)' },
  { book: 'Ultimate Jazz Fakebook',
    sheet: 'Autumn Leaves (Les Feuilles Mortes)',
    page: '(unknown)' },
  { book: 'Jazz of the 50\'s',
    sheet: 'Autumn Leaves (Les Feuilles Mortes)',
    page: '(unknown)' },
  { book: 'Real Book 6th Ed.',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Pocket Changes (1)',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Real Book, Vol. 1',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'HL Jazz Standards Fake Book',
    sheet: 'Autumn Leaves (Les Feuilles Mortes)',
    page: '(unknown)' },
  { book: 'New Real Book, Vol. 1',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Grigson\'s Jazz Chord Book',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
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
  { book: 'Guitar Techniques 120 January 2006',
    sheet: 'Autumn Leaves',
    page: '(unknown)' },
  { book: 'Guitar Techniques 224 December 2013',
    sheet: 'Autumn Leaves',
    page: '38-43' },
  { book: 'Monster 1', sheet: 'Autumn Leaves', page: '170' },
  { book: 'Spaces 4 - Compendium of Jazz Tastes',
    sheet: 'Autumn Leaves',
    page: '10' },
  { book: 'Anthologie - Chords',
    sheet: 'Autumn Leaves',
    page: '25' },
  { book: 'Jamey Aebersold Play-Along Vol. 44',
    sheet: 'Autumn Leaves',
    page: '(unknown)' } ]
```

# Model

```
note: {
  type: text
  value: text or json
}

book: {
  title: text
  notes: [note]
  sheets: [{
    title: text
    page: text ("page" or "page1-page2")
    notes: [note]
  }]
}
```
