import { useShallowMemo } from 'hooks/useShallowMemo';
import { useState, useCallback, useMemo } from 'democrat';
import { shuffleArray } from 'utils/shuffleArray';
import { BirdsList } from './AppStore';

interface Props {
  selected: Array<string>;
  birds: BirdsList | null;
  setPlaying: (id: string) => void;
}

export const QuizStore = ({ selected, birds, setPlaying }: Props) => {
  const selectedSize = selected.length;
  const [size, setSize] = useState(() => Math.min(20, selectedSize));
  const [queue, setQueue] = useState<Array<string> | null>(null);
  const [current, setCurrent] = useState<string | null>(null);

  const incrementSize = useCallback(() => setSize(p => Math.min(p + 1, selectedSize)), [
    selectedSize
  ]);

  const decrementSize = useCallback(() => setSize(p => Math.max(p - 1, 0)), []);

  const start = useCallback(() => {
    const shuffled = shuffleArray(selected);
    const queue = shuffled.slice(0, size);
    setQueue(queue);
    setCurrent(queue[0]);
    setPlaying(queue[0]);
  }, [selected, setPlaying, size]);

  const answer = useMemo(() => {
    if (current === null || birds === null) {
      return null;
    }
    const bird = birds.find(b => b.id === current);
    if (!bird) {
      return null;
    }
    return bird.name;
  }, [birds, current]);

  return useShallowMemo({
    size,
    setSize,
    incrementSize,
    decrementSize,
    start,
    queue,
    current,
    answer
  });
};
