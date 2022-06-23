const api = 'http://api.aeneid.eu/versions/';

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export async function getPassage(version) {
  let url = api + version + '/'
  // choose a random book
  const bookNum = randInt(1, 13).toString();
  const randomBook = await fetch(url + bookNum).then(res => res.json());
  const upperBound = randomBook.lines;

  // choose random line
  const lineNum = randInt(1, upperBound).toString();
  const randomLine = await fetch(url + bookNum + '/' + lineNum).then(res => 
    res.json());
  return randomLine.text;
}