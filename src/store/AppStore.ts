import { useState, useEffect, useCallback, useRef } from 'democrat';
import { useShallowMemo } from '../hooks/useShallowMemo';
import { Howl } from 'howler';
import store from 'store2';

const SELECTED_STORAGE_KEY = 'chandwazo_selected-v1';

export interface BirdsFiles {
  [key: string]: string;
}

export interface BirdsListItem {
  id: string;
  name: string;
}

export type BirdsList = Array<BirdsListItem>;

export type Page = 'home' | 'list';

interface Player {
  id: string;
  howl: Howl;
}

const HAS_SELECTED_STORE = store.has(SELECTED_STORAGE_KEY);

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
        setPage('list');
      });
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      if (playerRef.current.id === playing) {
        return;
      }
      playerRef.current.howl.unload();
      playerRef.current = null;
    }
    if (playing === null) {
      return;
    }
    const howl = new Howl({
      src: [`http://birds.etiennedeladonchamps.fr/${playing}.webm`]
    });
    howl.play();
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

  return useShallowMemo({
    birds,
    setPage,
    selected,
    page,
    togglePlaying,
    playing,
    toggleSongSelected,
    selectUnselectAll
  });
};
