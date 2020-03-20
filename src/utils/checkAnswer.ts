import { compareTwoStrings } from 'string-similarity';

const REPLACE_LETTERS = 'éèêàûüîïâ'.split('');
const BY_LETTERS = 'eeeauuiia'.split('');

const WORD_SPLIT = /[ ]/;
const HANDLED_CHARS = /[0-9A-Za-zéèêàûüîïâ ')(.-]/g;

const SKIPPED_WORDS = ['de', 'des', 'd', 'a', 'du', 'l', 's', 'et', '-'];
const CONVERT_TO_SMALL_WORD = /([A-Za-z])(-)([A-Za-z])/g;
const APOSTROPH_START = /^([A-Za-z]{1,2})'/;

function toNormArray(str: string): Array<{ raw: string; norm: string }> {
  return str
    .replace(CONVERT_TO_SMALL_WORD, '$1 $2 $3')
    .split(WORD_SPLIT)
    .map(rawWord => {
      const norm = rawWord
        .replace(APOSTROPH_START, '')
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
      const empty = norm.replace(HANDLED_CHARS, '');
      if (empty.length > 0) {
        console.warn(empty);
      }
      return {
        raw: rawWord,
        norm
      };
    });
}

// return an array of response found (string) or null
export function checkAnswer(anwser: string, input: string): Array<string | null> {
  const anwserWords = toNormArray(anwser);
  const inputWords = toNormArray(input)
    .map(v => v.norm)
    .filter(w => SKIPPED_WORDS.includes(w) === false);

  console.log({
    anwserWords,
    inputWords
  });

  const result = anwserWords
    .map(word => {
      if (SKIPPED_WORDS.includes(word.norm)) {
        return word;
      }
      const wordMatch = inputWords.some(inputWord => {
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
      return prev !== null || next !== null ? v.raw : null;
    });

  // const rawWords = anwser.split(/[ ']/);
  // // const inputWords = toNormArray(input);
  // if (anwserWords.length !== rawWords.length) {
  //   console.warn(anwserWords, rawWords);
  // }
  // const small = anwserWords
  //   .filter(v => v.length <= 4)
  //   .filter(w => SKIPPED_WORDS.includes(w) === false);
  // if (small.length) {
  //   console.log(small);
  // }
  // const result = rawWords.map(word => {
  //   const match = anwserWords.some(maybe => {
  //     const score = leven(word, maybe);
  //     console.log(word, maybe, score);
  //     return score <= 2;
  //   });
  //   return match ? word : null;
  // }, []);

  // console.log(result);

  return result;
}
