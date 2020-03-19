import React from 'react';
import { Layout } from './Layout';
import { ReactComponent as Play } from '../icons/play.svg';
// import { Howl } from 'howler';

export interface BirdsFiles {
  [key: string]: string;
}

interface Props {
  birds: BirdsFiles;
}

export const App: React.FC<Props> = ({ birds }) => {
  const [selected, setSelected] = React.useState<Array<string>>(() => Object.keys(birds));
  const [queue, setQueue] = React.useState<Array<string>>([]);

  return (
    <Layout title="Chandwazo">
      <button className="btn btn--play" onClick={() => {}}>
        <Play />
      </button>
    </Layout>
  );
};

// const sound = new Howl({
//   src: ['http://birds.etiennedeladonchamps.fr/01_01.webm']
// });

// console.log(sound);

// sound.play();
