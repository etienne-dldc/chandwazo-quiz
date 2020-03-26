import { useState, useEffect, useCallback, useRef, useChildren, createElement } from 'democrat';
import { useShallowMemo } from 'hooks/useShallowMemo';
import { Howl } from 'howler';
import store from 'store2';
import { QuizStore } from './QuizStore';
import { SELECTED_STORAGE_KEY } from 'constants/index';

const HAS_SELECTED_STORE = store.has(SELECTED_STORAGE_KEY);

export interface BirdsFiles {
  [key: string]: string;
}

export interface BirdsListItem {
  id: string;
  name: string;
}

export type BirdsList = Array<BirdsListItem>;

export type Page = 'home' | 'list' | 'quiz';

interface Player {
  id: string;
  howl: Howl;
}

export const AppStore = () => {
  const [birds, setBirds] = useState<null | BirdsList>(null);
  const [selected, setSelected] = useState<Array<string>>(() => {
    if (HAS_SELECTED_STORE) {
      return store.get(SELECTED_STORAGE_KEY);
    }
    return [];
  });
  const [page, setPage] = useState<Page>('home');
  const [playing, setPlaying] = useState<string | null>(null);
  const playerRef = useRef<null | Player>(null);
  const [loadedSong, setLoadedSong] = useState<{ [key: string]: boolean }>({});

  const playingIsLoading = playing === null ? false : loadedSong[playing] === true ? false : true;

  const quiz = useChildren(createElement(QuizStore, { selected, birds, setPlaying, setPage }));

  useEffect(() => {
    store.set(SELECTED_STORAGE_KEY, selected);
  }, [selected]);

  useEffect(() => {
    fetch('/birds.json')
      .then(res => res.json())
      .then((data: BirdsFiles) => {
        // Object.values<string>(data).forEach(name => checkAnswer(name, ''));
        const list: BirdsList = Object.keys(data)
          .map(
            (k): BirdsListItem => ({
              id: k,
              name: data[k]
            })
          )
          .sort((l, r) => l.name.localeCompare(r.name));
        setBirds(list);
        if (HAS_SELECTED_STORE === false) {
          setSelected(list.map(v => v.id));
        }
      });
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      if (playerRef.current.id === playing) {
        return;
      }
      playerRef.current.howl.stop();
      playerRef.current = null;
    }
    if (playing === null) {
      return;
    }
    const howl = new Howl({
      src: [
        `http://birds.etiennedeladonchamps.fr/${playing}.webm`,
        `http://birds.etiennedeladonchamps.fr/${playing}.mp3`
      ]
    });
    setLoadedSong(prev => {
      if (prev[playing] === undefined) {
        return {
          ...prev,
          [playing]: false
        };
      }
      return prev;
    });
    howl.once('play', () => {
      setLoadedSong(prev => {
        return {
          ...prev,
          [playing]: true
        };
      });
    });
    howl.play();
    console.log(howl);
    howl.once('loaderror', (id, error) => {
      console.log({ id, error });
    });
    howl.once('playerror', (id, error) => {
      console.log({ id, error });
    });
    howl.once('stop', () => {
      console.log('stop');
    });
    howl.on('end', () => {
      setPlaying(null);
    });
    playerRef.current = {
      id: playing,
      howl
    };
  }, [playing]);

  const selectUnselectAll = useCallback((ids: Array<string>) => {
    setSelected(prev => {
      const allSelected = ids.every(id => prev.includes(id));
      if (allSelected) {
        return prev.filter(id => ids.includes(id) === false);
      }
      const copy = [...prev];
      ids.forEach(id => {
        if (!copy.includes(id)) {
          copy.push(id);
        }
      });
      return copy;
    });
  }, []);

  const toggleSongSelected = useCallback((songId: string) => {
    setSelected(prev => {
      if (prev.includes(songId)) {
        return prev.filter(v => v !== songId);
      }
      return [...prev, songId];
    });
  }, []);

  const togglePlaying = useCallback((songId: string) => {
    setPlaying(prev => {
      return prev === songId ? null : songId;
    });
  }, []);

  const stopPlaying = useCallback(() => {
    setPlaying(null);
  }, []);

  return useShallowMemo({
    birds,
    setPage,
    selected,
    page,
    togglePlaying,
    stopPlaying,
    playing,
    playingIsLoading,
    toggleSongSelected,
    selectUnselectAll,
    quiz
  });
};
