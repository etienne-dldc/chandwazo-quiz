import React from 'react';
import Fuze from 'fuse.js';
import { Layout } from 'components/Layout';
import { useSelector } from 'select';
import { useSelectorOrThrow } from 'hooks/useSelectOrThrow';
import { ReactComponent as CheckSquare } from 'icons/check-square.svg';
import { ReactComponent as Square } from 'icons/square.svg';
import { ReactComponent as Play } from 'icons/play.svg';
import { ReactComponent as Pause } from 'icons/pause.svg';
import { ReactComponent as Search } from 'icons/search.svg';
import { ReactComponent as XCircle } from 'icons/x-circle.svg';
import { ReactComponent as ChevronLeft } from 'icons/chevron-left.svg';
import { ReactComponent as Zap } from 'icons/zap.svg';
import { BirdsList } from 'store/AppStore';

interface ItemProps {
  id: string;
  name: string;
  selected: Array<string>;
  playing: string | null;
  toggleSongSelected: (id: string) => void;
  togglePlaying: (id: string) => void;
}

const Item = React.memo<ItemProps>(
  ({ id, name, selected, toggleSongSelected, playing, togglePlaying }) => {
    const isSelected = selected.includes(id);
    const isPlaying = playing === id;
    return (
      <div className={'list--item' + (isSelected ? ' selected' : '')}>
        <div className="list--click" onClick={() => toggleSongSelected(id)}>
          <button className="list--check">{isSelected ? <CheckSquare /> : <Square />}</button>
          {name}
        </div>
        <button
          className={'list--play' + (isPlaying ? ' playing' : '')}
          onClick={() => togglePlaying(id)}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>
    );
  }
);

export const List: React.FC = () => {
  const setPage = useSelector(s => s.setPage);
  const birds = useSelectorOrThrow(s => s.birds);
  const selected = useSelectorOrThrow(s => s.selected);
  const toggleSongSelected = useSelector(s => s.toggleSongSelected);
  const togglePlaying = useSelector(s => s.togglePlaying);
  const selectUnselectAll = useSelector(s => s.selectUnselectAll);
  const playing = useSelector(s => s.playing);
  const [search, setSearch] = React.useState('');
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const controlsRef = React.useRef<HTMLDivElement | null>(null);
  const [controlHeight, setControlHeight] = React.useState(100);

  React.useEffect(() => {
    if (controlsRef.current) {
      const size = controlsRef.current.getBoundingClientRect();
      setControlHeight(size.height);
    }
  }, []);

  React.useEffect(() => {
    if (listRef.current && controlsRef.current) {
      const listElem = listRef.current;
      const contolElem = controlsRef.current;
      let lastScroll = listElem.scrollTop;
      const onScroll = () => {
        const diff = listElem.scrollTop - lastScroll;
        const hide = listElem.scrollTop > controlHeight && diff > 0;
        lastScroll = listElem.scrollTop;
        if (hide) {
          // hide
          if (contolElem.classList.contains('hidden') === false) {
            contolElem.classList.add('hidden');
          }
        } else {
          // show
          if (contolElem.classList.contains('hidden')) {
            contolElem.classList.remove('hidden');
          }
        }
      };
      listElem.addEventListener('scroll', onScroll);
      return () => {
        listElem.removeEventListener('scroll', onScroll);
      };
    }
  }, [controlHeight]);

  const [fuse] = React.useState(() => {
    return new Fuze(birds, {
      keys: ['name'],
      threshold: 0.2,
      minMatchCharLength: 0
    });
  });

  const filtered: BirdsList = React.useMemo(() => {
    if (search.length === 0) {
      return birds;
    }
    return fuse.search(search).map(v => (v as any).item);
  }, [birds, fuse, search]);

  const allSelected = React.useMemo(() => {
    return filtered.every(item => selected.includes(item.id));
  }, [filtered, selected]);

  return (
    <Layout noTitle>
      <div ref={controlsRef} className="list--controls">
        <button
          className="list--back"
          style={{
            backgroundImage: `linear-gradient(315deg, #9fa4c4 0%, #9e768f 74%)`
          }}
          onClick={() => setPage('home')}
        >
          <ChevronLeft />
          <span>Retour</span>
        </button>
        <div className="list--filter">
          <Search className="list--search-icon" />
          {search.length > 0 && (
            <button type="button" className="list--clear-icon" onClick={() => setSearch('')}>
              <XCircle />
            </button>
          )}
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="rechercher"
          />
        </div>
        <button
          type="button"
          className="list--select-all"
          onClick={() => {
            selectUnselectAll(filtered.map(v => v.id));
          }}
        >
          <Zap />
          <span>
            {allSelected ? 'Unselect' : 'Select'} All ({filtered.length})
          </span>
        </button>
      </div>
      <div ref={listRef} className="list--list" style={{ paddingTop: controlHeight }}>
        {filtered.map(item => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            playing={playing}
            selected={selected}
            togglePlaying={togglePlaying}
            toggleSongSelected={toggleSongSelected}
          />
        ))}
      </div>
    </Layout>
  );
};
