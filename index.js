// Index builder

import indexBookIndices from './book-indices';
import indexJameyAebersold from './jamey-aebersold';
import indexGuitarTechniques from './guitar-techniques';
import indexRealBookSongFinder from './realbook-songfinder';
import indexBobKeller from './bob-keller.js';

export default function index() {
  return indexBookIndices()
  .concat(indexRealBookSongFinder())
  .concat(indexBobKeller())
  .concat(indexJameyAebersold())
  .concat(indexGuitarTechniques());
}
