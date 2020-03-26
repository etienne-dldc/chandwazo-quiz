import { useShallowMemo } from 'hooks/useShallowMemo';
import { useState, useCallback, useMemo, useEffect, useLayoutEffect } from 'democrat';
import { shuffleArray } from 'utils/shuffleArray';
import { BirdsList, Page } from './AppStore';
import store from 'store2';
import { SELECTED_SIZE_STORAGE_KEY } from 'constants/index';

const HAS_SELECTED_SIZE_STORAGE = store.has(SELECTED_SIZE_STORAGE_KEY);

interface Props {
  selected: Array<string>;
  birds: BirdsList | null;
  setPlaying: (id: string | null) => void;
  setPage: (page: Page) => void;
}

export const QuizStore = ({ selected, birds, setPlaying, setPage }: Props) => {
  const selectedSize = selected.length;
  const [size, setSize] = useState<number>(() => {
    const value: number = HAS_SELECTED_SIZE_STORAGE ? store.get(SELECTED_SIZE_STORAGE_KEY) : 20;
    return Math.min(value, selectedSize);
  });
  const [queue, setQueue] = useState<Array<string> | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const done = useMemo(() => {
    if (queue === null || currentIndex === null) {
      return false;
    }
    return currentIndex >= queue.length;
  }, [currentIndex, queue]);

  const current = useMemo(() => {
    if (queue && currentIndex !== null && done !== true) {
      return queue[currentIndex];
    }
    return null;
  }, [currentIndex, done, queue]);

  useEffect(() => {
    store.set(SELECTED_SIZE_STORAGE_KEY, size);
  }, [size]);

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

  const progress = useMemo((): { current: number; total: number } | null => {
    if (queue === null || currentIndex === null) {
      return null;
    }
    return {
      current: currentIndex + 1,
      total: queue.length
    };
  }, [currentIndex, queue]);

  useLayoutEffect(() => {
    if (done) {
      setPlaying(null);
    }
  }, [done, setPlaying]);

  useLayoutEffect(() => {
    if (current !== null) {
      setPlaying(current);
    }
  }, [current, setPlaying]);

  const incrementSize = useCallback(() => setSize(p => Math.min(p + 1, selectedSize)), [
    selectedSize
  ]);

  const decrementSize = useCallback(() => setSize(p => Math.max(p - 1, 0)), []);

  const start = useCallback(() => {
    if (size === 0) {
      return;
    }
    const shuffled = shuffleArray(selected);
    const queue = shuffled.slice(0, size);
    setQueue(queue);
    setCurrentIndex(0);
    setPlaying(queue[0]);
  }, [selected, setPlaying, size]);

  const playCurrent = useCallback(() => {
    if (current !== null) {
      setPlaying(current);
    }
  }, [current, setPlaying]);

  const playNext = useCallback(() => {
    setCurrentIndex(p => {
      if (p !== null) {
        return p + 1;
      }
      return p;
    });
  }, []);

  const endQuiz = useCallback(() => {
    setQueue(null);
    setCurrentIndex(null);
    setPage('home');
  }, [setPage]);

  return useShallowMemo({
    done,
    size,
    setSize,
    progress,
    playCurrent,
    incrementSize,
    decrementSize,
    playNext,
    start,
    queue,
    current,
    answer,
    endQuiz
  });
};
