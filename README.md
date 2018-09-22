sheetdex
--------

An app to locate sheet music within book volumes.

# Use cases
- Find all sheets of the song "Autumn Leaves" returns the Real Book location, Jamey Aebersold versions, Guitar Techniques entries
- Find all sheets by composer "Thelonious Monk"
- Find all sheets by arranger "Nelson Faria"
- Add a new book volume with its metadata and its sheets metadata
- Work with incomplete and extensible metadata

# Model

```
volumes: [{
  title: text
  publication: {
    date: date
    publisher: text
  }
  notes: [json]
  sheets: [{
    title: text
    credits: [{
      role: text
      name: text
    }]
    page: int
    notes: [json]
  }]
}]
```
