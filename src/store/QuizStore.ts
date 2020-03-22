import { useShallowMemo } from 'hooks/useShallowMemo';
import { useState, useCallback } from 'democrat';

interface Props {
  selectedSize: number;
}

export const QuizStore = ({ selectedSize }: Props) => {
  const [size, setSize] = useState(() => Math.min(20, selectedSize));

  const incrementSize = useCallback(() => setSize(p => Math.min(p + 1, selectedSize)), [
    selectedSize
  ]);
  const decrementSize = useCallback(() => setSize(p => Math.max(p - 1, 0)), []);

  return useShallowMemo({
    size,
    setSize,
    incrementSize,
    decrementSize
  });
};
