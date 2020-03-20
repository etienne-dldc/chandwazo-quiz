// import leven from 'leven';

const REPLACE_LETTERS = 'éèêàûüîïâ'.split('');
const BY_LETTERS = 'eeeauuiia'.split('');

// return an array of response found (string) or null
export function checkAnswer(anwser: string, input: string): Array<string | null> {
  const normalized = anwser
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
  const empty = normalized.replace(/[0-9A-Za-zéèêàûüîïâ ')(\.-]/g, '');
  if (empty.length > 0) {
    console.warn(empty);
  }
  const words = normalized.split(/[ ']/);
  const rawWords = anwser.split(/[ ']/);
  if (words.length !== rawWords.length) {
    console.warn(words, rawWords);
  }
  return [];
}
