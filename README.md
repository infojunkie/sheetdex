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
$ npm run server

> sheetdex@1.0.0 server /media/kratib/data/src/infojunkie/sheetdex
> npx babel-node server.js

Building index...
Sheetdex is listening on port 8080...
^C
$ npm run query "autumn leaves"

> sheetdex@1.0.0 query /media/kratib/data/src/infojunkie/sheetdex
> npx babel-node query.js "autumn leaves"

[
  {
    "book": "Colorado Cookbook, The",
    "sheet": "Autumn Leaves",
    "page": "26"
  },
  {
    "book": "Jazz Fake Book",
    "sheet": "Autumn Leaves",
    "page": "49"
  },
  ...
]
```

# Model

```
note: {
  type: text
  value: text or json
}

book: {
  title: text
  index: text or [text]
  notes: [note]
  sheets: [{
    title: text
    page: text or [text] in case of conflicts
    notes: [note]
  }]
}
```
