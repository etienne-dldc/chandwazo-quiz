import { compareTwoStrings } from 'string-similarity';

const REPLACE_LETTERS = 'éèêàûüîïâ'.split('');
const BY_LETTERS = 'eeeauuiia'.split('');

const WORD_SPLIT = /[ ]/;
const HANDLED_CHARS = /[0-9A-Za-zéèêàûüùîïâ '`",)(.-]/g;

const SKIPPED_WORDS = ['de', 'des', 'd', 'a', 'du', 'l', 's', 'et', '-'];
const CONVERT_TO_SMALL_WORD = /([A-Za-z])(-)([A-Za-z])/g;
const APOSTROPH_START = /^([A-Za-z]{1,2})'/;

function toNormArray(str: string): Array<{ raw: string; norm: string }> {
  return str
    .replace(CONVERT_TO_SMALL_WORD, '$1 $2 $3')
    .split(WORD_SPLIT)
    .map((rawWord) => {
      const norm = rawWord
        .replace(APOSTROPH_START, '')
        .split('')
        .map((letter) => {
          const index = REPLACE_LETTERS.indexOf(letter);
          if (index >= 0) {
            return BY_LETTERS[index];
          }
          return letter;
        })
        .join('')
        .toLowerCase();
      // Validation
      const empty = norm.replace(HANDLED_CHARS, '');
      if (empty.length > 0) {
        console.warn(empty);
      }
      return {
        raw: rawWord,
        norm,
      };
    });
}

export function extractMainWords(input: string): Array<string> {
  return toNormArray(input)
    .map((v) => v.norm)
    .filter((w) => SKIPPED_WORDS.includes(w) === false);
}

// return an array of response found (string) or null
export function checkAnswer(anwser: string, input: string): Array<string | null> {
  const anwserWords = toNormArray(anwser);
  const inputWords = extractMainWords(input);

  const result = anwserWords
    .map((word) => {
      if (SKIPPED_WORDS.includes(word.norm)) {
        return word;
      }
      const wordMatch = inputWords.some((inputWord) => {
        const score = compareTwoStrings(word.norm, inputWord);
        return score > 0.9;
      });
      return wordMatch ? word.raw : null;
    })
    .map((v, i, arr) => {
      if (v === null || typeof v === 'string') {
        return v;
      }
      const prev = i > 0 ? arr[i - 1] : null;
      const next = i < arr.length ? arr[i + 1] : null;
      return prev !== null && next !== null ? v.raw : null;
    });
  return result;
}
