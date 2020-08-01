import React from 'react';
import { createElement, createStore } from 'democrat';
import { AppStore } from './AppStore';
import { Store } from 'react-electors';
import diff from 'jest-diff';

export type AppState = ReturnType<typeof AppStore>;
export type AppStore = Store<AppState>;

const store: AppStore = createStore(createElement(AppStore), { ReactInstance: React });

(window as any).store = store;

let prevState = store.getState();

store.subscribe(() => {
  const state = store.getState();
  const diffResult = diff(prevState, state, {
    expand: false,
    contextLines: 2,
    includeChangeCounts: false,
    omitAnnotationLines: true,
    aColor: (v) => `$$${v}$$`, // green
    bColor: (v) => `##${v}##`, // red
  });
  console.groupCollapsed(`State Update`);
  logColors(diffResult);
  console.log(state);
  console.groupEnd();
  prevState = state;
});

function logColors(content: string | null) {
  if (!content) {
    return null;
  }
  const letters = content.split('');
  let result = '';
  let isRed = false;
  let isGreen = false;
  const styles: Array<string> = [];
  while (letters.length) {
    if (letters.length === 1) {
      const letter = letters.shift();
      result += letter;
    } else {
      const nextTwo = letters[0] + letters[1];
      if (nextTwo === '$$') {
        letters.shift();
        letters.shift();
        if (isRed) {
          isRed = false;
          styles.push('');
          result += '%c';
        } else {
          isRed = true;
          styles.push('color: red');
          result += '%c';
        }
      } else if (nextTwo === '##') {
        letters.shift();
        letters.shift();
        if (isGreen) {
          isGreen = false;
          styles.push('');
          result += '%c';
        } else {
          isGreen = true;
          styles.push('color: green');
          result += '%c';
        }
      } else {
        const next = letters.shift();
        result += next;
      }
    }
  }
  console.log(result, ...styles);
}

export default store;
