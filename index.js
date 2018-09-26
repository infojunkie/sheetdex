// Index builder

import indexBookIndices from './book-indices';
import indexJameyAebersold from './jamey-aebersold';
import indexGuitarTechniques from './guitar-techniques';
import indexRealBookSongFinder from './realbook-songfinder';

export default function index() {
  return indexBookIndices()
  .concat(indexRealBookSongFinder())
  .concat(indexJameyAebersold())
  .concat(indexGuitarTechniques());
}
