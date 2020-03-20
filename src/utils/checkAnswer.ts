// import leven from 'leven';

const REPLACE_LETTERS = 'éèêàûüîïâ'.split('');
const BY_LETTERS = 'eeeauuiia'.split('');

const WORD_SPLIT = /[ ']/;
const HANDLED_CHARS = /[0-9A-Za-zéèêàûüîïâ ')(.-]/g;

const SKIPPED_WORDS = ['de', 'des', 'd', 'a', 'du', 'l', 's', 'et'];

function toNormArray(str: string): Array<string> {
  const normalized = str
    .split('')
    .map(letter => {
      const index = REPLACE_LETTERS.indexOf(letter);
      if (index >= 0) {
        return BY_LETTERS[index];
      }
      return letter;
    })
    .join('')
    .toLowerCase();
  // Validation
  const empty = normalized.replace(HANDLED_CHARS, '');
  if (empty.length > 0) {
    console.warn(empty);
  }
  const words = normalized.split(WORD_SPLIT);
  return words;
}

// return an array of response found (string) or null
export function checkAnswer(anwser: string, input: string): Array<string | null> {
  const anwserWords = toNormArray(anwser);
  const rawWords = anwser.split(/[ ']/);
  // const inputWords = toNormArray(input);
  if (anwserWords.length !== rawWords.length) {
    console.warn(anwserWords, rawWords);
  }
  const small = anwserWords
    .filter(v => v.length <= 4)
    .filter(w => SKIPPED_WORDS.includes(w) === false);
  if (small.length) {
    console.log(small);
  }

  return [];
}
