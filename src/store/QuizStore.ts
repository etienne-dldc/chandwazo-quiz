import { useShallowMemo } from 'hooks/useShallowMemo';
import { useState, useCallback, useMemo } from 'democrat';
import { shuffleArray } from 'utils/shuffleArray';
import { BirdsList } from './AppStore';

interface Props {
  selected: Array<string>;
  birds: BirdsList | null;
}

export const QuizStore = ({ selected, birds }: Props) => {
  const selectedSize = selected.length;
  const [size, setSize] = useState(() => Math.min(20, selectedSize));
  const [queue, setQueue] = useState<Array<string> | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const incrementSize = useCallback(() => setSize(p => Math.min(p + 1, selectedSize)), [
    selectedSize
  ]);

  const decrementSize = useCallback(() => setSize(p => Math.max(p - 1, 0)), []);

  const start = useCallback(() => {
    const shuffled = shuffleArray(selected);
    console.log({
      selected,
      shuffled
    });

    const queue = shuffled.slice(0, size);
    console.log(queue);
    setQueue(queue);
    setPlaying(queue[0]);
  }, [selected, size]);

  const answer = useMemo(() => {
    if (playing === null || birds === null) {
      return null;
    }
    const bird = birds.find(b => b.id === playing);
    if (!bird) {
      return null;
    }
    return bird.name;
  }, [birds, playing]);

  return useShallowMemo({
    size,
    setSize,
    incrementSize,
    decrementSize,
    start,
    queue,
    playing,
    answer
  });
};
