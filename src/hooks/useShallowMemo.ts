import { useMemo } from 'react';

export function useShallowMemo<T extends { [key: string]: any }>(obj: T): T {
  const keys = Array.from(Object.keys(obj))
    .sort()
    .reduce<Array<any>>((acc, k) => {
      acc.push(k);
      acc.push(obj[k]);
      return acc;
    }, []);

  return useMemo(
    () => obj,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    keys
  );
}
