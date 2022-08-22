const api = 'http://api.aeneid.eu/versions/';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const timer = ms => new Promise(res => setTimeout(res, ms))

export function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export async function getPassage(version) {
  let url = api + version + '/';

  // choose a random book
  const bookNum = randInt(1, 13).toString();
  const randomBook = await fetch(url + bookNum).then(res => res.json());
  const upperBound = randomBook.lines;

  // update url with random book
  url = url + bookNum + '/';

  // choose random line
  const lineNum = randInt(1, upperBound);

  const lineArray = [];
  async function getNextLines() {
    for (let i = 0; i < 5; i++) {
      console.log(i);
      let nextLine = await fetch(url + (lineNum + i).toString()).then(res =>
        res.json());
      lineArray.push(nextLine);
      await timer(1000);
    }
  }
  getNextLines();
  return lineArray;
}