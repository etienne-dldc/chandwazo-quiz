import { AppState } from 'store';
import { useSelector } from 'select';

export function useSelectorOrThrow<R>(selector: (state: AppState) => R | null | undefined): R {
  return notNil(useSelector(selector));
}

function notNil<T>(val: T | null | undefined): T {
  if (val === null || val === undefined) {
    throw new Error(`Invariant: value should not be null | undefined`);
  }
  return val;
}
