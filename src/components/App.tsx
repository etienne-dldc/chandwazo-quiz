import React from 'react';
import { Layout } from './Layout';
import { ReactComponent as Play } from '../icons/play.svg';
import { Player } from './Player';

export interface BirdsFiles {
  [key: string]: string;
}

interface Props {
  birds: BirdsFiles;
}

export const App: React.FC<Props> = ({ birds }) => {
  const [selected, setSelected] = React.useState<Array<string>>(() => Object.keys(birds));
  const [queue, setQueue] = React.useState<Array<string>>([]);

  const playing = queue.length > 0 ? queue[0] : null;

  return (
    <Layout title="Chandwazo">
      <button
        className="btn btn--play"
        onClick={() => {
          const nextQueue = new Array(20)
            .fill(null)
            .map(() => selected[Math.floor(selected.length * Math.random())]);
          setQueue(nextQueue);
        }}
      >
        <Play />
      </button>
      {playing && <Player key={playing} songId={playing} answer={birds[playing]} />}
    </Layout>
  );
};

// console.log(sound);

// sound.play();
