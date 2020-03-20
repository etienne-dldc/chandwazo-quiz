import React from 'react';
import { Howl } from 'howler';

interface Props {
  songId: string;
  answer: string;
}

export const Player: React.FC<Props> = ({ answer, songId }) => {
  const [input, setInput] = React.useState('');

  const [howl] = React.useState(() => {
    const song = new Howl({
      src: [`http://birds.etiennedeladonchamps.fr/${songId}.webm`]
    });
    // song.play();
    return song;
  });

  React.useEffect(() => {
    return () => {
      howl.unload();
    };
  }, [howl]);

  return (
    <div className="answer">
      <input value={input} placeholder="réponse" onChange={e => setInput(e.target.value)} />
      <span className="answer--border" />
    </div>
  );
};
