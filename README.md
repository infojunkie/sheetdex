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
  label: text
  content: json
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
