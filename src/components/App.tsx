import React from 'react';
import { Layout } from './Layout';
import { ReactComponent as Award } from '../icons/award.svg';
import { ReactComponent as Book } from '../icons/book.svg';
import { ReactComponent as Settings } from '../icons/settings.svg';
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
        className="btn btn--mode"
        onClick={() => {
          const nextQueue = new Array(20)
            .fill(null)
            .map(() => selected[Math.floor(selected.length * Math.random())]);
          setQueue(nextQueue);
        }}
      >
        <Award />
        <span>Quiz</span>
      </button>
      <button
        className="btn btn--mode"
        style={{
          backgroundImage: `linear-gradient(315deg, #9fa4c4 0%, #9e768f 74%)`
        }}
      >
        <Book />
        <span>Entraînement</span>
      </button>
      <button
        className="btn btn--mode"
        style={{
          backgroundImage: `linear-gradient(45deg, rgb(155, 151, 197) 0%, rgb(38, 211, 255) 74%)`
        }}
      >
        <Settings />
        <span>Paramètres</span>
      </button>
      {/* {playing && <Player key={playing} songId={playing} answer={birds[playing]} />} */}
    </Layout>
  );
};

// console.log(sound);

// sound.play();
