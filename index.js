import fs from 'fs';
import jp from 'jsonpath';

const volumes = [];
fs.readdirSync('./books').forEach(file => {
  volumes.push(JSON.parse(fs.readFileSync(`./books/${file}`)));
});
const query = process.argv[2];
const results = jp.nodes(volumes, `$..sheets[?(@.title === '${query}')]`).map(sheet => {
  return {
    book: volumes[sheet.path[1]].title,
    page: sheet.value.page
  }
});
console.log("Your results are: ", results);
